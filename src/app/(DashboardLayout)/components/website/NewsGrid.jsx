import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Checkbox,
} from "@mui/material";
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone";
import React from "react";
import DeleteNews from "../features/DeleteNews";
import EditNews from "../features/EditNews";

const NewsGrid = ({ data }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 300,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 2,
        mb: 2,
        backgroundImage: `url(${data.image_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.9)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <EditNews data={data} />
          <DeleteNews id={data.id} />
        </Box>
      </Box>

      <CardContent sx={{ p: 0 }}>
        <Typography variant="h6" color="white" gutterBottom>
          {data?.mntitle}
        </Typography>
        <Typography variant="subtitle2" color="white">
          {data?.mnjournalist}
        </Typography>
        <Typography variant="body2" color="white">
          {data?.date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NewsGrid;
