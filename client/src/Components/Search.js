import { useState } from 'react'

function Search({dataList, setDataList, isTransaction, isOutCome = false}) {
    
    const [inputSearch, setInputSearch] = useState('')

    function handleSearch(e) {
        setInputSearch(e.target.value)
        if(e.target.value.length === 0) {
            setDataList(dataList.map(data => {
                return {...data, isShow: true }
            }))
        }else {
            setDataList(dataList.map(data => {
                if(isTransaction){
                    if(data.productId.name.toLowerCase().includes(e.target.value.toLowerCase())){
                        return {...data, isShow: true }
                    }
                }else if(isOutCome){
                    if(data.source.toLowerCase().includes(e.target.value.toLowerCase())){
                        return {...data, isShow: true }
                    }
                }else {
                    if(data.name.toLowerCase().includes(e.target.value.toLowerCase())){
                        return {...data, isShow: true }
                    }
                }
                return {...data, isShow: false }
            }))
        }
    }
    
    return (
        <input 
            onChange={handleSearch}
            value={inputSearch}
            placeholder="🧲 search"
            style={{padding: '3px 5px', borderRadius: '3px', outline:'none', border: 'none'}}
        />
    )
}

export default Search