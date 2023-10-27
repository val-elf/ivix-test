import { PRODUCTS_MOCK } from "./mocks";
import { IProduct } from "./models/Product.model";

export class ProductsService {
    private static products: IProduct[];
    public static getProducts(): Promise<IProduct[]> {
        if (this.products) {
            return Promise.resolve(this.products);
        }
        const timeout = Math.random() * 500 + 250;
        return new Promise((resolve, reject) => {
            return setTimeout(() => {
                this.products = PRODUCTS_MOCK;
                resolve(PRODUCTS_MOCK);
            }, timeout);
        });
        // fetch()
    }

    public static async getProductById(id: string): Promise<IProduct | undefined> {
        const products = await this.getProducts();
        return products.find((product) => product.id === id);
    }
}