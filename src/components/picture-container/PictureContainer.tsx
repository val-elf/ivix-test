import React, { useEffect, useState } from "react";
import { IStockInfo } from "../../services/models";
import './PictureContainer.css';
import { ConfigService } from "../../services/Config";

interface IPictureContainerProps {
    display?: boolean;
    stock?: IStockInfo;
}

const baseURL = ConfigService.baseURL;

export const PictureContainer = (props: IPictureContainerProps) => {
    const { stock, display } = props;
    const [latestStock, setLatestStock] = useState<IStockInfo | null>(null);
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        if (stock) {
            setLatestStock(stock);
            setUrl(`${baseURL}/stock-info/image/${stock?.productId}`);
        }
    }, [stock]);

    return <div className={`image-container ${display ? 'visible': ''}`}>
        <div className="image-container__wrapper">
            <img src={url} width="200" alt={latestStock?.productId} />
        </div>
    </div>;
};