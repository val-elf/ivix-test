import React, { useCallback, useContext } from 'react';
import { IStockInfo } from '../../services/models';
import { StockGridContext } from '../stocks-grid/StocksGrid';

interface IAddtionaActionsProps {
    stockInfo: IStockInfo & { ordered: number }
}

export const AddtionaActions = (props: IAddtionaActionsProps) => {
    const { stockInfo } = props;
    const gridContext = useContext(StockGridContext);
    const handleClick = useCallback(() => {
        if (stockInfo.count > stockInfo.ordered) {
            stockInfo.ordered++;
            gridContext?.updateStockInfo(stockInfo);
        }
    }, [gridContext, props.stockInfo, stockInfo]);

    return <>
        <button className="btn btn-primary" disabled={stockInfo.count <= stockInfo.ordered} onClick={handleClick}>Buy</button>
    </>
}