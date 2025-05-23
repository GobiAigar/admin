"use client";
import { useState, forwardRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Grid,
  Slide,
  Divider,
  Tooltip,
  IconButton,
  InputAdornment,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Tab,
  Tabs,
  TextField,
  Button,
  Typography,
  Dialog,
  Zoom,
  styled,
} from "@mui/material";

import BulkActions from "./BulkActions";
import { useSnackbar } from "notistack";

import CloseIcon from "@mui/icons-material/Close";
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Backend_Endpoint } from "@/constants/constants";

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Results = ({ datas, statistic, setRender, render }) => {
  const [selectedTab, setSelectedTab] = useState("faq");
  const [selectedDatas, setSelectedDatas] = useState([]);
  const [id, setId] = useState(null);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSelectAllUsers = (event) => {
    setSelectedDatas(event.target.checked ? datas.map((data) => data.id) : []);
  };

  const handleSelectOneUser = (_event, id) => {
    if (!selectedDatas.includes(id)) {
      setSelectedDatas((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedDatas((prevSelected) =>
        prevSelected.filter((id) => id !== datas.id)
      );
    }
  };

  const selectedBulkActions = selectedDatas.length > 0;
  const selectedSomeUsers =
    selectedDatas.length > 0 && selectedDatas.length < datas.length;
  const selectedAllUsers = selectedDatas.length === datas.length;
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleConfirmDeleteFaq = (e) => {
    setId(e);
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleEditFaq = (e) => {
    setOpenConfirmDelete(true);
  };

  const handleEditStatistic = (e) => {
    setOpenConfirmDelete(true);
  };

  const handleDeleteCompleted = async () => {
    try {
      const response = await fetch(
        `${Backend_Endpoint}/api/${selectedTab}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setRender(!render);

      alert("Амжилттай устгалаа");
    } catch (error) {
      console.log(error, "error");
    }

    setOpenConfirmDelete(false);
  };

  return (
    <>
      <Grid container display="flex" spacing={3} pb={3}>
        <Grid item>
          <Button
            onClick={() => {
              setSelectedTab("faq");
            }}
            variant="outlined"
          >
            Асуулт, Хариулт
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedTab("statistics");
            }}
          >
            Статистик
          </Button>
        </Grid>
      </Grid>
      {
        <Card>
          <Box p={2}>
            {!selectedBulkActions && (
              <TextField
                sx={{
                  m: 0,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchTwoToneIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handleQueryChange}
                placeholder="Хайж буй хэрэглэгчийн нэр, имэйл эсвэл хэрэглэгчийн нэр ..."
                value={query}
                size="small"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            )}
            {selectedBulkActions && <BulkActions />}
          </Box>
          <Divider />
          {selectedTab === "faq" && (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>дэс дугаар</TableCell>
                      <TableCell>Англи асуулт</TableCell>
                      <TableCell>Англи хариулт</TableCell>
                      <TableCell>Монгол асуулт</TableCell>
                      <TableCell>Англи хариулт</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datas.map((data) => {
                      const isSelected = selectedDatas.includes(data.id);
                      return (
                        <TableRow hover key={data.id} selected={isSelected}>
                          <TableCell>
                            <Typography>{data?.id}</Typography>
                          </TableCell>

                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Box>
                                <Typography>{data.enquestion}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography>{data.mnquestion}</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography fontWeight="bold">
                              {data.mnanswer}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>{data.enanswer}</Typography>
                          </TableCell>
                          <TableCell>{data.mndescription}</TableCell>
                          <TableCell align="center">
                            <Typography noWrap>
                              <Tooltip title="Засах" arrow>
                                <IconButton
                                  value={data.id}
                                  onClick={() => {
                                    handleEditFaq(data.id);
                                  }}
                                  color="primary"
                                >
                                  <LaunchTwoToneIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Устгах" arrow>
                                <IconButton
                                  onClick={() => {
                                    handleConfirmDeleteFaq(data.id);
                                  }}
                                  color="primary"
                                >
                                  <DeleteTwoToneIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          {selectedTab === "statistics" && (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>дэс дугаар</TableCell>
                      <TableCell>Англи</TableCell>
                      <TableCell>Монгол</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {statistic.map((data) => {
                      const isSelected = selectedDatas.includes(data.id);
                      return (
                        <TableRow hover key={data.id} selected={isSelected}>
                          <TableCell>
                            <Typography>{data?.id}</Typography>
                          </TableCell>

                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Box>
                                <Typography>{data.english}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography>{data.mongolia}</Typography>
                          </TableCell>
                          <TableCell>{data.mndescription}</TableCell>
                          <TableCell align="center">
                            <Typography noWrap>
                              <Tooltip title="Засах" arrow>
                                <IconButton
                                  value={data.id}
                                  onClick={() => {
                                    handleEditFaq(data.id);
                                  }}
                                  color="primary"
                                >
                                  <LaunchTwoToneIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Устгах" arrow>
                                <IconButton
                                  onClick={() => {
                                    handleConfirmDeleteFaq(data.id);
                                  }}
                                  color="primary"
                                >
                                  <DeleteTwoToneIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Card>
      }

      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        keepMounted
        onClose={closeConfirmDelete}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <Typography
            align="center"
            sx={{
              py: 4,
              px: 6,
            }}
            variant="h3"
          >
            Устгах
          </Typography>

          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1,
              }}
              onClick={closeConfirmDelete}
            >
              Гарах
            </Button>
            <Button
              onClick={handleDeleteCompleted}
              size="large"
              sx={{
                mx: 1,
                px: 3,
              }}
              variant="contained"
            >
              Устгах
            </Button>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  );
};

Results.propTypes = {
  users: PropTypes.array.isRequired,
};

Results.defaultProps = {
  users: [],
};

export default Results;
