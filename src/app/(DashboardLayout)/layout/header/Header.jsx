import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Button,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
// components
import Profile from "./Profile";
import { IconMenu } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const Header = ({ toggleMobileSidebar }) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  const path = usePathname();

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <Box
          width={"100%"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack>
            <Typography variant="h5">
              {path == "/" && "Хяналтын самбар"}
            </Typography>
            <Typography variant="h5">
              {path == "/accounts" && "Админууд"}
            </Typography>
            <Typography variant="h5">
              {path == "/company" && "Компаний мэдээлэл"}
            </Typography>
            <Typography variant="h5">
              {path == "/faq" && "Түгээмэл асуулт, хариулт"}
            </Typography>
            <Typography variant="h5">
              {path == "/headers" && "Толгой хэсэг"}
            </Typography>
            <Typography variant="h5">
              {path == "/homepage" && "Нүүр хуудас"}
            </Typography>
            <Typography variant="h5">
              {path == "/messages" && "Зурвас"}
            </Typography>
            <Typography variant="h5">
              {path == "/news" && "Мэдээлэлийн хуудас"}
            </Typography>
            <Typography variant="h5">
              {path == "/product" && "Бүтээгдэхүүн хуудас"}
            </Typography>
            <Typography variant="h5">
              {path == "/statistics" && "Статистик, судалгаа"}
            </Typography>
            <Typography variant="h5">
              {path == "/sustainability" && "Батламж, Гэрчилгээ"}
            </Typography>
          </Stack>
          <Stack spacing={1} direction="row" alignItems="center">
            <Profile />
          </Stack>
        </Box>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
