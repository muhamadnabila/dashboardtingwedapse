import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import NavigationProductManagement from '../../Components/navigationProductManagement'
import getIndoTime from '../../Helpers/getIndoTime'
import Search from '../../Components/Search'
import DatePicker from 'react-datepicker'
import moment from 'moment'

function Used({setIsPageActive}) {

    const [productList, setProductList] = useState([])
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

    useEffect(() =>{
        getData()
        setIsPageActive('used')
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
            <h3 className="page-title">PEMAKAIAN PRIBADI/BONUS HARIAN</h3>
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
                    <div className="flex1 table-list-product-td">Jumlah</div>
                    <div className="flex1 table-list-product-td">Action</div>
                </div>
                <div className="table-list-product-tbody">
                    {
                        productList.map((product, indexProduct) => {
                            return(
                                <React.Fragment key={product._id}>
                                    {
                                        product.isShow && <Product date={date} product={product} indexProduct={indexProduct} productList={productList} setProductList={setProductList}/>
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

function Product({product, indexProduct, setProductList, productList, date}) {

    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(false)
    
    function handleSubmit(dataProduct){
        if(loading) return;
        setLoading(true)
        axios.post(`/used`, {
            amount,
            productId: dataProduct._id,
            productName: dataProduct.name,
            sellPriceRetail: dataProduct.sellPriceRetail,
            modalPrice: dataProduct.modalPrice,
            created_at: getIndoTime(date)
        })
        .then(({data}) => {
            setLoading(false)
            toast.success('🦉 masok pak eko')
            let newProductList = [...productList]
            newProductList.map(product => {
                if(product._id === dataProduct._id){
                    product.amount -= data.amount
                }
            })
            setAmount(0)
            setProductList(newProductList)
        })
        .catch(err => {
            setLoading(false)
            toast.error('🐔 error pak eko')
        })
    }

    return (
        <div className={`table-list-product-tr ${indexProduct % 2 === 0 ? 'table-list-product-tr__white' : 'table-list-product-tr__black' }`}>
            <div className="flex1 table-list-product-td">{product.name}</div>
            <div className="flex1 table-list-product-td">{product.category}</div>
            <div className="flex1 table-list-product-td">{product.amount}</div>
            <div className="flex1 table-list-product-td">
                <input 
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount == 0 ? '' : amount}
                    placeholder="0"
                    type="number"
                    className="input-currency"
                />
            </div>
            <div className="flex1 table-list-product-td">
                <button style={{marginLeft: 0}} className={`btn-submit-update-stok`} onClick={() => handleSubmit(product)}>Submit</button>
            </div>
        </div>
    )
}

export default Used;