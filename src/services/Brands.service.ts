import { BRANDS_MOCK } from "./mocks/brands.mock";
import { IBrand } from "./models/Brand.model";

export class BrandsService {
    public static getBrands(): Promise<IBrand[]> {
        const timeout = Math.random() * 500 + 250;
        return new Promise((resolve, reject) => {
            return setTimeout(() => {
                resolve(BRANDS_MOCK);
            }, timeout);
        });
        // fetch()
    }

    public static async getBrandById(id: string): Promise<IBrand | undefined> {
        const brands = await this.getBrands();
        return brands.find((brand) => brand.id === id);
    }
}