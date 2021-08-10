import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import NavigationProductManagement from '../../Components/navigationProductManagement'
import getIndoTime from '../../Helpers/getIndoTime'
import Search from '../../Components/Search'
import DatePicker from 'react-datepicker'
import moment from 'moment'

function SellManagement({setIsPageActive}) {

    const [productList, setProductList] = useState([])
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

    useEffect(() =>{
        getData()
        setIsPageActive('penjualan')
    },[])
    
    function getData() {
        axios.get('/product')
        .then(({data}) => {
            setProductList(data)
        })
        .catch(err => {
            toast.error('🐔 error pak eko')
        })
    }

    function handleChangeDate(date) {
        setDate(date)
        setShowDatePicker(false)
    }


    return(
        <div className="section-list-product">
            <h3 className="page-title">PENJUALAN HARIAN</h3>
            <div>
                <Search dataList={productList} setDataList={setProductList}/>
                <div style={{display: 'inline-block', marginLeft: '10px'}}>
                    <div className="button--date" onClick={() => setShowDatePicker(!showDatePicker)}>
                        {`${moment(date).format('L')}`}
                    </div>
                    {
                        showDatePicker && (
                            <div style={{position: 'absolute'}}>
                                <DatePicker
                                    onChange={handleChangeDate}
                                    selected={date}
                                    inline
                                />
                            </div>
                        )
                    }
                </div>
            </div>
            <br/>
            <br/>
            <div className="table-list-product">
                <div className="table-list-product-thead">
                    <div className="flex1 table-list-product-td">Nama Produk</div>
                    <div className="flex1 table-list-product-td">Kategori</div>
                    <div className="flex1 table-list-product-td">Jumlah Stok</div>
                    <div className="flex1 table-list-product-td">Harga Jual Retail</div>
                    <div className="flex1 table-list-product-td">Harga per Satuan <span style={{fontSize: '12px'}}>(jika beda/ada yang nawar)</span></div>
                    <div className="flex1 table-list-product-td">Penjualan</div>
                </div>
                <div className="table-list-product-tbody">
                    {
                        productList.map((product, indexProduct) => {
                            return(
                                <React.Fragment key={product._id}>
                                    {
                                        product.isShow && <Product date={date} key={product._id} product={product} indexProduct={indexProduct} productList={productList} setProductList={setProductList}/>
                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

function Product({product, indexProduct, productList, setProductList, date}) {

    const [amount, setAmount] = useState(0)
    const [customPrice, setCustomPrice] = useState(0)
    const [loading, setLoading] = useState(false)
    
    function handleSubmit(dataProduct, isSoldFrom){
        if(loading) return;
        setLoading(true)
        axios.post(`/transaction`, {
            amount,
            productId: dataProduct._id,
            isSoldFrom : customPrice == 0 ? isSoldFrom : 'custom retail',
            customPrice,
            created_at: getIndoTime(date)
        })
        .then(({data}) => {
            setProductList(productList.map(product => {
                if(product._id === dataProduct._id){
                    return {
                        ...product,
                        amount: product.amount - amount
                    }
                }
                return product
            }))
            setLoading(false)
            toast(`🦄 Jual ${product.name}: ${amount} Total Rp. ${data.price * data.amount}`, {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setAmount(0)
            setCustomPrice(0)
        })
        .catch(err => {
            setLoading(false)
            toast.error('🐔 error pak eko')
        })
    }

    function handleChangeAmount(e) {
        setAmount(e.target.value)
        if(product.name === 'Kertas Manis'){
            if(e.target.value == 0){
                setCustomPrice(0)
                return
            }
            if(e.target.value == 10 || e.target.value % 10 == 0){
                setCustomPrice(7000/10)
            }else if(e.target.value == 1){
                setCustomPrice(1000)
            }else if(e.target.value == 2){
                setCustomPrice(1500 / 2)
            }else if(e.target.value % 3 == 0){
                setCustomPrice(0)
            }else if(e.target.value % 2 == 0){
                setCustomPrice(1500/2)
            }else if(e.target.value == 5){
                setCustomPrice(700)
            }else if(e.target.value == 7){
                setCustomPrice(714)
            }else if(e.target.value == 8){
                setCustomPrice(687)
            }else {
                setCustomPrice(0)
            }
        }else if(product.name == 'Jumbo Coklat'){
            if(e.target.value == 10){
                setCustomPrice(10000)
            }else {
                setCustomPrice(0)
            }
        }
    }

    return (
        <div className={`table-list-product-tr ${indexProduct % 2 === 0 ? 'table-list-product-tr__white' : 'table-list-product-tr__black' }`}>
            <div className="flex1 table-list-product-td">{product.name}</div>
            <div className="flex1 table-list-product-td">{product.category}</div>
            <div className="flex1 table-list-product-td">{product.amount}</div>
            <div className="flex1 table-list-product-td">{product.sellPriceRetail}</div>
            <div className="flex1 table-list-product-td">
                <input 
                    onChange={(e) => setCustomPrice(e.target.value)}
                    placeholder="0"
                    type="number"
                    className="input-currency"
                    value={customPrice == 0? '' : customPrice}
                    min={0}
                />
            </div>
            <div className="flex1 table-list-product-td">
                <input 
                    onChange={handleChangeAmount}
                    value={amount == 0 ? '' : amount}
                    placeholder="0"
                    type="number"
                    className="input-number"
                    min={0}
                />
                <button className="btn-submit-update-stok" onClick={() => handleSubmit(product, 'retail')}>Retail</button>
                {/* <button className={`btn-submit-update-stok ${customPrice != 0 && 'btn-disabled'}`} onClick={() => handleSubmit(product, 'grocery', amount, customPrice)} disabled={customPrice != 0}>Cabang</button> */}
            </div>
        </div>
    )
}

export default SellManagement;