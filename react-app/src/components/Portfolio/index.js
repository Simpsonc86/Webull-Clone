import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserTransactionsThunk } from "../../store/transaction";


import "./index.css"

const Portfolio = () => {

    const dispatch = useDispatch();
    // console.log(sessionUser)

    const transactions = Object.values(
        useSelector((state) => (state.transaction.transactions ? state.transaction.transactions : []))
    );


    let portfolio = {}

    for (let t of transactions) {
        if (!portfolio[t.stock.ticker_symbol])
            portfolio[t.stock.ticker_symbol] = { stock: t.stock, sharesOwned: t.shares_moved }

        else {
            if (t.transaction_type === "SELL") {
                let totalShares = portfolio[t.stock.ticker_symbol].sharesOwned - t.shares_moved

                if (totalShares === 0)
                    delete portfolio[t.stock.ticker_symbol]
                else
                    portfolio[t.stock.ticker_symbol] = { stock: t.stock, sharesOwned: totalShares }
            }
            else if (t.transaction_type === "BUY") {
                let totalShares = portfolio[t.stock.ticker_symbol].sharesOwned + t.shares_moved
                portfolio[t.stock.ticker_symbol] = { stock: t.stock, sharesOwned: totalShares }
            }
        }
    }

    let portfolioList = Object.values(portfolio)
    console.log(portfolioList)


    useEffect(() => {
        dispatch((getUserTransactionsThunk()));
    }, [dispatch]);
    return (
        <div>

            {portfolioList.map((stock) => (
                <div className="holding">
                    <div className="ticker">{stock.stock.ticker_symbol}</div>
                    <div className="company">{stock.stock.company_name}</div>
                    <div className="quantity">{stock.sharesOwned}</div>
                    <div className="mktValue">{(stock.sharesOwned * stock.stock.base_price).toFixed(2)}</div>
                    <div className="avgPrice">{stock.stock.base_price}</div>
                </div>

            ))}
        </div>
    )

}

export default Portfolio
