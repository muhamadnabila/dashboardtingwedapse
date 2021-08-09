import {
    useHistory
} from "react-router-dom";

function Header(){

    const history = useHistory()

    function handleClickChangePage(page) {
        history.push(page)
    }

    return(
        <div className="header">
          <button onClick={() => handleClickChangePage("/")}>Kelola Produk Tingwe</button>
          <button onClick={() => handleClickChangePage("/addOutCome")}>Pengeluaran Tingwe (harian)</button>
          <button onClick={() => handleClickChangePage("/data")}>Data 👀</button>
        </div>
    )
}

export default Header