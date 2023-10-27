import React, { useEffect } from 'react';
import { StockGridContext } from '../stocks-grid/StocksGrid';

const fillPie = (ctx: CanvasRenderingContext2D, valueStart: number, valueEnd: number, value: number, color: string) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(150, 150);
    const angleStart = 0 - Math.PI / 2 + Math.PI * 2 * valueStart;
    const angleEnd = 0 - Math.PI / 2 + Math.PI * 2 * valueEnd;
    const angleMiddle = (angleStart + angleEnd) / 2;
    ctx.arc(150, 150, 100, angleStart, angleEnd);
    ctx.lineTo(150, 150);
    ctx.fill();
    ctx.closePath();
    if (Math.round(value * 100) / 100 !== 0) {
        ctx.fillStyle = '#ffffff';
        const px = 150 + Math.cos(angleMiddle) * 70;
        const py = 150 + Math.sin(angleMiddle) * 70;
        ctx.fillText(`${(value * 100).toFixed(2)}%`, px - 15, py - 5);
    }
}

export const PieChart = () => {
    const gridContext = React.useContext(StockGridContext);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const { stockOrderInfo } = gridContext!;

    useEffect(() => {
        const canvasElement = canvasRef.current!;
        const ctx = canvasElement.getContext('2d');
        if (!ctx) return;

        const allowedPercent = stockOrderInfo.total === 0 ? 1 : stockOrderInfo.allowedToOrder / stockOrderInfo.total;
        const orderedPercent = stockOrderInfo.total === 0 ? 0 : stockOrderInfo.ordered / stockOrderInfo.total;

        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        fillPie(ctx, 0, allowedPercent, allowedPercent, '#4e72bd');
        fillPie(ctx, allowedPercent, 1, orderedPercent, '#dc8143');
    }, [stockOrderInfo, canvasRef]);


    return <canvas width="300px" height="300px" ref={canvasRef}></canvas>;
}