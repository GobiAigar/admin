"use client";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActions,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { IconEye } from "@tabler/icons-react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { formatDate } from "@/utils/formatDate";

export default function SeeNews({ data }) {
  const [open, setOpen] = useState(false);
  console.log(data);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <IconButton onClick={handleClickOpen}>
        <IconEye variant="primary" color="blue" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} width={50} scroll="body">
        <Card sx={{ maxWidth: 800 }}>
          <DialogTitle>Мэдээ харах</DialogTitle>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              backgroundImage: `url('${data?.image_url}')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.5)",
                zIndex: 1,
              }}
            />
            <Container
              maxWidth="lg"
              sx={{ pt: 20, position: "relative", zIndex: 2 }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                color="white"
                sx={{ fontSize: { xs: "24px", sm: "32px", md: "48px" } }}
              >
                {data?.entitle}
              </Typography>
            </Container>
          </Box>

          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography>{formatDate(data?.date)}</Typography>
            <Typography>Journalist : {data?.enjournalist}</Typography>
          </CardContent>

          <CardContent>
            <Typography variant="body1" textAlign="justify">
              {data?.endescription}
            </Typography>
          </CardContent>
          <DialogActions>
            <Button onClick={handleClose}>Гарах</Button>
          </DialogActions>
        </Card>
      </Dialog>
    </Box>
  );
}
