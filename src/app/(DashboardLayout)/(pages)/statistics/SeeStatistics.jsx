"use client";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box, Dialog, IconButton } from "@mui/material";
import { IconEye } from "@tabler/icons-react";

export default function SeeStatistics({ data }) {
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
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h5">Англи</Typography>
            <Typography align="justify">{data?.english}</Typography>
          </Box>
          <Box>
            <Typography variant="h5">Монгол</Typography>
            <Typography align="justify">{data?.mongolia}</Typography>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
