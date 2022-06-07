import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../src/components/sidebar";
import styles from "../styles/DataInput.module.scss";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Input,
} from "@mui/material";
import useSWR, { useSWRConfig } from "swr";
import { useForm } from "react-hook-form";
import LocalShipping from "@mui/icons-material/LocalShipping";
import Storefront from "@mui/icons-material/Storefront";


const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function KategoriBarang() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const { mutate } = useSWRConfig();

  const { data: categories, error: categoriesError } = useSWR(
    "/api/kategori",
    fetcher
  );

  const columns = [
    { field: "kat_id", headerName: "ID", flex: 0.2 },
    {
      field: "kat_nama",
      headerName: "Nama",
      flex: 1,
    },
  ];

  const onSubmit = (data) => {
    fetch("/api/kategori", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setOpen(false);
        mutate("/api/kategori");
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (categoriesError) return <div>failed to load</div>;

  return (
    <div className="container">
      <main>
        <Sidebar />
        {/* 
        {!items ? (
          <div>Loading...</div>
        ) : ( */}
        <div className="content">
          <div className={styles.between2}>
            <Button
              variant="contained"
              className={styles.button}
              onClick={handleClickOpen}
            >
            <LocalShipping sx={{ color: "white" }} />
              Buat Penjualan
            </Button>

            <Button
              variant="contained"
              className={styles.button2}
              onClick={handleClickOpen}
            >
            <Storefront sx={{ color: "004e7c" }} />
              Catat Barang Masuk
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
