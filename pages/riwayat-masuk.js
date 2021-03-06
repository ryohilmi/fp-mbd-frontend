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

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function KategoriBarang() {
  const [open, setOpen] = useState(false);
  const [tsId, setId] = useState(null);
  const { mutate } = useSWRConfig();

  const { data: barang_masuks, error: barang_masukError } = useSWR(
    "/api/barang-masuk",
    fetcher
  );

  const { data: barang_masukDetails, error: detailError } = useSWR(
    tsId && `/api/kwitansi-supplier/${tsId}`,
    fetcher
  );

  useEffect(() => {
    console.log(barang_masukDetails);
  }, [barang_masukDetails]);

  const columns = [
    { field: "ts_id", headerName: "ID", flex: 0.2 },
    {
      field: "sup_nama",
      headerName: "Nama",
      flex: 1,
    },
    {
      field: "ts_tanggal",
      headerName: "Tanggal",
      type: "date",
      flex: 1,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "ts_total",
      headerName: "Total",
      type: "number",
      flex: 1,
      valueFormatter: (params) => currencyFormatter(params.value),
    },
  ];

  const detailColumns = [
    {
      field: "it_nama",
      headerName: "Nama",
      flex: 1,
    },
    {
      field: "kj_harga_satuan",
      headerName: "Harga",
      type: "number",
      flex: 1,
      valueFormatter: (params) => currencyFormatter(params.value),
    },
    {
      field: "kj_kuantitas",
      headerName: "Jumlah",
      type: "number",
      flex: 1,
    },
    {
      field: "kj_harga_beli",
      headerName: "Harga",
      type: "number",
      flex: 1,
      valueFormatter: (params) => currencyFormatter(params.value),
    },
  ];

  const handleDetail = (params, event) => {
    const id = params.id;
    setId(id);
    setOpen(true);
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

  if (barang_masukError) return <div>failed to load</div>;

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
            <h1 className={styles.header}>Riwayat Barang Masuk</h1>
          </div>
          <div className={styles.table}>
            <DataGrid
              getRowId={(row) => row.ts_id}
              rows={barang_masuks ?? []}
              columns={columns}
              rowsPerPageOptions={[10]}
              onRowDoubleClick={handleDetail}
              disableSelectionOnClick
            />
          </div>

          <Dialog open={open} onClose={handleClose} fullWidth>
            <div className={styles.dialogTable}>
              <DataGrid
                getRowId={(row) => Math.random()}
                rows={barang_masukDetails ?? []}
                columns={detailColumns}
                rowsPerPageOptions={[10]}
              />
            </div>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
