import { SELLERS_MOCK } from "./mocks";
import { ISeller } from "./models/Seller.model";

export class SellersService {
    public static getSellers(): Promise<ISeller[]> {
        return new Promise((resolve) => {
            const timeout = Math.random() * 500 + 250;
            return setTimeout(() => {
                resolve(SELLERS_MOCK);
            }, timeout);
        });
    }
}