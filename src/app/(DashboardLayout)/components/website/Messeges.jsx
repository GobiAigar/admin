import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { Fragment, useState } from "react";

const Messeges = ({ datas }) => {
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: (theme.vars || theme).palette.background.paper,
  }));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Demo>
        <List>
          {datas.map((data) => {
            return (
              <Box key={data.id} sx={{ mt: 2 }}>
                <Fragment>
                  <Button variant="outlined" onClick={handleClickOpen}>
                    <ListItem>
                      <ListItemText>{data.firstname}</ListItemText>
                    </ListItem>
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {data.firstname}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose}>Буцах</Button>
                    </DialogActions>
                  </Dialog>
                </Fragment>
              </Box>
            );
          })}
        </List>
      </Demo>
    </>
  );
};

export default Messeges;
