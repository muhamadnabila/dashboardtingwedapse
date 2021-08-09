import {useEffect} from 'react'
import {
    useHistory,
    useRouteMatch
} from "react-router-dom";

function NavigationProductManagement({isPageActive, setIsPageActive}) {
    
    const history = useHistory()
    let {path, url} = useRouteMatch()

    function handleClickChangePage(page) {
        setIsPageActive(page)
        history.push(page)
    }

    return(
        <>
            <div>
                <button onClick={() => handleClickChangePage("/")} className={`${isPageActive === '/' && 'button-nav-active'} add-product`}>⚙️ Kelola Produk</button>
                <button onClick={() => handleClickChangePage("addProduct")} className={`${isPageActive === `addProduct` && 'button-nav-active'} add-product`}>🤖 Tambah Produk</button>
                <button onClick={() => handleClickChangePage("updateStock")} className={`${isPageActive === `updateStock` && 'button-nav-active'} add-product`}>✍️ Update Stock</button>
                <button onClick={() => handleClickChangePage("penjualan")} className={`${isPageActive === `penjualan` && 'button-nav-active'} add-product`}>💰 Input Penjualan</button>
                <button onClick={() => handleClickChangePage("used")} className={`${isPageActive === `used` && 'button-nav-active'} add-product`}>👌 Pemakaian/Bonus</button>
            </div> 
            <br/>
        </>
    )
}

export default NavigationProductManagement;