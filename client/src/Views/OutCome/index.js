import {useState, useEffect, useLayoutEffect} from 'react'
import Select from 'react-select'
import axios from 'axios'
import { toast } from 'react-toastify';
import getIndoTime from '../../Helpers/getIndoTime'

function OutCome({setIsPageActive}){
    
    const [source, setSource] = useState('')
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setIsPageActive(false)
    },[])

    useLayoutEffect(() => {
        return () => {
            setIsPageActive(true)
        } 
    },[])

    function handleSubmit() {
        if(loading) return;
        setLoading(true)
        axios.post('/outCome', {
            source,
            amount,
            description,
            created_at: getIndoTime(new Date())
        })
        .then(data => {
            setLoading(false)
            toast.success('🦉 masok pak eko')
            setSource('')
            setAmount(0)
            setDescription('')
        })
        .catch(err => {
            setLoading(false)
            toast.error('🐔 error pak eko')
        })
    }
    
    return(
        <div className="section-out-come">
            <h3 className="page-title">PENGELUARAN HARIAN</h3>
            <div className="wrapper-add-product">
                <div className="wrapper-label">
                    <label>Sumber Pengeluaran</label>
                    <input 
                        autoFocus
                        onChange={(e) => setSource(e.target.value)}
                        value={source}
                        />
                </div>
                <div className="wrapper-label">
                    <label>Jumlah Pengeluaran (Rupiah)</label>
                    <input
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        />
                </div>
                <div className="wrapper-label">
                    <label>Keterangan (opsional)</label>
                    <input
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        />
                </div>
                <button onClick={handleSubmit}>SUBMIT</button>
            </div>
      </div>
    )
}

export default OutCome;