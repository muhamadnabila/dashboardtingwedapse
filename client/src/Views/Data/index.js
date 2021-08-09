import {useEffect, useLayoutEffect} from 'react'
import axios from 'axios'
import NavigationData from '../../Components/navigationData'
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import TransactionDaily from './transactionDaily'
import OutCome from './outCome'
import Used from './used'
import Asset from './asset'

function Data({isPageActive, setIsPageActive, startDate, setStartDate, endDate, setEndDate, triggerGetData, setTriggerGetData}){ 

    let {path, url} = useRouteMatch()
    useEffect(() =>{
        setIsPageActive(false)
    },[])
    
    useLayoutEffect(() => {
        return () => {
            setIsPageActive(true)
        } 
    },[])

    return(
        <div className="section-data">
            <NavigationData triggerGetData={triggerGetData} setTriggerGetData={setTriggerGetData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
            <Switch>
                <Route exact path={`${path}/transactionDaily`}>
                    <TransactionDaily startDate={startDate} endDate={endDate} triggerGetData={triggerGetData} setTriggerGetData={setTriggerGetData} />
                </Route>
                <Route path={`${path}/outCome`}>
                    <OutCome startDate={startDate} endDate={endDate} triggerGetData={triggerGetData} setTriggerGetData={setTriggerGetData}/>
                </Route>
                <Route path={`${path}/used`}>
                    <Used startDate={startDate} endDate={endDate} triggerGetData={triggerGetData} setTriggerGetData={setTriggerGetData}/>
                </Route>
                <Route path={`${path}/asset`}>
                    <Asset />
                </Route>
            </Switch>
        </div>
    )
}

export default Data