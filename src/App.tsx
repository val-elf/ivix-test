import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { IBrand, ISeller, IStockInfo } from "./services/models";
import {
  BrandsService,
  SellersService,
} from "./services";
import { StocksGrid } from "./components/stocks-grid/StocksGrid";
import { FilterContainer } from "./components/filter-container/FilterContainer";
import { PictureContainer } from "./components/picture-container/PictureContainer";

interface IAppContext {
  brands: IBrand[];
  sellers: ISeller[];
  toggleFilterPanel: () => void;
  toggleImagePanel: (stock: IStockInfo) => void;
}

export const AppContext = React.createContext<IAppContext | null>(null);

function App() {
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [sellers, setSellers] = useState<ISeller[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [displayedStock, setDisplayedStock] = useState<IStockInfo | null>(null);

  const toggleFilterPanel = useCallback(() => {
    setShowFilterPanel(!showFilterPanel);
  }, [showFilterPanel, setShowFilterPanel]);

  const toggleImagePanel = useCallback((stock: IStockInfo) => {
    if (displayedStock === stock) {
      setDisplayedStock(null);
    } else {
      setDisplayedStock(stock);
    }
  }, [setDisplayedStock, displayedStock]);

  useEffect(() => {
    // get data from the service
    (async () => {
      const brands = await BrandsService.getBrands();
      const sellers = await SellersService.getSellers();
      setBrands(brands);
      setSellers(sellers);
      setLoaded(true);
    })();
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={{
        brands,
        sellers,
        toggleFilterPanel,
        toggleImagePanel,
      }}>
        <section className="main-content">
            <FilterContainer display={showFilterPanel} />
            {loaded ? <StocksGrid /> : 'Loading...'}
            <PictureContainer display={!!displayedStock} stock={displayedStock!}/>
        </section>
      </AppContext.Provider>
    </div>
  );
}

export default App;
