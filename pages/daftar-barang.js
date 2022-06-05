import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from '../src/components/sidebar';
import styles from '../styles/DataInput.module.scss';
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [kategori, setKategori] = useState(null);
  const { data: categories, error: categoriesError } = useSWR(
    '/api/kategori',
    fetcher
  );
  const { data: items, error: itemsError } = useSWR(
    kategori ? `/api/item/${kategori}` : '/api/item',
    fetcher
  );

  const currencyFormatter = (val) => {
    let formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    });

    return formatter.format(val);
  };

  const columns = [
    { field: 'it_id', headerName: 'ID', flex: 0.5 },
    {
      field: 'it_nama',
      headerName: 'Nama',
      flex: 1,
    },
    {
      field: 'it_jumlah',
      headerName: 'Jumlah',
      type: 'number',
      flex: 0.3,
    },
    {
      field: 'it_deskripsi',
      headerName: 'Deskripsi',
      flex: 1.2,
    },

    {
      field: 'kat_nama',
      headerName: 'Kategori',
      flex: 0.8,
    },
    {
      field: 'it_harga_jual',
      headerName: 'Harga Jual',
      type: 'number',
      flex: 0.6,
      valueFormatter: (params) => currencyFormatter(params.value),
    },
  ];

  const initialRows = [
    {
      id: 2,
      namaBarang: 'Kecap Bango',
      harga: 15000,
      jumlah: 4,
      total: 60000,
    },
    {
      id: 3,
      namaBarang: 'Kecap Bango',
      harga: 15000,
      jumlah: 4,
      total: 60000,
    },
    {
      id: 4,
      namaBarang: 'Kecap Bango',
      harga: 15000,
      jumlah: 4,
      total: 60000,
    },
    {
      id: 5,
      namaBarang: 'Kecap Bango',
      harga: 15000,
      jumlah: 4,
      total: 60000,
    },
  ];

  if (itemsError || categoriesError) return <div>failed to load</div>;

  return (
    <div className='container'>
      <main>
        <Sidebar />
        {/* 
        {!items ? (
          <div>Loading...</div>
        ) : ( */}
        <div className='content'>
          <h1 className={styles.header}>Daftar Produk</h1>
          <div className={styles.filter}>
            <FormControl className={styles.select} size='small'>
              <InputLabel id='demo-simple-select-label'>Kategori</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={kategori}
                label='Kategori'
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
      </main>
    </div>
  );
}
