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
  TextField,
} from "@mui/material";
import useSWR, { useSWRConfig } from "swr";
import { useForm, Controller } from "react-hook-form";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function DaftarKategori() {
  const [open, setOpen] = useState(false);
  const [kategori, setKategori] = useState(null);
  const { register, control, handleSubmit } = useForm();
  const { mutate } = useSWRConfig();

  const { data: categories, error: categoriesError } = useSWR(
    "/api/kategori",
    fetcher
  );
  const { data: items, error: itemsError } = useSWR(
    kategori ? `/api/item/${kategori}` : "/api/item",
    fetcher
  );

  const onSubmit = (data) => {
    fetch("/api/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setOpen(false);
        mutate("/api/item");
      });
  };

  const currencyFormatter = (val) => {
    let formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

    return formatter.format(val);
  };

  const columns = [
    { field: "it_id", headerName: "ID", flex: 0.5 },
    {
      field: "it_nama",
      headerName: "Nama",
      flex: 1,
    },
    {
      field: "it_jumlah",
      headerName: "Jumlah",
      type: "number",
      flex: 0.3,
    },
    {
      field: "it_deskripsi",
      headerName: "Deskripsi",
      flex: 1.2,
    },

    {
      field: "kat_nama",
      headerName: "Kategori",
      flex: 0.8,
    },
    {
      field: "it_harga_jual",
      headerName: "Harga Jual",
      type: "number",
      flex: 0.6,
      valueFormatter: (params) => currencyFormatter(params.value),
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (itemsError || categoriesError) return <div>failed to load</div>;

  return (
    <div className="container">
      <main>
        <Sidebar />
        {/* 
        {!items ? (
          <div>Loading...</div>
        ) : ( */}
        <div className="content">
          <h1 className={styles.header}>Daftar Barang</h1>
          <div className={styles.between}>
            <div className={styles.filter}>
              <FormControl className={styles.select} size="small">
                <InputLabel id="select-category">Kategori</InputLabel>
                <Select
                  labelId="select-category"
                  id="select-category"
                  value={kategori}
                  label="Kategori"
                  onChange={(e) => setKategori(e.target.value)}
                >
                  <MenuItem value={null}>Default</MenuItem>
                  {categories &&
                    categories.map((category) => (
                      <MenuItem value={category.kat_id} key={category.kat_id}>
                        {category.kat_nama}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <Button
              variant="contained"
              className={styles.button}
              onClick={handleClickOpen}
            >
              Tambah Produk
            </Button>
          </div>
          <div className={styles.table}>
            <DataGrid
              getRowId={(row) => row.it_id}
              rows={items ?? []}
              columns={columns}
              rowsPerPageOptions={[10]}
              getRowClassName={(params) =>
                items && params.row.it_jumlah < 10 && styles.warningRow
              }
              disableSelectionOnClick
            />
          </div>
        </div>
        {/* )} */}
        <Dialog open={open} onClose={handleClose} fullWidth>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Tambah Produk</DialogTitle>
            <DialogContent className={styles.dialogForm}>
              <FormControl className={styles.select} size="small">
                <TextField
                  label="Nama"
                  variant="standard"
                  {...register("nama")}
                  className={styles.dialogInput}
                />
              </FormControl>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <FormControl className={styles.select}>
                    <InputLabel id="insert-category">Kategori</InputLabel>
                    <Select
                      labelId="category"
                      id="category"
                      label="Kategori"
                      {...field}
                    >
                      <MenuItem value={null}>Default</MenuItem>
                      {categories &&
                        categories.map((category) => (
                          <MenuItem
                            value={category.kat_id}
                            key={category.kat_id}
                          >
                            {category.kat_nama}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
              />
              <FormControl className={styles.select} size="small">
                <TextField
                  label="Deskripsi"
                  variant="standard"
                  {...register("deskripsi")}
                  className={styles.dialogInput}
                />
              </FormControl>
              <label htmlFor="harga-barang" className={styles.label}>
                Harga
              </label>
              <input
                type="number"
                id="harga-barang"
                min="1"
                className={styles.numberInput}
                {...register("harga")}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Batalkan</Button>
              <Button type="submit" onClick={handleClose}>
                Tambah
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </main>
    </div>
  );
}
