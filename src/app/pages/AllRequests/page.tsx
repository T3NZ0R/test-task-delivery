import React, { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import {
  IRequest,
  IRootState,
} from "../../lib/interfaces/interfaces";
import { useLocaleStorage } from "../../hooks/useLocaleStorage/useLocaleStorage";
import { createDataAllUser } from "../../lib/utils/rowData";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";
import { TableHeadSort } from "../../components/TableHeadSort/TableHeadSort";
import { getComparator, stableSort } from "../../lib/utils/sortTable";

export const AllRequests = () => {
  const request = useSelector((state: IRootState) => state.requestsReducer);
  const { getLocaleStorage } = useLocaleStorage({ key: "requests" });

  const userRequests =
    request.request || JSON.parse(getLocaleStorage() || "[]");

  const rows = userRequests.map((request: IRequest) =>
    createDataAllUser(
      request.userEmail,
      request.requestType,
      request.cityOrigin,
      request.cityDestination,
      request.date,
      request.createdAt,
    )
  );

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] =
    useState<keyof Omit<IRequest, "type" | "description">>("userEmail");

  const handleRequestSort = (
    event: MouseEvent,
    property: keyof Omit<IRequest, "type" | "description">
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h3">Users requests</Typography>
      <Stack></Stack>
      <TableContainer component={Paper} sx={{ mt: 3 }} color="primary">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeadSort
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map(
              (row: IRequest, index: number) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    key={row.createdAt}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.userEmail}</TableCell>

                    <TableCell component="th" scope="row" id={labelId}>
                      <Chip
                        color={
                          row.requestType === "order" ? "success" : "primary"
                        }
                        style={{ textTransform: "capitalize" }}
                        label={row.requestType}
                      />
                    </TableCell>
                    <TableCell align="left">{row.cityOrigin}</TableCell>
                    <TableCell align="left">{row.cityDestination}</TableCell>
                    <TableCell align="left">
                      {dayjs(row.date).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell align="left">
                      {dayjs(row.createdAt).format("DD-MM-YYYY HH:mm")}
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
