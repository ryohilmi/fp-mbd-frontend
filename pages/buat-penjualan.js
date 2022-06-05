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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function BuatPenjualan() {
  const { data: customers } = useSWR("/api/customer", fetcher);
  const { data: cashiers } = useSWR("/api/karyawan", fetcher);
  const { data: items } = useSWR("/api/item", fetcher);

  const [customer, setCustomer] = useState(null);
  const [cashier, setCashier] = useState(null);

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState({ barang: 0, harga: 0 });
  const [open, setOpen] = useState(false);

  const { register, control, handleSubmit } = useForm();

  const simpanTransaksi = () => {
    let buyItems = rows.map((row) => {
      return { id: row.id, total: row.jumlah };
    });

    const data = {
      customer_id: customer,
      karyawan_id: cashier,
      detail: buyItems,
    };

    fetch("/api/transaksi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setOpen(false);
      });
  };

  const onSubmit = (data) => {
    let res = JSON.parse(data.select);
    res.jumlah = Number(data.jumlah);
    res.total = res.jumlah * res.harga;

    let newRows = [...rows];
    newRows.push(res);

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
                <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={customer}
                  label="Customer"
                  onChange={(e) => setCustomer(e.target.value)}
                >
                  {customers &&
                    customers.map((customer) => (
                      <MenuItem value={customer.cust_id} key={customer.cust_id}>
                        {customer.cust_nama}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl className={styles.select} size="small">
                <InputLabel id="demo-simple-select-label">Karyawan</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cashier}
                  label="Customer"
                  onChange={(e) => setCashier(e.target.value)}
                >
                  {cashiers &&
                    cashiers.map((cashier) => (
                      <MenuItem value={cashier.kar_id} key={cashier.kar_id}>
                        {cashier.kar_nama}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className={styles.sum}>
              <Button
                variant="contained"
                className={styles.button}
                onClick={simpanTransaksi}
              >
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
                      label="Age"
                      {...field}
                    >
                      {items &&
                        items
                          .sort((a, b) => {
                            const nameA = a.it_nama.toUpperCase();
                            const nameB = b.it_nama.toUpperCase();
                            if (nameA < nameB) {
                              return -1;
                            }
                            if (nameA > nameB) {
                              return 1;
                            }

                            return 0;
                          })
                          .map((item) => {
                            const value = {
                              id: item.it_id,
                              namaBarang: item.it_nama,
                              harga: item.it_harga_jual,
                              stok: item.it_jumlah,
                            };
                            return (
                              <MenuItem
                                value={JSON.stringify(value)}
                                key={item}
                              >
                                {`${item.it_nama} - ${currencyFormatter(
                                  item.it_harga_jual
                                )}`}
                              </MenuItem>
                            );
                          })}
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
                  min="1"
                  className={styles.numberInput}
                  {...register("jumlah")}
                />
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
