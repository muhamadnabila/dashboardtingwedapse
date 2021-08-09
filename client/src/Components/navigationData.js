import { useEffect, useState } from "react";
import {
    useHistory,
    useRouteMatch
} from "react-router-dom";
import DatePicker from 'react-datepicker'
import moment from 'moment'

function NavigationData({startDate, setStartDate, endDate, setEndDate, triggerGetData, setTriggerGetData}) {
    
    const history = useHistory()
    let {path, url} = useRouteMatch()
    const [pageActive, setPageActive] = useState(null)
    const [showDatePicker, setShowDatePicker] = useState(false)

    function handleClickChangePage(page) {
        history.push(page)
        setPageActive(page)
        setTriggerGetData(true)
    }

    function onChangeDate( dates ){
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
        if(start && end){
            setTriggerGetData(true)
            setShowDatePicker(false)
        }
    }

    return(
        <>
            <div>
                <button onClick={() => handleClickChangePage(`${path}/transactionDaily`)} className={`add-product ${pageActive === `${path}/transactionDaily` && 'button-nav-active'}`}>💰 Penjualan</button>
                <button onClick={() => handleClickChangePage(`${path}/outCome`)} className={`add-product ${pageActive === `${path}/outCome` && 'button-nav-active'}`}>🤖 Pengeluaran</button>
                <button onClick={() => handleClickChangePage(`${path}/used`)} className={`add-product ${pageActive === `${path}/used` && 'button-nav-active'}`}>✍️ Terpakai/Bonus</button>
                <button onClick={() => handleClickChangePage(`${path}/asset`)} className={`add-product ${pageActive === `${path}/asset` && 'button-nav-active'}`}>💎 Asset</button>
                <div style={{display: 'inline-block'}}>
                    <div className="button--date" onClick={() => setShowDatePicker(!showDatePicker)}>
                        {`${moment(startDate).format('L')} - ${moment(endDate).format('L')}`}
                    </div>
                    {
                        showDatePicker && (
                            <div style={{position: 'absolute'}}>
                                <DatePicker
                                    onChange={onChangeDate}
                                    selected={startDate}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    inline
                                />
                            </div>
                        )
                    }
                </div>
            </div> 
            <br/>
        </>
    )
}

export default NavigationData;