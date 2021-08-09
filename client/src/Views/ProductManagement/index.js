import React, { useEffect, useState } from 'react'
import {
    useHistory,
} from "react-router-dom";
import axios from 'axios'
import {toast} from 'react-toastify'
import convertRupiah from '../../Helpers/convertRupiah'
import NavigationProductManagement from '../../Components/navigationProductManagement'
import Search from '../../Components/Search'

function ProductManagement({setIsPageActive}) {
    
    const [productList, setProductList] = useState([])
    const [sort, setSort] = useState({key: 'name', value: 'asc'})

    useEffect(() =>{
        setIsPageActive('/')
        axios.get('/product')
        .then(({data}) => {
            setProductList(data)
        })
        .catch(err => {
            toast.error('🐔 error pak eko')
        })
    },[])

    function handleSort(key) {
        if(sort.value === 'asc'){
            setProductList(productList.sort((a,b) => {
                return (a[key] < b[key] ? 1 : ((b[key] < a[key]) ? -1 : 0))
            }))
            setSort({key, value: 'desc'})
        }else {
            setProductList(productList.sort((a,b) => {
                return (a[key] > b[key] ? 1 : ((b[key] > a[key]) ? -1 : 0))
            }))
            setSort({key, value: 'asc'})
        }
    }


    return(
        <div className="section-list-product">
            <h3 className="page-title">KELOLA PRODUK</h3>
            <Search dataList={productList} setDataList={setProductList}/>
            <br/>
            <br/>
            <div className="table-list-product">
                <div className="table-list-product-thead">
                    <div className="flex1 table-list-product-td">Nama Produk <i onClick={()=> handleSort('name')}>↕️</i></div>
                    <div className="flex1 table-list-product-td">Kategori <i onClick={()=> handleSort('category')}>↕️</i></div>
                    <div className="flex1 table-list-product-td">Sisa Stok <i onClick={()=> handleSort('amount')}>↕️</i></div>
                    <div className="flex1 table-list-product-td">Terjual <i onClick={()=> handleSort('totalSold')}>↕️</i></div>
                    <div className="flex1 table-list-product-td">Terpakai/Bonus <i onClick={()=> handleSort('totalUsed')}>↕️</i></div>
                    <div className="flex1 table-list-product-td">Harga Modal (pcs) </div>
                    <div className="flex1 table-list-product-td">Harga Retail (pcs) </div>
                    {/* close for tingwe jambu <div className="flex1 table-list-product-td">Harga Cabang (pcs) </div> */}
                    <div className="flex1 table-list-product-td">Action</div>
                </div>
                <div className="table-list-product-tbody">
                    {
                        productList.map((product, indexProduct) => {
                            return (
                                <React.Fragment key={product._id}>
                                {
                                    product.isShow && <Product product={product} indexProduct={indexProduct} productList={productList} setProductList={setProductList}/>
                                }
                                </ React.Fragment>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

function Product({product, indexProduct, productList, setProductList}) {

    const [isEditProduct, setIsEditProduct] = useState(false)
    const [dataProduct, setDataProduct] = useState(product)

    function handleSubmitEditProduct() {
        axios.put(`/product/${dataProduct._id}`, dataProduct)
        .then(data => {
            setProductList(productList.map(product => {
                if(product._id === dataProduct._id){
                    return dataProduct
                }else {
                    return product
                }
            }))
            setIsEditProduct(false)
            toast(`🦄 Edit Produk: ${dataProduct.name}`, {
                position: "bottom-right",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .catch(err => {
            toast.error('🐔 error pak eko')
        })
    }

    function handleCancelEditProduct() {
        setIsEditProduct(false)
        setDataProduct(product)
    }
    
    return (
        <div className={`table-list-product-tr ${indexProduct % 2 === 0 ? 'table-list-product-tr__white' : 'table-list-product-tr__black' }`}>
            {
                isEditProduct ?
                    <>
                        <div className="flex1 table-list-product-td">
                            <input
                                placeholder={dataProduct.name}
                                value={dataProduct.name}
                                onChange={(e) => setDataProduct({...dataProduct, name: e.target.value})}
                            />
                        </div>
                        <div className="flex1 table-list-product-td">
                            <input
                                placeholder={dataProduct.category}
                                value={dataProduct.category}
                                onChange={(e) => setDataProduct({...dataProduct, category: e.target.value})}
                            />
                        </div>
                        <div className="flex1 table-list-product-td">
                            <input
                                placeholder={dataProduct.amount}
                                value={dataProduct.amount}
                                onChange={(e) => setDataProduct({...dataProduct, amount: e.target.value})}
                            />
                        </div>
                        <div className="flex1 table-list-product-td">
                            <input
                                placeholder={dataProduct.totalSold}
                                value={dataProduct.totalSold}
                                onChange={(e) => setDataProduct({...dataProduct, totalSold: e.target.value})}
                            />
                        </div>
                        <div className="flex1 table-list-product-td">
                            <input
                                placeholder={dataProduct.totalUsed}
                                value={dataProduct.totalUsed}
                                onChange={(e) => setDataProduct({...dataProduct, totalUsed: e.target.value})}
                            />
                        </div>
                        <div className="flex1 table-list-product-td">
                            <input
                                placeholder={dataProduct.modalPrice}
                                value={dataProduct.modalPrice}
                                onChange={(e) => setDataProduct({...dataProduct, modalPrice: e.target.value})}
                            />
                        </div>
                        <div className="flex1 table-list-product-td">
                            <input
                                placeholder={dataProduct.sellPriceRetail}
                                value={dataProduct.sellPriceRetail}
                                onChange={(e) => setDataProduct({...dataProduct, sellPriceRetail: e.target.value})}
                            />
                        </div>
                        {/* close for tingwe jambu
                        <div className="flex1 table-list-product-td">
                            <input
                                placeholder={dataProduct.sellPriceGrocery}
                                value={dataProduct.sellPriceGrocery}
                                onChange={(e) => setDataProduct({...dataProduct, sellPriceGrocery: e.target.value})}
                            />
                        </div> */}
                        <div className="flex1 table-list-product-td">
                            <button className="btn-edit-product" onClick={handleSubmitEditProduct}>Submit</button>
                            <button className="btn-delete-product" onClick={handleCancelEditProduct}>x</button>
                        </div>
                    </> 
                :
                <>
                    <div className="flex1 table-list-product-td">{dataProduct.name}</div>
                    <div className="flex1 table-list-product-td">{dataProduct.category}</div>
                    <div className="flex1 table-list-product-td">{dataProduct.amount}</div>
                    <div className="flex1 table-list-product-td">{dataProduct.totalSold}</div>
                    <div className="flex1 table-list-product-td">{dataProduct.totalUsed}</div>
                    <div className="flex1 table-list-product-td">{convertRupiah(dataProduct.modalPrice)}</div>
                    <div className="flex1 table-list-product-td">{convertRupiah(dataProduct.sellPriceRetail)}</div>
                    {/* close for tingwe jambu <div className="flex1 table-list-product-td">{convertRupiah(dataProduct.sellPriceGrocery)}</div> */}
                    <div className="flex1 table-list-product-td">
                        <button className="btn-edit-product" onClick={() => setIsEditProduct(true)}>Edit</button>
                    </div>
                </>
            }
        </div>
    )

}
export default ProductManagement;