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
import ActiveLink from "./ActiveLink";
import { useRouter } from "next/router";

const drawerWidth = 250;

const menus = [
  { text: "Dashboard", link: "/dashboard" },
  { text: "Buat Penjualan", link: "/buat-penjualan" },
  { text: "Catat Barang Masuk", link: "/catat-barang-masuk" },
];

export default function Sidebar() {
  const [open, setOpen] = React.useState(nestedMenus.map(() => false));
  const router = useRouter();

  const openMenu = (index) => {
    const newOpen = { ...open };
    newOpen[index] = !open[index];
    setOpen(newOpen);
  };
  console.log(router.asPath);

  React.useEffect(() => {
    console.log(router.asPath);
    if (router.asPath) {
      console.log(router.asPath);
    }
  });

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
      <ActiveLink href="/">
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
      </ActiveLink>
      <Divider />
      <List
        sx={{
          minHeight: "102vh",
        }}
      >
        {menus.map((menu, index) => (
          <ListItem key={menu.link} disablePadding>
            <ActiveLink href={menu.link}>
              <ListItemButton>
                <ListItemText primary={menu.text} />
              </ListItemButton>
            </ActiveLink>
          </ListItem>
        ))}

        <Divider />

        {nestedMenus.map((nestedMenu, index) => (
          <React.Fragment key={nestedMenu.text}>
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
                  <ListItem key={menu.link} disablePadding>
                    <ActiveLink href={menu.link}>
                      <ListItemButton>
                        <ListItemText primary={menu.text} />
                      </ListItemButton>
                    </ActiveLink>
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
