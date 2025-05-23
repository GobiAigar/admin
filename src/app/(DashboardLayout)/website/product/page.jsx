"use client";

import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  CardMedia,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { Backend_Endpoint } from "@/constants/constants";
import { useEffect, useState } from "react";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [isEnglish, setEnglish] = useState(false);
  const [datas, setDatas] = useState([]);
  const [id, setId] = useState(1);
  const [filteredData, setFilteredData] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchdata = async () => {
    try {
      const response = await fetch(`${Backend_Endpoint}/api/product`);
      const data = await response.json();
      setDatas(data.data);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    setFilteredData(datas?.find((item) => item?.id == id));
  }, [id, datas]);

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <PageContainer title="Product" description="Product">
      <Box sx={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Button
          onClick={() => {
            setEnglish(!isEnglish);
          }}
          variant="outlined"
        >
          {isEnglish ? "Монгол" : "Англи"}
        </Button>
        <Button variant="outlined" onClick={handleClickOpen}>
          Засах
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              component: "form",
              onSubmit: async (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());

                try {
                  const response = await fetch(
                    `${Backend_Endpoint}/api/product/${id}`,
                    {
                      method: "PUT",
                      headers: { "Content-type": "application/json" },
                      body: JSON.stringify(formJson),
                    }
                  );
                  if (response) {
                    alert("amjilttai soligloo");
                  }
                } catch (error) {
                  console.log(error);
                }
                handleClose();
              },
            },
          }}
        >
          <DialogTitle>Засах</DialogTitle>
          <DialogContent>
            {filteredData?.id == 1 && (
              <TextField
                autoFocus
                required
                margin="dense"
                id="entitle"
                name="entitle"
                label="Title"
                type="text"
                defaultValue={filteredData?.entitle}
                fullWidth
                variant="outlined"
              />
            )}
            {filteredData?.id == 1 && (
              <TextField
                autoFocus
                required
                margin="dense"
                id="mntitle"
                name="mntitle"
                label="Гарчиг"
                defaultValue={filteredData?.mntitle}
                type="text"
                fullWidth
                variant="outlined"
              />
            )}

            {filteredData?.endescription && (
              <TextField
                autoFocus
                required
                margin="dense"
                id="endescription"
                name="endescription"
                label="description"
                type="textarea"
                defaultValue={filteredData?.endescription}
                fullWidth
                variant="outlined"
              />
            )}
            {filteredData?.mndescription && (
              <TextField
                autoFocus
                required
                margin="dense"
                id="mndescription"
                name="mndescription"
                label="Тайлбар"
                type="text"
                defaultValue={filteredData?.mndescription}
                fullWidth
                variant="outlined"
              />
            )}

            <TextField
              autoFocus
              required
              margin="dense"
              id="image_url"
              name="image_url"
              label="Image URL"
              type="text"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Засах</Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={12}>
          <FormControl sx={{ marginBottom: 2 }} fullWidth>
            <Select
              id="sectionSelect"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
            >
              {datas.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.entitle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={6}>
          <CardMedia
            component="img"
            height="600"
            image={filteredData?.image_url || ""}
            alt="Paella dish"
          />
        </Grid>
        <Grid size={6}>
          {isEnglish && (
            <>
              <Typography variant="h4">{filteredData?.entitle}</Typography>
              <Typography variant="body1" align="justify">
                {filteredData?.endescription}
              </Typography>
            </>
          )}
          {!isEnglish && (
            <>
              <Typography variant="h4">{filteredData?.mntitle}</Typography>
              <Typography variant="body1" align="justify">
                {filteredData?.mndescription}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Page;
