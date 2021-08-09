import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import moment from 'moment'
import convertRupiah from '../../Helpers/convertRupiah'
import getIndoTime from '../../Helpers/getIndoTime'
import Search from '../../Components/Search'

function TransactionDaily({triggerGetData, setTriggerGetData, startDate, endDate}) {

    const [transactionList, setTransactionList] = useState([])
    const [totalBruto, setTotalBruto] = useState(0)
    const [totalProfit, setTotalProfit] = useState(0)
    const [totalTransactionJambu, setTotalTransactionJambu] = useState(0)
    const [totalOutCome, setTotalOutCome] = useState(0)
    const [date, setDate] = useState(new Date())

    useEffect(() =>{
        if(triggerGetData){
            getTransaction()
            getOutcome()
        }
    },[triggerGetData])
    
    function getTransaction(){
        axios.get(`/transaction?startDate=${getIndoTime(startDate)}&endDate=${getIndoTime(endDate)}`)
        .then(({data}) => {
            setTransactionList(data)
            let totalBruto = 0
            let totalProfit = 0
            let totalTransactionJambu = 0
            data.map(transaction => {
                if(transaction.productId){
                    totalBruto += (transaction.price * transaction.amount)
                    totalProfit += (transaction.price * transaction.amount)-(transaction.productId.modalPrice * transaction.amount)
                }
                if(transaction.isSoldFrom === 'grocery'){
                    totalTransactionJambu += transaction.price * transaction.amount
                }
            })
            setTotalTransactionJambu(totalTransactionJambu) 
            setTotalBruto(totalBruto)
            setTotalProfit(totalProfit)
            setTriggerGetData(false)
        })
        .catch(err => {
            toast.error('🐔 error pak eko')
        })
    }
    
    function getOutcome() {
        axios.get(`/outCome?startDate=${getIndoTime(startDate)}&endDate=${getIndoTime(endDate)}`)
        .then(({data}) => {
            let totalOutCome = 0
            data.map(outCome => {
                totalOutCome += outCome.amount
            })
            setTotalOutCome(totalOutCome)
        })
        .catch(err => {
            toast.error('🐔 error pak eko')
        })
    }
  

    return(
        <div>
            <h2 className="color-white">Total Penghasilan Kotor {convertRupiah(totalBruto)}</h2>
            <h2 className="color-white">Total Penghasilan Bersih {convertRupiah(totalProfit)}</h2>
            <h2 className="color-white">Total Uang Belanja Dapse {convertRupiah(totalBruto-totalProfit)}</h2>
            <h2 className="color-white">Total Pengeluaran Dapse {convertRupiah(totalOutCome)}</h2>
            <h2 className="color-white">Total Sisa Uang Belanja Dapse {convertRupiah((totalBruto-totalProfit) - totalOutCome)}</h2>
            <h2 className="color-white">Total Yang Harus Dibayar Jambu {convertRupiah(totalTransactionJambu)}</h2>
            <br/>
            <Search dataList={transactionList} setDataList={setTransactionList} isTransaction={true}/>
            <br/>
            <br/>
            <div className="table-list-product">
                <div className="table-list-product-thead">
                    <div className="flex1 table-list-product-td">Tanggal</div>
                    <div className="flex1 table-list-product-td">Nama Produk</div>
                    <div className="flex1 table-list-product-td">Sumber</div>
                    <div className="flex1 table-list-product-td">Terjual</div>
                    <div className="flex1 table-list-product-td">Harga Modal</div>
                    <div className="flex1 table-list-product-td">Harga Jual</div>
                    <div className="flex1 table-list-product-td">Total Harga</div>
                    <div className="flex1 table-list-product-td">Total Profit</div>
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
        axios.delete(`/transaction/${transaction._id}`)
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
            <div className="flex1 table-list-product-td">{transaction.productId.name}</div>
            <div className="flex1 table-list-product-td">{transaction.isSoldFrom}</div>
            <div className="flex1 table-list-product-td">{transaction.amount}</div>
            <div className="flex1 table-list-product-td">{convertRupiah(transaction.modalPrice)}</div>
            <div className="flex1 table-list-product-td">{convertRupiah(transaction.price)}</div>
            <div className="flex1 table-list-product-td">{convertRupiah(transaction.price * transaction.amount)}</div>
            <div className="flex1 table-list-product-td">{convertRupiah((transaction.price * transaction.amount)-(transaction.modalPrice * transaction.amount))}</div>
            <div className="flex1 table-list-product-td">
                <button className="btn-delete-product" onClick={handleDeleteTransaction}>Delete</button>
            </div>
        </div>
    )
}

export default TransactionDaily;