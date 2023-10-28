import { ConfigService } from "./Config";
import { HttpService } from "./Http.service";
import { IProduct } from "./models/Product.model";
import { IStockInfo } from "./models/StockInfo.model";

const baseURL = ConfigService.baseURL;
export class StockService {
    public static async getFullStockInfo(): Promise<IStockInfo[]> {
        return await HttpService.get<IStockInfo[]>(`${baseURL}/stock-info`);
    }

    public static async getStockInfoByProduct(product: IProduct): Promise<IStockInfo[]> {
        return (await this.getFullStockInfo()).filter((stockInfo) => stockInfo.productId === product.id);
    }

}