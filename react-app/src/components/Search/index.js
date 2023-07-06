import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStocksThunk } from "../../store/stocks";
import { addStockToWatchlistThunk } from "../../store/watchlist";

import { NavLink } from "react-router-dom";
import "./index.css"

export default function Search({watchlistId}) {
    const dispatch = useDispatch()
    const stocks = useSelector((state) => (state.stocks.stocks ? Object.values(state.stocks.stocks) : []));
    // console.log("Type of stocks is: ",typeof stocks);
    // console.log("These are the stocks from the store--->", stocks);
    const [searchList, setSearchList] = useState([])

    useEffect(() => {
        dispatch(getAllStocksThunk());
    }, [dispatch,]);

    const filterSearch = (e) => {
        e.preventDefault()
        const query = e.target.value

        // console.log("This is the value of query",query);
        const newList = stocks.filter((stock) => stock.company_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        // console.log("this is the filtered list", newList);

        if (!query.length) {
            setSearchList([]);
        } else {
            setSearchList(newList)
        }

    }

    const navigateToStock = (e) => {
        setSearchList([])
        e.target.value = ''
    }

    // console.log("USE STATE STOCKS",searchList);
    console.log(watchlistId)

    const handleAddStock = (stockId, stockName) => (e) =>  {
        e.preventDefault()
        dispatch(addStockToWatchlistThunk(stockId,watchlistId))

        console.log(stockId, stockName)
        setSearchList([])

    }

    return (
        <div className='search-filter'>
            <input id="stockItem" className='search-field' onChange={filterSearch} onClick={handleAddStock} placeholder='Search for a Company'></input>
            <div className="search-list-stock">
                {searchList.map((stock, index) => {

                    return (<div  key={stock.id} value={stock.id} onClick={handleAddStock(stock.id, stock.company_name)}>{`${stock.company_name} (${stock.ticker_symbol})`}</div>)
                    //<OpenModalButton className="search" buttonText={stock.company_name } key={index} modalComponent={<StockModal/>} isLink={true} to={`/stocks/${stock.id - 1}`}></OpenModalButton>
                })}
            </div>
        </div>
    )
}
