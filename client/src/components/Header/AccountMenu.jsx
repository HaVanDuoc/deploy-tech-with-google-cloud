import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorCurrentUser } from "~/redux/AuthCurrentUser/reducer";
import { showLoginForm } from "~/redux/ModalContainer/ModalContainerAction";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ModalContainer from "~/containers/ModalContainer";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { FormatFullName } from "~/helper/format";
import { refreshPage } from "~/utils";
import { Link } from "react-router-dom";

const AccountMenu = () => {
  const currentUser = useSelector(selectorCurrentUser);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="account-menu">
      {currentUser.isLogged ? (
        //
        //   Đã đăng nhập
        //
        <React.Fragment>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip
              title={FormatFullName(
                currentUser.user.data.firstName,
                currentUser.user.data.middleName,
                currentUser.user.data.lastName
              )}
            >
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar alt="avatar" src={currentUser.user.data.avatar} />
                </StyledBadge>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Link to="/profile" className="link">
              <MenuItem onClick={handleClose}>
                <Avatar src={currentUser.user.data.avatar} />{" "}
                <Typography
                  variant="span"
                  color="var(--color-text) !important"
                  fontWeight={500}
                >
                  {FormatFullName(
                    currentUser.user.data.firstName,
                    currentUser.user.data.middleName,
                    currentUser.user.data.lastName
                  )}
                </Typography>
              </MenuItem>
            </Link>

            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Thêm một tài khoản khác
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Cài đặt
            </MenuItem>
            <MenuItem
              onClick={() => {
                localStorage.setItem("access_token", "");
                refreshPage();
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Đăng xuất
            </MenuItem>
          </Menu>
        </React.Fragment>
      ) : (
        //
        // chưa đăng nhập
        //
        <ModalContainer>
          <Button
            onClick={() => dispatch(showLoginForm())}
            sx={{
              color: "var(--color-secondary)",
            }}
          >
            <Typography textTransform="none">Đăng nhập</Typography>
            <SentimentSatisfiedAltIcon sx={{ marginLeft: 1 }} />
          </Button>
        </ModalContainer>
      )}
    </Box>
  );
};

export default AccountMenu;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
