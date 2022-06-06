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
  const [tpId, setId] = useState(null);
  const { mutate } = useSWRConfig();

  const { data: transactions, error: transactionsError } = useSWR(
    "/api/transaksi",
    fetcher
  );

  const { data: transactionDetails, error: detailError } = useSWR(
    tpId && `/api/kwitansi/${tpId}`,
    fetcher
  );

  useEffect(() => {
    console.log(transactionDetails);
  }, [transactionDetails]);

  const columns = [
    { field: "tp_id", headerName: "ID", flex: 0.2 },
    {
      field: "cust_nama",
      headerName: "Nama",
      flex: 1,
    },
    {
      field: "tp_tanggal",
      headerName: "Tanggal",
      type: "date",
      flex: 1,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "tp_total",
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
      field: "kb_harga_satuan",
      headerName: "Harga",
      type: "number",
      flex: 1,
      valueFormatter: (params) => currencyFormatter(params.value),
    },
    {
      field: "kb_kuantitas",
      headerName: "Jumlah",
      type: "number",
      flex: 1,
    },
    {
      field: "kb_harga_beli",
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

  if (transactionsError) return <div>failed to load</div>;

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
            <h1 className={styles.header}>Riwayat Transaksi Penjualan</h1>
          </div>
          <div className={styles.table}>
            <DataGrid
              getRowId={(row) => row.tp_id}
              rows={transactions ?? []}
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
                rows={transactionDetails ?? []}
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
