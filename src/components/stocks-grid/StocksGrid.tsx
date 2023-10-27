import React, { useCallback, useContext, useEffect, useState } from "react";
import { TTableColumn, Table } from "../table/Table";
import { AddtionaActions } from "../actions/AdditionalActions";
import { IBrand, IProduct, ISeller, IStockInfo } from "../../services/models";
import { ProductsService, StockService } from "../../services";
import { Row } from "../table/Row";
import { AppContext } from "../../App";
import { TableHeader } from "../table/table-header/TableHeader";
import './StocksGrid.css';
import { PieChart } from "../pie-chart/PieChart";
import { IStockOrderInfo } from "../../models/StockOrderInfo";
import { IPagingInfo } from "../../models";

const PRODUCTS_COLUMNS: TTableColumn[] = [
  {
    field: "product.name",
    title: "Product Name",
    className: 'active',
  },
  {
    title: "Company",
    field: "brand.name",
    className: 'active',
  },
  {
    field: "color",
    title: "Color",
    className: 'active',
  },
  {
    title: "In Stock",
    content: (item) => (item.count > 0 ? "In Stock" : "Out of Stock"),
    className: 'active non-wrapped',
  },
  {
    field: "price",
    title: "Price",
    className: 'active',
  },
  {
    title: "Count",
    content: (item) => (item.count - item.ordered),
    className: 'active',
  },
  {
    title: "# Reviews",
    field: "reviews",
    className: 'active',
  },
  {
    title: "Seller location",
    field: "seller.address",
    className: 'active non-wrapped',
  },
  {
    title: "Additional",
    content: (item) => <AddtionaActions stockInfo={item} />,
  },
];


type TStockData = IStockInfo & {
  product: IProduct;
  brand: IBrand;
  seller: ISeller;
  ordered: number;
};
interface IStockGridContext {
  pageInfo: IPagingInfo,
  stockOrderInfo: IStockOrderInfo,
  updateStockInfo: (stockInfo: IStockInfo) => void;
}

export const StockGridContext = React.createContext<IStockGridContext | null>(null);
const initialOrderInfo: IStockOrderInfo = { total: 0, allowedToOrder: 0, ordered: 0 };
const initialPagingInfo: IPagingInfo = { total: 0, pageIndex: 0, pageSize: 10 };

export const StocksGrid = () => {
  const [stockInfo, setStockInfo] = useState<IStockInfo[]>([]);
  const [stockData, setStockData] = useState<TStockData[]>([]);
  const [stockOrderInfo, setStockOrderInfo] = useState<IStockOrderInfo>(initialOrderInfo);
  const [pageInfo, setPageInfo] = useState<IPagingInfo>(initialPagingInfo);
  const appContext = useContext(AppContext);

  const updateStockInfo = useCallback(
    (stockItem: IStockInfo) => {
      const newStockData = stockData.map((item) => {
        if (item.id === stockItem.id) {
          return {
            ...item,
            stockItem,
          };
        }
        return item;
      });

      setStockData(newStockData);
    },
    [stockData, setStockData]
  );

  const handleCellClick = useCallback((item: TStockData, cell: TTableColumn) => {
    if (cell.title !== 'Additional') {
        appContext?.toggleImagePanel?.(item);
    }
  }, [appContext]);

  useEffect(() => {
    setStockOrderInfo({
      total: stockData.reduce((res, item) => res + item.count , 0),
      allowedToOrder: stockData.reduce((res, item) => res + (item.count - item.ordered)  , 0),
      ordered: stockData.reduce((res, item) => res + item.ordered, 0),
    });
  }, [stockData]);

  useEffect(() => {
    // get data from the service
    if (stockInfo) {
      // read all data for the product by stock
      const prows = stockInfo.map(async (stock) => {
        const product = await ProductsService.getProductById(stock.productId);
        const brand = appContext?.brands.find(
          (brand) => brand.id === stock.brandId
        );
        const seller = appContext?.sellers.find(
          (seller) => seller.id === stock.sellerId
        );
        return {
          product,
          brand,
          seller,
          ordered: 0,
          ...stock,
        } as TStockData;
      });

      Promise.all(prows).then((rows) => {
        setPageInfo({ total: rows.length, pageIndex: 0, pageSize: 10 })
        setStockData(rows);
      });
    }
  }, [stockInfo]);

  useEffect(() => {
    (async () => {
      const stockInfo = await StockService.getFullStockInfo();
      setStockInfo(stockInfo);
    })();
  }, []);

  return (
    <div className="stocks-grid">
      <StockGridContext.Provider value={{ stockOrderInfo, pageInfo, updateStockInfo }}>
        <div className="stocks-grid__container">
          <TableHeader />
          <div className="stocks-grid__table-holder">
            <Table columns={PRODUCTS_COLUMNS} showSelectColumn={true} cellClick={handleCellClick}>
              {stockData.map((stockDataItem) => (
                <Row
                  key={stockDataItem.productId + ":" + stockDataItem.brandId}
                  item={stockDataItem}
                />
              ))}
            </Table>
          </div>
        </div>
        <section className="pie-chart">
          <PieChart />
        </section>
      </StockGridContext.Provider>
    </div>
  );
};
