"use client";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  IconButton,
  Chip,
  Divider,
  Fade,
} from "@mui/material";
import { IconEye, IconCalendar, IconUser } from "@tabler/icons-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { formatDate } from "@/utils/formatDate";

export default function SeeNews({ data }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <IconButton onClick={handleClickOpen}>
        <IconEye />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="body"
      >
        <Card sx={{ maxWidth: "100%", boxShadow: "none" }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 300,
              backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('${data?.image_url}')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="white"
                sx={{
                  fontSize: { xs: "24px", sm: "32px", md: "40px" },
                  textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                {data?.entitle}
              </Typography>
            </Container>
          </Box>

          {/* Meta information */}
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              bgcolor: "grey.50",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Chip
              icon={<IconCalendar size={16} />}
              label={formatDate(data?.date)}
              size="small"
              sx={{
                bgcolor: "white",
                bgcolor: "grey.50",
              }}
            />
            <Chip
              icon={<IconUser size={16} />}
              label={`Journalist: ${data?.enjournalist}`}
              size="small"
              sx={{
                bgcolor: "white",
                bgcolor: "grey.50",
              }}
            />
          </CardContent>

          {/* Content */}
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="body1"
              sx={{
                textAlign: "justify",
                lineHeight: 1.8,
                fontSize: "1.1rem",
                color: "text.primary",
                "& p": {
                  mb: 2,
                },
              }}
            >
              {data?.endescription}
            </Typography>
          </CardContent>

          <Divider />

          {/* Actions */}
          <DialogActions sx={{ p: 3, bgcolor: "grey.50" }}>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4,
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              Гарах
            </Button>
          </DialogActions>
        </Card>
      </Dialog>
    </Box>
  );
}
