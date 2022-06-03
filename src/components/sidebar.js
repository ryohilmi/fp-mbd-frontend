import * as React from "react";
import { nestedMenus } from "../menus";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const drawerWidth = 250;

const menus = [
  { text: "Buat Penjualan", link: "/buat-penjualan" },
  { text: "Catat Barang Masuk", link: "/catat-barang-masuk" },
];

export default function Sidebar() {
  const [open, setOpen] = React.useState(nestedMenus.map(() => false));

  const openMenu = (index) => {
    const newOpen = { ...open };
    newOpen[index] = !open[index];
    setOpen(newOpen);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#004E7C",
          color: "white",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          display: "flex",
          padding: "0.5rem 1rem",
          alignItems: "center",
        }}
      >
        <Image src="/images/logo.png" alt="logo" width={60} height={60} />
        <Typography
          fontWeight={600}
          sx={{
            fontSize: "1.5rem",
            marginLeft: "1.5rem",
          }}
        >
          Kazier
        </Typography>
      </Box>
      <Divider />
      <List
        sx={{
          minHeight: "102vh",
        }}
      >
        {menus.map((menu, index) => (
          <ListItem key={menu} disablePadding>
            <ListItemButton>
              <ListItemText primary={menu.text} />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider />

        {nestedMenus.map((nestedMenu, index) => (
          <React.Fragment key={nestedMenu}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => openMenu(index)}>
                <ListItemIcon>{nestedMenu.icon}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontWeight: 600 }}
                  primary={nestedMenu.text}
                />
                {open[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List>
                {nestedMenu.menus.map((menu) => (
                  <ListItem key={menu} disablePadding>
                    <ListItemButton disablePadding>
                      <ListItemText inset primary={menu.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}
