import './style.css';
import {useState, useEffect} from 'react'

function App() {
  
  const [viewPage, setViewPage] = useState('stokPupan')
  const [inputNameProduct, setInputNameProduct] = useState('')
  const [inputCategory, setInputCategory] = useState('')
  const [inputHargaModalPak, setInputHargaModalPak] = useState(0)
  const [inputJumlahProdukPak, setInputJumlahProdukPak] = useState(0)
  const [inputHargaModalPcs, setInputHargaModalPcs] = useState(0)
  const [inputJumlahProdukPcs, setInputJumlahProdukPcs] = useState(0)

  function handleClickChangePage(page) {
    setViewPage(page)
  }

  return (
    <div>
      <div className="header">
        <button onClick={() => handleClickChangePage("stokPupan")}>Update Stok Tingwe Pupan</button>
        <button onClick={() => handleClickChangePage("stokJambu")}>Update Stok Tingwe Jambu</button>
        <button onClick={() => handleClickChangePage("penjualanPupan")}>Hitung Penjualan Tingwe Pupan</button>
        <button onClick={() => handleClickChangePage("penjualanJambu")}>Hitung Penjualan Tingwe Jambu</button>
        <button onClick={() => handleClickChangePage("tambahProduk")} className="add-product">Tambah Produk</button>
      </div>

    {/* ==================TAMBAH PRODUK================== */}
      <div className="container">
        <h3>TAMBAH PRODUK</h3>
        <div className="wrapper-label">
          <label>Nama Produk *</label>
          <input 
            autoFocus
            onChange={(e) => setInputNameProduct(e.target.value)}
            />
        </div>
        <div className="wrapper-label">
          <label>Kategori *</label>
          <input
            onChange={(e) => setInputCategory(e.target.value)}
            />
        </div>
        <div className="wrapper-label">
          <label>Harga Modal Produk (pak) <i>Isi Jika Pembelian Dalam Pak (DSM, RB, Marsbrand, Kertas, dll)</i></label>
          <input
            type="number"
            onChange={(e) => setInputHargaModalPak(e.target.value)}
            disabled={inputHargaModalPcs || inputJumlahProdukPcs}
            />
        </div>
        <div className="wrapper-label">
          <label>Jumlah Produk dalam 1 pak (optional) <i>Isi Jika Pembelian Dalam Pak (DSM, RB, Marsbrand, Kertas, dll)</i></label>
          <input
            type="number"
            onChange={(e) => setInputJumlahProdukPak(e.target.value)}
            disabled={inputHargaModalPcs || inputJumlahProdukPcs}
            />
        </div>
        <div className="wrapper-label">
          <label>Harga Modal Produk (satuan) <i>Isi Jika Pembelian Dalam Satuan (Aromatik, Pabrikan, Bako Daerah)</i> </label>
          <input
            type="number"
            onChange={(e) => setInputHargaModalPcs(e.target.value)}
            disabled={inputHargaModalPak || inputJumlahProdukPak}
            />
        </div>
        <div className="wrapper-label">
          <label>Jumlah Produk (satuan) <i>Isi Jika Pembelian Dalam Satuan (Aromatik, Pabrikan, Bako Daerah)</i></label>
          <input
            type="number"
            onChange={(e) => setInputJumlahProdukPcs(e.target.value)}
            disabled={inputHargaModalPak || inputJumlahProdukPak}
            />
        </div>
      </div>
    </div>
  );
}

export default App;
