import React, { useCallback, useContext, useEffect } from 'react';
import './TableHeader.css';
import { StockGridContext } from '../../stocks-grid/StocksGrid';
import { AppContext } from '../../../App';

export const TableHeader = () => {
    const gridContext = useContext(StockGridContext)!;
    const appContext = useContext(AppContext)!;
    const [total, setTotal] = React.useState<number>(0);
    const [startIndex, setStartIndex] = React.useState<number>(0);
    const [endIndex, setEndIndex] = React.useState<number>(10);

    useEffect(() => {
        let { total, pageIndex, pageSize } = gridContext?.pageInfo ?? { total: 0, pageIndex: 0, pageSize: 10 };
        if (total === undefined) total = 0;
        if (pageIndex === undefined) pageIndex = 0;
        if (pageSize === undefined) pageSize = 10;

        let startIndex = pageIndex * pageSize + 1;
        if (total === 0) startIndex = 0;
        let endIndex = (pageIndex + 1 ) * pageSize;
        if (endIndex > (total ?? 0)) endIndex = total;
        setTotal(total);
        setStartIndex(startIndex);
        setEndIndex(endIndex);
    }, [gridContext, setTotal, setStartIndex, setEndIndex]);


    const handleFiltersClick = useCallback(() => {
        appContext?.toggleFilterPanel?.();
    }, [appContext]);

    return <div className="table-header">
        <div className="product-info">
            Products  | Displaying {startIndex} - {endIndex} of { total }
        </div>
        <div className="filters">
            <button onClick={handleFiltersClick}>Filters</button>
        </div>
        <div className="spacer">
        </div>
        <div className="search">
            <input type="search" />
        </div>
        <div className="columns">
            <button>Columns</button>
        </div>
        <div className="export">
            <button>Export</button>
        </div>
    </div>
}