import './style.css';
import './custom.css';
import {useState, useEffect} from 'react'
import AddProduct from './Views/AddProduct';
import ProductManagement from './Views/ProductManagement';
import UpdateStock from './Views/UpdateStock';
import SellManagement from './Views/SellManagement';
import OutCome from './Views/OutCome';
import Used from './Views/Used';
import Data from './Views/Data';
import Header from './Components/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
  } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationProductManagement from './Components/navigationProductManagement'
import "react-datepicker/dist/react-datepicker.css";

function App() {

  const [isPageActive, setIsPageActive] = useState('/')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [triggerGetData, setTriggerGetData] = useState(true)

  return (
    <div>
      <Router>
        <Header/>
        <div className="container">
          {isPageActive && <NavigationProductManagement isPageActive={isPageActive} setIsPageActive={setIsPageActive}/>}
          <Switch>
            <Route path="/addOutCome">
              <OutCome setIsPageActive={setIsPageActive}/>
            </Route>
            <Route path="/data">
              <Data triggerGetData={triggerGetData} setTriggerGetData={setTriggerGetData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} isPageActive={isPageActive} setIsPageActive={setIsPageActive} />
            </Route>
            <Route path="/penjualan">
              <SellManagement setIsPageActive={setIsPageActive}/>
            </Route>
            <Route path="/updateStock">
              <UpdateStock setIsPageActive={setIsPageActive}/>
            </Route>
            <Route path="/addProduct">
              <AddProduct setIsPageActive={setIsPageActive}/>
            </Route>
            <Route path="/used">
              <Used setIsPageActive={setIsPageActive}/>
            </Route>
            <Route path="/">
              <ProductManagement setIsPageActive={setIsPageActive}/>
            </Route>
          </Switch>
        </div>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
