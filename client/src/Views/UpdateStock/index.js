import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import NavigationProductManagement from '../../Components/navigationProductManagement'
import getIndoTime from '../../Helpers/getIndoTime'
import Search from '../../Components/Search'

function UpdateStock({setIsPageActive}) {
    
    const [productList, setProductList] = useState([])
    

    useEffect(() =>{
        axios.get('/product')
        .then(({data}) => {
            setProductList(data)
        })
        .catch(err => {
            toast.error('🐔 error pak eko')
        })
        setIsPageActive('updateStock')
    },[])

    
    return(
        <div className="section-list-product">
            <h3 className="page-title">UPDATE STOK</h3>
            <Search dataList={productList} setDataList={setProductList}/>
            <br/>
            <br/>
            <div className="table-list-product">
                <div className="table-list-product-thead">
                    <div className="flex1 table-list-product-td">Nama Produk</div>
                    <div className="flex1 table-list-product-td">Kategori</div>
                    <div className="flex1 table-list-product-td">Jumlah Stok</div>
                    <div className="flex1 table-list-product-td">Harga Normal</div>
                    <div className="flex1 table-list-product-td">Harga Baru <span style={{fontSize: '12px'}}>(apabia beda)</span></div>
                    <div className="flex1 table-list-product-td">Update Stok</div>
                </div>
                <div className="table-list-product-tbody">
                    {
                        productList.map((product, indexProduct) => {
                            return (
                                <React.Fragment key={product._id}>
                                    {
                                        product.isShow &&  <Product productList={productList} setProductList={setProductList} product={product} indexProduct={indexProduct}/>
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

function Product({productList, setProductList, product, indexProduct}) {

    const [amount, setAmount] = useState(0)
    const [modalPrice, setModalPrice] = useState(0)
    const [loading, setLoading] = useState(false)

    function handleSubmit(dataProduct){
        if(loading) return;
        setLoading(true)
        axios.put(`/product/stock/${dataProduct._id}`, {
            amount,
            modalPrice,
            updated_at: getIndoTime(new Date())
        })
        .then(({data}) => {
            setLoading(false)
            let newProductList = [...productList]
            newProductList.map(product => {
                if(product._id === dataProduct._id){
                    product.amount = data.amount
                    product.modalPrice = data.modalPrice
                }
            })
            setAmount(0)
            setModalPrice(0)
            setProductList(newProductList)
            toast(`🦄 Update Stock ${dataProduct.name}: ${amount}`, {
                position: "top-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            toast.success('🦉 masok pak eko')
        })
        .catch(err => {
            setLoading(false)
            toast.error('🐔 error pak eko')
        })
    }

    return(
        <div className={`table-list-product-tr ${indexProduct % 2 === 0 ? 'table-list-product-tr__white' : 'table-list-product-tr__black' }`}>
            <div className="flex1 table-list-product-td">{product.name}</div>
            <div className="flex1 table-list-product-td">{product.category}</div>
            <div className="flex1 table-list-product-td">{product.amount}</div>
            <div className="flex1 table-list-product-td">{product.modalPrice}</div>
            <div className="flex1 table-list-product-td">
                <input 
                    onChange={(e) =>setModalPrice(e.target.value)}
                    placeholder="0"
                    type="number"
                    className="input-currency"
                    min={0}
                    value={modalPrice == 0 ? '' : modalPrice}
                />
            </div>
            <div className="flex1 table-list-product-td">
                <input 
                    onChange={(e) =>setAmount(e.target.value)}
                    min={0}
                    placeholder="0"
                    type="number"
                    className="input-number"
                    value={amount == 0 ? '' : amount}
                />
                <button className="btn-submit-update-stok" onClick={() => handleSubmit(product)}>Submit</button>
            </div>
        </div>
    )
}

export default UpdateStock;