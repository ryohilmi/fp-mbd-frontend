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
      },
      {
        text: "Kategori Barang",
      },
      {
        text: "Lihat Stok",
      },
    ],
  },
  {
    text: "Penjualan",
    icon: <StoreIcon sx={{ color: "white" }} />,
    menus: [
      {
        text: "Riwayat Penjualan",
      },
      {
        text: "Statistik Barang Terjual",
      },
    ],
  },
  {
    text: "Barang Masuk",
    icon: <AddShoppingCartIcon sx={{ color: "white" }} />,
    menus: [
      {
        text: "Riwayat Barang Masuk",
      },
      {
        text: "Statistik Barang Terjual",
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
