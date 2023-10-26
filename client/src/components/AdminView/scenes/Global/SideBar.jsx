import { useState } from "react";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../themeAdmin.js";
import PollIcon from '@mui/icons-material/Poll';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";/* 
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'; */
import EmailIcon from '@mui/icons-material/Email';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HomeIcon from '@mui/icons-material/Home';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

export const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "2px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#228d07 !important",
        },
        "& .pro-menu-item.active": {
          color: "#539a07 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "5px 0 10px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Healtech
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              to={'/admin'}
              title="Dashboard"
              icon={<PollIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Tables
            </Typography>
            <Item
              title="Update Products"
              to="/admin/table-update"
              icon={<UpdateOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create Products"
              to="/admin/table-create"
              icon={<AddCircleOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users Information"
              to="/admin/table-users"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
           {/*  <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Sales
            </Typography>
            <Item
              title="Sales"
              to="/admin/sales"
              icon={<AttachMoneyOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Marketing
            </Typography>
            <Item
              title="Coupon"
              to="/admin/coupon"
              icon={<StorefrontOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Send Emails"
              to='/admin/email'
              icon={<EmailIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Store
            </Typography>
            <Item
              title="Home"
              to="/home"
              icon={<HomeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};


