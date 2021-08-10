import {useState, useEffect} from 'react'
import Select from 'react-select'
import categoryOptions from './CategoryOption'
import axios from 'axios'
import { toast } from 'react-toastify';
import NavigationProductManagement from '../../Components/navigationProductManagement'
import getIndoTime from '../../Helpers/getIndoTime'

function AddProduct({setIsPageActive}){
    
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState(0)
    const [modalPrice, setModalPrice] = useState(0)
    const [sellPriceRetail, setSellPriceRetail] = useState(0)
    const [sellPriceGrocery, setSellPriceGrocery] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setIsPageActive('addProduct')
    },[])

    function handleSubmit() {
        if(loading) return;
        setLoading(true)
        axios.post('/product', {
            name,
            category,
            amount,
            modalPrice,
            sellPriceRetail,
            sellPriceGrocery,
            created_at: getIndoTime(new Date())
        })
        .then(data => {
            setLoading(false)
            toast(`🦄 Tambah Produk ${name}: ${amount}`, {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setName('')
            setCategory('')
            setAmount(0)
            setModalPrice(0)
            setSellPriceRetail(0)
            setSellPriceGrocery(0)
        })
        .catch(err => {
            setLoading(false)
            toast.error('🐔 error pak eko')
        })
    }
    
    return(
        <div className="section-add-product">
            {/* <NavigationProductManagement/> */}
            <div className="wrapper-add-product">
                <h3 className="page-title">TAMBAH PRODUK</h3>
                <div className="wrapper-label">
                <label>Nama Produk</label>
                <input 
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="wrapper-label">
                <label>Kategori</label>
                <Select
                    value={{label: category, value: category}}
                    options={categoryOptions}
                    onChange={(value) => setCategory(value.value)}
                />
                </div>
                <div className="wrapper-label">
                <label>Jumlah Produk (pcs)</label>
                <input
                    type="number"
                    value={amount == 0 ? '' : amount }
                    onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="wrapper-label">
                <label>Harga Modal Produk (per pcs) </label>
                <input
                    type="number"
                    value={modalPrice == 0 ? '' : modalPrice }
                    placeholder="Rp"
                    onChange={(e) => setModalPrice(e.target.value)}
                    />
                </div>
                <div className="wrapper-label">
                <label>Harga Jual Produk Retail (per pcs)</label>
                <input
                    type="number"
                    value={sellPriceRetail == 0 ? '' : sellPriceRetail }
                    placeholder="Rp"
                    onChange={(e) => setSellPriceRetail(e.target.value)}
                    />
                </div>
                 {/* <div className="wrapper-label">
                <label>Harga Jual Produk Cabang (per pcs)</label>
                <input
                    value={sellPriceGrocery == 0 ? '' : sellPriceGrocery }
                    type="number"
                    onChange={(e) => setSellPriceGrocery(e.target.value)}
                    placeholder="Rp"
                    />
                </div> */}
                <button onClick={handleSubmit}>SUBMIT</button>
            </div>
      </div>
    )
}

export default AddProduct;