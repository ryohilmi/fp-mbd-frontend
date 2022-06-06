import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StoreIcon from "@mui/icons-material/Store";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export const nestedMenus = [
  {
    text: "Produk",
    icon: <ShoppingBagIcon sx={{ color: "white" }} />,
    menus: [
      {
        text: "Daftar Barang",
        link: "/daftar-barang",
      },
      {
        text: "Kategori Barang",
        link: "/kategori-barang",
      },
    ],
  },
  {
    text: "Penjualan",
    icon: <StoreIcon sx={{ color: "white" }} />,
    menus: [
      {
        text: "Riwayat Penjualan",
        link: "/riwayat-penjualan",
      },
      {
        text: "Statistik Barang Terjual",
        link: "/statistik-penjualan",
      },
    ],
  },
  {
    text: "Barang Masuk",
    icon: <AddShoppingCartIcon sx={{ color: "white" }} />,
    menus: [
      {
        text: "Riwayat Barang Masuk",
        link: "/riwayat-masuk",
      },
      {
        text: "Statistik Barang Masuik",
        link: "/statistik-masuk",
      },
    ],
  },
  {
    text: "Manajemen",
    icon: <AccountBoxIcon sx={{ color: "white" }} />,
    menus: [
      {
        text: "Customer",
      },
      {
        text: "Karyawan",
      },
    ],
  },
];
