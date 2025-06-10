"use client";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Box,
  Button,
  Card,
  CardActions,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import { IconEye } from "@tabler/icons-react";

export default function SeeFaq({ data }) {
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
        <IconEye color="blue" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} width={50}>
        <Box>
          <Card>
            <DialogTitle>Түгээмэл асуулт харах</DialogTitle>
            <Divider />
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">
                  {data?.enquestion} /Англи/
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{data?.enanswer}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography component="span">
                  {data.mnquestion} /Монгол/
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{data.mnanswer}</Typography>
              </AccordionDetails>
            </Accordion>

            <DialogActions>
              <Button onClick={handleClose}>Буцах</Button>
            </DialogActions>
          </Card>
        </Box>
      </Dialog>
    </Box>
  );
}
