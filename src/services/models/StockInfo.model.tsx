export interface IStockInfo {
    id: string;
    productId: string;
    brandId: string;
    sellerId: string;
    count: number;
    color: string;
    price: number;
    reviews: number;
    createdAt: string;
    updatedAt?: string;
}
