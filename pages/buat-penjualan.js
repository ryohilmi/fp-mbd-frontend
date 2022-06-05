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
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";

export default function BuatPenjualan() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState({ barang: 0, harga: 0 });
  const [open, setOpen] = useState(false);

  const { register, control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    let res = JSON.parse(data.select);
    res.jumlah = Number(data.jumlah);
    res.total = res.jumlah * res.harga;

    let newRows = [...rows];
    newRows.push(res);

    console.log(res);

    setRows(newRows);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api = params.api;
          let id;

          api
            .getAllColumns()
            .filter((c) => c.field == "id")
            .forEach((c) => (id = params.getValue(params.id, c.field)));

          let newRows = rows.filter((row) => row.id != id);
          setRows(newRows);
        };

        return (
          <Button variant="outlined" color="error" onClick={onClick}>
            <DeleteIcon />
          </Button>
        );
      },
    },
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "namaBarang", headerName: "Nama Barang", flex: 1.2 },
    {
      field: "harga",
      headerName: "Harga per pcs",
      type: "number",
      flex: 1,
      valueFormatter: (params) => currencyFormatter(params.value),
    },
    {
      field: "jumlah",
      headerName: "Jumlah",
      type: "number",
      flex: 0.8,
    },
    {
      field: "total",
      headerName: "Harga",
      type: "number",
      flex: 1,
      valueFormatter: (params) => currencyFormatter(params.value),
    },
  ];

  const initialRows = [
    {
      id: 2,
      namaBarang: "Kecap Bango",
      harga: 15000,
      jumlah: 4,
      total: 60000,
    },
    {
      id: 3,
      namaBarang: "Kecap Bango",
      harga: 15000,
      jumlah: 4,
      total: 60000,
    },
    {
      id: 4,
      namaBarang: "Kecap Bango",
      harga: 15000,
      jumlah: 4,
      total: 60000,
    },
    {
      id: 5,
      namaBarang: "Kecap Bango",
      harga: 15000,
      jumlah: 4,
      total: 60000,
    },
  ];

  // useEffect(() => {
  //   setRows(initialRows);
  // }, []);

  useEffect(() => {
    let totalBarang = rows.reduce((prev, curr) => {
      return prev + curr.jumlah;
    }, 0);

    let totalHarga = rows.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0);

    setTotal({ barang: totalBarang, harga: totalHarga });
  }, [rows]);

  return (
    <div className="container">
      <main>
        <Sidebar />

        <div className="content">
          <h1 className={styles.header}>Buat Penjualan</h1>
          <div className={styles.transaction}>
            <div className={styles.selectId}>
              <FormControl className={styles.select} size="small">
                <InputLabel id="demo-simple-select-label">Pembeli</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={styles.select} size="small">
                <InputLabel id="demo-simple-select-label">Karyawan</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={styles.sum}>
              <Button variant="contained" className={styles.button}>
                Simpan Transaksi
              </Button>
              <p>Banyak Barang: {total.barang}</p>
              <p>Total: {currencyFormatter(total.harga)}</p>
            </div>
          </div>
          <div className={styles.table}>
            <DataGrid rows={rows} columns={columns} rowsPerPageOptions={[10]} />
          </div>
          <Button
            variant="contained"
            sx={{ margin: "1rem 0" }}
            onClick={handleClickOpen}
          >
            Tambah
          </Button>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Tambah Produk</DialogTitle>
            <DialogContent>
              <FormControl className={styles.select} size="small">
                <InputLabel id="demo-simple-select-label">Barang</InputLabel>
                <Controller
                  name="select"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={age}
                      label="Age"
                      // onChange={handleChange}
                      {...field}
                    >
                      <MenuItem
                        value='{
                        "id": 2,
                        "namaBarang": "Kecap Bango",
                        "harga": 15000
                        }'
                      >
                        Kecap Bango - Rp. 15.000
                      </MenuItem>
                      <MenuItem
                        value='{
                        "id": 3,
                        "namaBarang": "Ayam Bango",
                        "harga": 25000
                        }'
                      >
                        Ayam Bango - Rp. 25.000
                      </MenuItem>
                      <MenuItem
                        value='{
                        "id": 5,
                        "namaBarang": "Sabun Bango",
                        "harga": 10000
                        }'
                      >
                        Sabun Bango - Rp. 10.000
                      </MenuItem>
                    </Select>
                  )}
                />

                <label htmlFor="jumlah-barang" className={styles.label}>
                  Jumlah
                </label>
                <input
                  type="number"
                  name=""
                  id="jumlah-barang"
                  className={styles.numberInput}
                  {...register("jumlah")}
                />
                <p style={{ fontSize: "1.2rem", margin: "0.75rem 0" }}>
                  Total Harga: Rp. 50.000
                </p>
              </FormControl>
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
