import { ConfigService } from "./Config";
import { HttpService } from "./Http.service";
import { IBrand } from "./models/Brand.model";

const baseURL = ConfigService.baseURL;
export class BrandsService {
    public static getBrands(): Promise<IBrand[]> {
        return HttpService.get<IBrand[]>(`${baseURL}/brands`);
    }

    public static async getBrandById(id: string): Promise<IBrand | undefined> {
        const brands = await this.getBrands();
        return brands.find((brand) => brand.id === id);
    }
}