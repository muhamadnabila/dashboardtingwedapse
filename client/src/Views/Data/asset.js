import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import moment from 'moment'
import convertRupiah from '../../Helpers/convertRupiah'
import Search from '../../Components/Search'

function Asset() {

    const [productList, setProductList] = useState([])
    const [totalAssetProductToIDR, setTotalAssetProductToIDR] = useState(0)
    const [cashAsset, setCashAsset] = useState(0)
    const [cashAssetUsed, setCashAssetUsed] = useState(0)
    const [cashAssetData, setCashAssetData] = useState(null)
    const [inputEditAsset, setInputEditAsset] = useState(0)

    useEffect(() =>{
        getCashAsset()
        axios.get('/product')
        .then(({data}) => {
            setProductList(data)
            let totalAssetProductToIDR = 0
            let totalAssetProductUsedToIDR = 0
            data.map(product => {
                totalAssetProductToIDR += (product.amount * product.modalPrice)
                totalAssetProductUsedToIDR += (product.totalUsed * product.modalPrice)
            })
            setTotalAssetProductToIDR(totalAssetProductToIDR)
            setCashAssetUsed(totalAssetProductUsedToIDR)
        })
        .catch(err => {
            toast.error('🐔 error pak eko')
        })
    },[])
    
    function getCashAsset() {
        axios.get('/asset')
        .then(({data}) => {
            if(data[0]){
                setCashAsset(data[0].cashAsset)
                setCashAssetData(data[0])
            }
        })
        .catch(err => {
            toast.error('🐔 error pak eko')
        })
    }

    function handleEditAsset(){
        if(cashAssetData){
            axios.put(`/asset/${cashAssetData._id}`, {
                cashAsset: inputEditAsset
            })
            .then(({data}) => {
              toast.success('mantap gan')
              setInputEditAsset(0)
              getCashAsset()
            })
            .catch(err => {
                toast.error('🐔 error pak eko')
            })
        }else {
            axios.post(`/asset`, {
                cashAsset: inputEditAsset
            })
            .then(({data}) => {
                setInputEditAsset(0)
                getCashAsset()
                toast.success('mantap gan')
            })
            .catch(err => {
                toast.error('🐔 error pak eko')
            })

        }

    }

    function handleAddAsset() {
        if(cashAssetData){
            axios.put(`/asset/${cashAssetData._id}`, {
                cashAsset: inputEditAsset + cashAssetData.cashAsset
            })
            .then(({data}) => {
              toast.success('mantap gan')
              setInputEditAsset(0)
              getCashAsset()
            })
            .catch(err => {
                toast.error('🐔 error pak eko')
            })
        }else {
            axios.post(`/asset`, {
                cashAsset: inputEditAsset
            })
            .then(({data}) => {
                setInputEditAsset(0)
                getCashAsset()
                toast.success('mantap gan')
            })
            .catch(err => {
                toast.error('🐔 error pak eko')
            })

        }
    }

    return(
        <div>
            <div>
                <input 
                    placeholder="input asset cash" 
                    type="number" 
                    min={0}
                    value={inputEditAsset == 0 ? '' : inputEditAsset}
                    onChange={(e) => setInputEditAsset(Number(e.target.value))}
                />
                {
                    cashAssetData ? 
                        <>
                            <button style={{marginLeft: '10px'}} className='btn-add-asset' onClick={handleAddAsset}>ADD</button>
                            <button style={{marginLeft: '10px'}} className='btn-edit-product' onClick={handleEditAsset}>EDIT</button>
                        </>
                    :
                        <button style={{marginLeft: '10px'}} className='btn-edit-product' onClick={handleEditAsset}>SUBMIT</button>

                }
            </div>
            <h2 className="color-white">Asset (Cash/Saldo) {convertRupiah(cashAsset)}</h2>
            <h2 className="color-white">Asset (Barang) {convertRupiah(totalAssetProductToIDR)}</h2>
            <h2 className="color-white" style={{backgroundColor: '#3300ff'}}>Total Asset {convertRupiah(totalAssetProductToIDR + cashAsset)}</h2>
            <h2 className="color-white" style={{backgroundColor: '#ff00b1'}}>Total Asset Terpakai {convertRupiah(cashAssetUsed)}</h2>
            <h2 className="color-white" style={{backgroundColor: 'rgb(121 121 121)'}}>Total Asset Seharusnya {convertRupiah(cashAssetUsed + (totalAssetProductToIDR + cashAsset))}</h2>
            <br/>
            <Search dataList={productList} setDataList={setProductList}/>
            <br/>
            <br/>
            <div className="table-list-product">
                <div className="table-list-product-thead">
                    <div className="flex1 table-list-product-td">Nama Produk</div>
                    <div className="flex1 table-list-product-td">Sisa Stok</div>
                    <div className="flex1 table-list-product-td">Harga Modal</div>
                    <div className="flex1 table-list-product-td">Terjual</div>
                    <div className="flex1 table-list-product-td">Terpakai/Bonus</div>
                    <div className="flex1 table-list-product-td">Total Modal (Rupiah)</div>
                </div>
                <div className="table-list-product-tbody">
                    {
                        productList.map((product, indexProduct) => {
                            return (
                                <React.Fragment key={product._id}>
                                    {
                                        product.isShow && <Product product={product} indexProduct={indexProduct}/>
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

function Product({product, indexProduct}) {

    return(
        <div className={`table-list-product-tr ${indexProduct % 2 === 0 ? 'table-list-product-tr__white' : 'table-list-product-tr__black' }`}>
            <div className="flex1 table-list-product-td">{product.name}</div>
            <div className="flex1 table-list-product-td">{product.amount}</div>
            <div className="flex1 table-list-product-td">{convertRupiah(product.modalPrice)}</div>
            <div className="flex1 table-list-product-td">{product.totalSold}</div>
            <div className="flex1 table-list-product-td">{product.totalUsed}</div>
            <div className="flex1 table-list-product-td">{convertRupiah(product.modalPrice * product.amount)}</div>
        </div>
    )
}

export default Asset;