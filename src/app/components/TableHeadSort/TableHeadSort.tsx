import  { FC } from "react";
import { TableRow, TableCell, TableSortLabel, TableHead } from "@mui/material";
import { headCells } from "../../lib/mock/mock.data";
import { IRequest, ITableHeadSort } from "../../lib/interfaces/interfaces";

import { useTranslation } from "react-i18next";

export const TableHeadSort: FC<ITableHeadSort> = ({
  order,
  orderBy,
  onRequestSort,
}) => {

  const { t } = useTranslation();
  const createSortHandler =
    (property: keyof Omit<IRequest, "type" | "description">) =>
    (event: MouseEvent) => {
      onRequestSort(event, property);
    };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          return (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id) as () => void}
              >
                {t(headCell.label)}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};
