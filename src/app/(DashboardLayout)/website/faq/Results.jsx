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
import Label from "./Label";

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const CardWrapper = styled(Card)(
  ({ theme }) => `

  position: relative;
  overflow: visible;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: inherit;
    z-index: 1;
    transition: ${theme.transitions.create(["box-shadow"])};
  }
      
    &.Mui-selected::after {
      box-shadow: 0 0 0 3px ${theme.colors.primary.main};
    }
  `
);

const TabsWrapper = styled(Tabs)(
  ({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          box-shadow: none;
      }
    }
    `
);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Results = ({ datas }) => {
  const [selectedTab, setSelectedTab] = useState("faq");
  const [selectedDatas, setSelectedDatas] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");

  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSelectAllUsers = (event) => {
    setSelectedDatas(event.target.checked ? datas.map((user) => user.id) : []);
  };

  const handleSelectOneUser = (_event, userId) => {
    if (!selectedDatas.includes(userId)) {
      setSelectedDatas((prevSelected) => [...prevSelected, userId]);
    } else {
      setSelectedDatas((prevSelected) =>
        prevSelected.filter((id) => id !== userId)
      );
    }
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const selectedBulkActions = selectedDatas.length > 0;
  const selectedSomeUsers =
    selectedDatas.length > 0 && selectedDatas.length < datas.length;
  const selectedAllUsers = selectedDatas.length === datas.length;

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = () => {
    setOpenConfirmDelete(false);

    enqueueSnackbar("Хэрэглэгч устгагдсан", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      TransitionComponent: Zoom,
    });
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
              setSelectedTab("statistic");
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
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedAllUsers}
                          indeterminate={selectedSomeUsers}
                          onChange={handleSelectAllUsers}
                        />
                      </TableCell>
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
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isSelected}
                              onChange={(event) =>
                                handleSelectOneUser(event, data?.id)
                              }
                              value={isSelected}
                            />
                          </TableCell>
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
                              <Tooltip title="Харуулах" arrow>
                                <IconButton
                                  component={Link}
                                  href="#"
                                  color="primary"
                                >
                                  <LaunchTwoToneIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Устгах" arrow>
                                <IconButton
                                  onClick={handleConfirmDelete}
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
          :(<>aaa</>)
        </Card>
      }

      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
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
