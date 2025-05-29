import { Grid, InputLabel, TextField, Divider, Box } from "@mui/material";

const HomeDetails = ({ data, isEdit }) => {
  if (!data) return null;

  const imageUrls = [1, 2, 3, 4]
    .map((i) => data[`image_url${i}`])
    .filter((url) => !!url);

  return (
    <Box p={2}>
      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 6 }}>
          <InputLabel>Англи гарчиг</InputLabel>
          <TextField
            fullWidth
            value={data.entitle || ""}
            multiline
            minRows={2}
            disabled={!isEdit}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <InputLabel>Монгол гарчиг</InputLabel>
          <TextField
            fullWidth
            value={data.mntitle || ""}
            multiline
            minRows={2}
            disabled={!isEdit}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <InputLabel>Англи дэд гарчиг</InputLabel>
          <TextField
            fullWidth
            value={data.ensubtitle || ""}
            multiline
            minRows={2}
            disabled={!isEdit}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <InputLabel>Монгол дэд гарчиг</InputLabel>
          <TextField
            fullWidth
            value={data.mnsubtitle || ""}
            multiline
            minRows={2}
            disabled={!isEdit}
          />
        </Grid>
      </Grid>

      {imageUrls.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            {imageUrls.map((url, index) => (
              <Grid size={{ xs: imageUrls.length === 1 ? 12 : 6 }} key={index}>
                <Box
                  component="img"
                  src={url}
                  alt={`Image ${index + 1}`}
                  loading="lazy"
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default HomeDetails;
