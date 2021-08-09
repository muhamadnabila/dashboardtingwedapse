import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import moment from 'moment'
import convertRupiah from '../../Helpers/convertRupiah'
import getIndoTime from '../../Helpers/getIndoTime'
import Search from '../../Components/Search'

function OutCome({triggerGetData, setTriggerGetData, startDate, endDate}) {

    const [transactionList, setTransactionList] = useState([])
    const [outCome, setTotalOutCome] = useState(0)
    const [totalUsedCount, setTotalUsedCount] = useState(0)
    const [date, setDate] = useState(new Date())

    useEffect(() =>{
        if(triggerGetData){
            getTransaction()
        }
    },[triggerGetData])
    
    function getTransaction() {
        axios.get(`/outCome?startDate=${getIndoTime(startDate)}&endDate=${getIndoTime(endDate)}`)
        .then(({data}) => {
            setTransactionList(data)
            let outCome = 0
            data.map(transaction => {
                outCome += transaction.amount
            })
            setTotalOutCome(outCome)
            setTriggerGetData(false)
        })
        .catch(err => {
            toast.error('🐔 error pak eko')
        })

    }

    return(
        <div>
            <h2 className="color-white">Total Pengeluaran {convertRupiah(outCome)}</h2>
            <br/>
            <Search dataList={transactionList} setDataList={setTransactionList} isOutCome={true}/>
            <br/>
            <br/>
            <div className="table-list-product">
                <div className="table-list-product-thead">
                    <div className="flex1 table-list-product-td">Tanggal</div>
                    <div className="flex1 table-list-product-td">Sumber</div>
                    <div className="flex1 table-list-product-td">Total</div>
                    <div className="flex1 table-list-product-td">Keterangan</div>
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
        axios.delete(`/outCome/${transaction._id}`)
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
            <div className="flex1 table-list-product-td">{transaction.source}</div>
            <div className="flex1 table-list-product-td">{convertRupiah(transaction.amount)}</div>
            <div className="flex1 table-list-product-td">{transaction.description}</div>
            <div className="flex1 table-list-product-td">
                <button className="btn-delete-product" onClick={handleDeleteTransaction}>Delete</button>
            </div>
        </div>
    )
}

export default OutCome;