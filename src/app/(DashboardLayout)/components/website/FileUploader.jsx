import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";

const VisuallyHiddenInput = (props) => (
  <input
    style={{
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      whiteSpace: "nowrap",
      width: 1,
    }}
    {...props}
  />
);

const FileUploader = ({
  setFieldValue,
  fieldName,
  onClear,
  initialPreview,
}) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(initialPreview || null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreview(initialPreview || null);
  }, [initialPreview]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        setPreview(data.url);
        setFieldValue(fieldName, data.url);
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setFieldValue(fieldName, "");
    if (fileInputRef.current) fileInputRef.current.value = null;
    if (onClear) onClear();
  };

  return (
    <Box sx={{ mb: 2, mt: 1 }}>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        disabled={loading}
      >
        Зураг оруулах
        <VisuallyHiddenInput
          type="file"
          onChange={handleUpload}
          accept="image/*"
          ref={fileInputRef}
        />
      </Button>

      {loading && (
        <Box mt={2}>
          <CircularProgress size={24} />
        </Box>
      )}

      {preview && (
        <Box
          mt={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card sx={{ maxWidth: 600 }}>
            <CardMedia
              component="img"
              height="140"
              image={preview}
              alt="Uploaded"
            />
          </Card>

          <Button
            variant="contained"
            color="error"
            startIcon={<ClearIcon />}
            onClick={handleClear}
            sx={{ mt: 2 }}
          >
            Устгах
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FileUploader;
