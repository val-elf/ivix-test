import React, { useCallback } from "react";
import { TTableColumn, TableContext } from "./Table";

interface IRowProps {
  item: any;
  children?: React.ReactNode;
}

const getColumnValue = (item: any, fieldName: string): string => {
  if(!item) return '';
  const [first, ...rest] = fieldName.split(".");
  if (rest.length === 0) {
    return item[first];
  }
  return getColumnValue(item[first], rest.join("."));
};

export const Row = (props: IRowProps) => {
  const context = React.useContext(TableContext);
  const { showSelectColumn } = context!;
  const { item } = props;

  const handleColumnClick = useCallback((column: TTableColumn) => {
    context?.cellClick?.(item, column);
  }, [item, context]);

  return (
    <tr>
      {showSelectColumn && <td><input type="checkbox" /></td>}
      {context?.columns.map((column) => (
        <td
            key={item.id + "-" + column.title}
            onClick={() => handleColumnClick(column)}
            className={column.className}
        >
          {
            "field" in column ? getColumnValue(item, column.field)
            : "content" in column && column.content ? column.content(item)
            : null}
        </td>
      ))}
    </tr>
  );
};
