import { ConfigService } from "./Config";
import { IProduct } from "./models/Product.model";
import { HttpService } from "./Http.service";

const baseURL = ConfigService.baseURL;
export class ProductsService {
    private static products: IProduct[];

    public static async getProducts(): Promise<IProduct[]> {
        this.products = await HttpService.get<IProduct[]>(`${baseURL}/products`);
        return this.products;
    }

    public static async getProductById(id: string): Promise<IProduct | undefined> {
        return await HttpService.get<IProduct>(`${baseURL}/products/${id}`);
    }
}