"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SeeDetailsProduct = ({ data, onClose }) => {
  const [eng, setEng] = useState(false);

  if (!data) return null;

  const imageUrls = [1, 2, 3, 4]
    .map((i) => data[`image_url${i}`])
    .filter((url) => !!url);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography fontWeight="bold">
              {data?.entitle || "Мэдээлэл харагдахгүй байна"}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => setEng(!eng)}>
              {eng ? "English" : "Монгол"}
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          {!eng && (
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Гарчиг /Англи/
              </Typography>
              <Typography variant="h6">{data?.entitle}</Typography>
            </Grid>
          )}
          {eng && (
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Гарчиг /Монгол/
              </Typography>
              <Typography variant="h6">{data?.mntitle}</Typography>
            </Grid>
          )}

          <Grid container spacing={2} mb={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              {imageUrls.length === 1 ? (
                <Box
                  component="img"
                  src={imageUrls[0]}
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: { xs: 250, md: 400 },
                    borderRadius: 2,
                    boxShadow: 2,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Slider {...sliderSettings}>
                  {imageUrls.map((url, idx) => (
                    <Box
                      key={idx}
                      component="img"
                      src={url}
                      sx={{
                        width: "100%",
                        height: { xs: 250, md: 400 },
                        borderRadius: 2,
                        boxShadow: 2,
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </Slider>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {!eng && (
                <>
                  <Typography variant="subtitle2" color="textSecondary">
                    Тайлбар /Англи/
                  </Typography>
                  <Typography style={{ textAlign: "justify" }}>
                    {data?.endescription}
                  </Typography>
                </>
              )}
              {eng && (
                <>
                  <Typography variant="subtitle2" color="textSecondary">
                    Тайлбар /Монгол/
                  </Typography>
                  <Typography style={{ textAlign: "justify" }}>
                    {data?.mndescription}
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Буцах
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SeeDetailsProduct;
