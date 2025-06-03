import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Fade,
  Grow,
  Paper,
  IconButton,
  LinearProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ClearIcon from "@mui/icons-material/Clear";
import ImageIcon from "@mui/icons-material/Image";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const UploadArea = styled(Paper)(({ theme, isDragActive }) => ({
  border: `2px dashed ${
    isDragActive ? theme.palette.primary.main : theme.palette.grey[300]
  }`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  backgroundColor: isDragActive
    ? theme.palette.primary.main + "08"
    : "transparent",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main + "04",
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[8],
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[8],
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: theme.shadows[12],
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    zIndex: 1,
  },
}));

const OverlayBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  background: "rgba(0, 0, 0, 0.7)",
  borderRadius: `0 0 0 ${theme.spacing(2)}`,
  padding: theme.spacing(1),
}));

const FileUploader = ({
  setFieldValue,
  fieldName,
  onClear,
  initialPreview,
  type = "image",
}) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(initialPreview || null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreview(initialPreview || null);
  }, [initialPreview]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleFileUpload(file);
  };

  const handleFileUpload = async (file) => {
    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      setPreview(data.url);
      setFieldValue(fieldName, data.url);
      setFieldValue("thumbnail", data.thumbnail);
      setUploadProgress(100);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setLoading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  const handleClear = () => {
    setPreview(null);
    setFieldValue(fieldName, "");
    if (fileInputRef.current) fileInputRef.current.value = null;
    if (onClear) onClear();
  };

  const isVideo = type === "video";
  const IconComponent = isVideo ? VideoFileIcon : ImageIcon;

  return (
    <Box sx={{ mb: 3, mt: 2 }}>
      {!preview && (
        <UploadArea
          isDragActive={isDragActive}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <IconComponent sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
          <Typography variant="h6" gutterBottom color="primary">
            {isVideo ? "Видео оруулах" : "Зураг оруулах"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Файлыг энд чирж оруулах эсвэл товчлуурыг дарна уу
          </Typography>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            disabled={loading}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
              "&:hover": {
                background: "linear-gradient(45deg, #1976D2 30%, #0288D1 90%)",
              },
            }}
          >
            Файл сонгох
          </Button>
          <VisuallyHiddenInput
            type="file"
            onChange={handleUpload}
            accept={isVideo ? "video/*" : "image/*,.svg"}
            ref={fileInputRef}
          />
        </UploadArea>
      )}

      {loading && (
        <Fade in={loading}>
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <CircularProgress size={24} sx={{ mr: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Файл байршуулж байна...
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  background: "linear-gradient(90deg, #2196F3, #21CBF3)",
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
              {Math.round(uploadProgress)}% дууссан
            </Typography>
          </Box>
        </Fade>
      )}

      {preview && !loading && (
        <Grow in={!!preview} timeout={600}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <StyledCard sx={{ maxWidth: 600, width: "100%" }}>
              <Box sx={{ position: "relative" }}>
                {isVideo ? (
                  <CardMedia
                    component="video"
                    height="300"
                    src={preview}
                    controls
                    sx={{ borderRadius: "inherit" }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    height="200"
                    image={preview}
                    alt="Uploaded"
                    sx={{ borderRadius: "inherit" }}
                  />
                )}
                <OverlayBox>
                  <IconButton
                    size="small"
                    onClick={handleClear}
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      },
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </OverlayBox>
              </Box>
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {"Байршуулсан зураг"}
                </Typography>
              </CardContent>
            </StyledCard>
          </Box>
        </Grow>
      )}
    </Box>
  );
};

export default FileUploader;
