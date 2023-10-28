import { ConfigService } from "./Config";
import { HttpService } from "./Http.service";
import { ISeller } from "./models/Seller.model";

const baseURL = ConfigService.baseURL;
export class SellersService {
    public static async getSellers(): Promise<ISeller[]> {
        return await HttpService.get<ISeller[]>(`${baseURL}/sellers`);
    }
}