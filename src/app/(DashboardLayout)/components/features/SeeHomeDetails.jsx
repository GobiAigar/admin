"use client";

import { Grid, Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeDetails = ({ data }) => {
  const [eng, setEng] = useState(false);

  if (!data) return null;

  const imageUrls = [1, 2, 3, 4]
    .map((i) => data[`image_url${i}`])
    .filter((url) => !!url);

  const renderMedia = (src) => {
    const isVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(src);
    const commonSx = {
      width: "100%",
      maxHeight: "24rem",
      borderRadius: 2,
      boxShadow: 2,
      objectFit: "cover",
    };

    if (isVideo) {
      return (
        <Box
          component="video"
          src={src}
          controls
          playsInline
          muted
          sx={commonSx}
        />
      );
    }

    return (
      <Box component="img" src={src} alt="media" loading="lazy" sx={commonSx} />
    );
  };
  return (
    <Box p={2}>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
        <Button variant="outlined" onClick={() => setEng(!eng)}>
          {eng ? "Монгол" : "English"}
        </Button>
      </Box>
      {data.id === 2 && (
        <Box>
          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              align="center"
              gutterBottom
              sx={{ mb: 3 }}
            >
              {eng ? data.entitle || "No Title" : data.mntitle || "Гарчиг алга"}
            </Typography>
            <Typography
              variant="body"
              fontWeight={300}
              align="center"
              gutterBottom
              sx={{ mb: 3 }}
            >
              {eng
                ? data.endescription || "No Title"
                : data.mndescription || "Гарчиг алга"}
            </Typography>
          </Box>

          <Grid container spacing={0.3} justifyContent="center">
            {imageUrls.map((url, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Box
                  component="img"
                  src={url}
                  alt={`Color image ${index + 1}`}
                  loading="lazy"
                  sx={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    boxShadow: 2,
                    objectFit: "cover",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {(data.id === 3 || data.id === 4 || data.id === 5) && (
        <Grid container justifyContent="center" textAlign="center">
          <Grid size={{ xs: 12, md: 6 }}>
            {imageUrls[0] && (
              <Box
                component="img"
                src={imageUrls[0]}
                alt="icon"
                loading="lazy"
                sx={{
                  width: "64px",
                  height: "64px",
                  mb: 2,
                  mx: "auto",
                }}
              />
            )}
            <Typography fontWeight={600} fontSize="18px" sx={{ mb: 1 }}>
              {eng ? data.entitle || "No Title" : data.mntitle || "Гарчиг алга"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                whiteSpace: "pre-line",
                color: "text.secondary",
              }}
            >
              {eng ? data.endescription : data.mndescription}
            </Typography>
          </Grid>
        </Grid>
      )}
      {data.id === 6 && (
        <Box>
          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              align="center"
              gutterBottom
              sx={{ mb: 3 }}
            >
              {eng ? data.entitle || "No Title" : data.mntitle || "Гарчиг алга"}
            </Typography>
            <Typography
              variant="body"
              fontWeight={300}
              align="center"
              gutterBottom
              sx={{ mb: 3 }}
            >
              {eng
                ? data.endescription || "No Title"
                : data.mndescription || "Гарчиг алга"}
            </Typography>
          </Box>

          <Grid container spacing={0.3} justifyContent="center">
            {imageUrls.map((url, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Box
                  component="img"
                  src={url}
                  alt={`Color image ${index + 1}`}
                  loading="lazy"
                  sx={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    boxShadow: 2,
                    objectFit: "cover",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {![2, 3, 4, 5, 6].includes(data.id) && (
        <Box>
          <Box sx={{ marginBottom: 3 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              align="center"
              gutterBottom
              sx={{ mb: 3 }}
            >
              {eng
                ? data?.entitle || "No Title"
                : data?.mntitle || "Гарчиг оруулаагүй байна"}
            </Typography>

            {data.endescription && data.mndescription && (
              <Typography
                variant="body"
                fontWeight={300}
                align="center"
                gutterBottom
                sx={{ mb: 3 }}
              >
                {eng
                  ? data.endescription || "No Description"
                  : data.mndescription || "Тайлбар оруулаагүй байна"}
              </Typography>
            )}
          </Box>

          {imageUrls[0] && (
            <Box
              component="img"
              src={imageUrls[0]}
              alt="Main image"
              loading="lazy"
              sx={{
                display: "block",
                mx: "auto",
                height: "auto",
                maxHeight: "300px",
                borderRadius: 2,
                boxShadow: 2,
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default HomeDetails;
