import React, { useCallback } from 'react';
import './Table.css';

interface IFieldTableColumn {
    title: string;
    field: string;
    className?: string;
}

interface IContentTableColumn {
    title: string;
    className?: string;
    content?: (item: any) => React.ReactNode;
}

export type TTableColumn = IFieldTableColumn | IContentTableColumn;

export interface ITableSettings {
    columns: TTableColumn[];
}

export interface ITableContext {
    columns: TTableColumn[];
    cellClick?: (item: any, column: TTableColumn) => void;
    showSelectColumn?: boolean;
}

export interface ITableProps extends ITableContext {
    children?: React.ReactNode;
}

export const TableContext = React.createContext<ITableContext | null>(null);

export const Table = (props: ITableProps) => {
    const { cellClick, showSelectColumn, columns } = props;
    const handleRowCellClick = useCallback((item: any, column: TTableColumn) => {
        if (cellClick) cellClick(item, column);
    }, [cellClick]);

    return <table className="table">
            <thead>
                <tr>
                    {showSelectColumn && <th><input type="checkbox" /></th>}
                    {columns.map(column => <th key={column.title}>{column.title}</th>)}
                </tr>
            </thead>
            <tbody>
                <TableContext.Provider value={{ columns: props.columns, cellClick: handleRowCellClick, showSelectColumn }}>
                    {props.children}
                </TableContext.Provider>
            </tbody>
        </table>
    ;
};