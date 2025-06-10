"use client";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Dialog, IconButton } from "@mui/material";
import { IconEye } from "@tabler/icons-react";

export default function SeeCompany({ data }) {
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
        <IconEye variant="primary" color="blue" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} width={50}>
        <Box
          sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Box>
            <Typography variant="h5">Англи</Typography>
            <Typography>{data?.english} </Typography>
          </Box>
          <Box>
            <Typography variant="h5">Монгол</Typography>
            <Typography>{data?.mongolia}</Typography>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
