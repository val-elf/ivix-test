import { STOCK_INFO_MOCK } from "./mocks";
import { IProduct } from "./models/Product.model";
import { IStockInfo } from "./models/StockInfo.model";

export class StockService {
    public static async getFullStockInfo(): Promise<IStockInfo[]> {
        return new Promise((resolve, reject) => {
            const timeout = Math.random() * 500 + 250;
            return setTimeout(() => {
                resolve(STOCK_INFO_MOCK);
            }, timeout);
        });
    }

    public static async getStockInfoByProduct(product: IProduct): Promise<IStockInfo[]> {
        return (await this.getFullStockInfo()).filter((stockInfo) => stockInfo.productId === product.id);
    }

}