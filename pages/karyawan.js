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

export default function Karyawan() {
  const [open, setOpen] = useState(false);
  const { register, control, handleSubmit } = useForm();
  const { mutate } = useSWRConfig();

  const { data: items, error: itemsError } = useSWR("/api/karyawan", fetcher);

  const onSubmit = (data) => {
    fetch("/api/karyawan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        setOpen(false);
        mutate("/api/karyawan");
      });
  };

  const columns = [
    { field: "kar_id", headerName: "ID", flex: 0.2 },
    {
      field: "kar_nama",
      headerName: "Nama",
      flex: 1,
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (itemsError) return <div>failed to load</div>;

  return (
    <div className="container">
      <main>
        <Sidebar />
        {/* 
        {!items ? (
          <div>Loading...</div>
        ) : ( */}
        <div className="content">
          <div className={styles.between}>
            <h1 className={styles.header}>Karyawan</h1>
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
              getRowId={(row) => row.kar_id}
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
            <DialogTitle>Tambah Karyawan</DialogTitle>
            <DialogContent className={styles.dialogForm}>
              <FormControl className={styles.select} size="small">
                <TextField
                  label="Nama"
                  variant="standard"
                  {...register("nama")}
                  className={styles.dialogInput}
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
