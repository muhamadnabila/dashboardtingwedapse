import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import moment from 'moment'
import convertRupiah from '../../Helpers/convertRupiah'
import getIndoTime from '../../Helpers/getIndoTime'
import Search from '../../Components/Search'

function Used({triggerGetData, setTriggerGetData, startDate, endDate}) {

    const [transactionList, setTransactionList] = useState([])
    const [totalUsedIDR, setTotalUsedIDR] = useState(0)
    const [totalUsedCount, setTotalUsedCount] = useState(0)
    const [date, setDate] = useState(new Date())
    
    useEffect(() =>{
        if(triggerGetData){
            getTransaction()
        }
    },[triggerGetData])
    
    function getTransaction(){
        axios.get(`/used?startDate=${getIndoTime(startDate)}&endDate=${getIndoTime(endDate)}`)
        .then(({data}) => {
            setTransactionList(data)
            let totalUsedIDR = 0
            let totalUsedCount = 0
            data.map(transaction => {
                totalUsedIDR += (transaction.modalPrice * transaction.amount)
                totalUsedCount += transaction.amount
            })
            setTotalUsedIDR(totalUsedIDR)
            setTotalUsedCount(totalUsedCount)
            setTriggerGetData(false)
        })
        .catch(err => {
            toast.error('🐔 error pak eko')
        })
    }

    return(
        <div>
            <h2 className="color-white">Total Terpakai/Bonus {convertRupiah(totalUsedIDR)}</h2>
            <h2 className="color-white">Jumlah Terpakai/Bonus Sebanyak {totalUsedCount}</h2>
            <br/>
            <Search dataList={transactionList} setDataList={setTransactionList} isTransaction={true}/>
            <br/>
            <br/>
            <div className="table-list-product">
                <div className="table-list-product-thead">
                    <div className="flex1 table-list-product-td">Tanggal</div>
                    <div className="flex1 table-list-product-td">Nama Produk</div>
                    <div className="flex1 table-list-product-td">Terpakai</div>
                    <div className="flex1 table-list-product-td">Harga Modal</div>
                    <div className="flex1 table-list-product-td">Harga Jual</div>
                    <div className="flex1 table-list-product-td">Total Harga</div>
                    <div className="flex1 table-list-product-td">Action</div>
                </div>
                <div className="table-list-product-tbody">
                    {
                        transactionList.map((transaction, indexTransaction) => {
                            return (
                                <React.Fragment key={transaction._id}>
                                    {
                                        transaction.isShow && <Product getTransaction={getTransaction} transactionList={transactionList} setTransactionList={setTransactionList} transaction={transaction} indexTransaction={indexTransaction}/>
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

function Product({transactionList, setTransactionList, transaction, indexTransaction, getTransaction}) {

    function handleDeleteTransaction(){
        axios.delete(`/used/${transaction._id}`)
        .then(data => {
            getTransaction()
            toast.success('🦉 masok pak eko')
        })
        .catch(err => {
            toast.error('🐔 error pak eko')
        })
    } 
    return(
        <div className={`table-list-product-tr ${indexTransaction % 2 === 0 ? 'table-list-product-tr__white' : 'table-list-product-tr__black' }`}>
            <div className="flex1 table-list-product-td">{moment(transaction.created_at).format("ddd,MM Do YY")}</div>
            <div className="flex1 table-list-product-td">{transaction.productName}</div>
            <div className="flex1 table-list-product-td">{transaction.amount}</div>
            <div className="flex1 table-list-product-td">{convertRupiah(transaction.modalPrice)}</div>
            <div className="flex1 table-list-product-td">{convertRupiah(transaction.sellPriceRetail)}</div>
            <div className="flex1 table-list-product-td">{convertRupiah(transaction.modalPrice * transaction.amount)}</div>
            <div className="flex1 table-list-product-td">
                <button className="btn-delete-product" onClick={handleDeleteTransaction}>Delete</button>
            </div>
        </div>
    )
}

export default Used;