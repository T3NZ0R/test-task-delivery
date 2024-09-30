import { useState, useEffect } from "react";

import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Stack, TextField, Chip
} from "@mui/material";

import { createDataAllUser } from "../../lib/utils/rowData";
import { filterRequests, filterRequestsByDateRange } from "../../lib/utils/filterRequests";
import { getComparator, stableSort } from "../../lib/utils/sortTable";
import { IRequest, IRootState } from "../../lib/interfaces/interfaces";
import { useLocaleStorage } from "../../hooks/useLocaleStorage/useLocaleStorage";
import { useSelector } from "react-redux";
import { TableHeadSort } from "../../components/TableHeadSort/TableHeadSort";

import { useTranslation } from "react-i18next";

export const AllRequests = () => {
  const request = useSelector((state: IRootState) => state.requestsReducer);
  const { getLocaleStorage } = useLocaleStorage({ key: "requests" });

  const { t } = useTranslation();

  const userRequests =
    request.request || JSON.parse(getLocaleStorage() || "[]");

  const rows = userRequests.map((request: IRequest) =>
    createDataAllUser(
      request.userEmail,
      request.requestType,
      request.cityOrigin,
      request.cityDestination,
      request.date,
      request.createdAt
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

  const [filter, setFilter] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState<IRequest[]>(rows);

  const [filteredDispatch, setFilteredDispatch] = useState<DateRange<Dayjs>>([
    dayjs(),
    dayjs(),
  ]);
  const [filteredCtreated, setFilteredCreated] = useState<DateRange<Dayjs>>([
    dayjs(),
    dayjs(),
  ]);

  useEffect(() => {
    setFilteredRows(
      filterRequests(rows, filter).length ? filterRequests(rows, filter) : rows
    );
  }, [filter, rows]);

  useEffect(() => {
    setFilteredRows(
      filterRequestsByDateRange(
        filteredRows,
        filteredDispatch[0]?.toISOString() || "",
        filteredDispatch[1]?.toISOString() || "",
        "date"
      ).length
        ? filterRequestsByDateRange(
            filteredRows,
            filteredDispatch[0]?.toISOString() || "",
            filteredDispatch[1]?.toISOString() || "",
            "date"
          )
        : filteredRows
    );
  }, [filteredDispatch, filteredRows]);

  useEffect(() => {
    setFilteredRows(
      filterRequestsByDateRange(
        filteredRows,
        filteredCtreated[0]?.toISOString() || "",
        filteredCtreated[1]?.toISOString() || "",
        "createdAt"
      ).length
        ? filterRequestsByDateRange(
            filteredRows,
            filteredCtreated[0]?.toISOString() || "",
            filteredCtreated[1]?.toISOString() || "",
            "createdAt"
          )
        : filteredRows
    );
  }, [filteredCtreated, filteredRows]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form>
        <Container sx={{ mt: 3 }}>
          <Typography variant="h3">{t("usersRequests")}</Typography>
  
          <Stack direction="column" mt={3}>
            <TextField
              label={t("filterItems")}
              size="small"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <DemoContainer
              components={["DateRangePicker"]}
              sx={{
                mt: 2,
                overflow: "visible",
                input: { padding: "8.5px 14px" },
                label: { top: "-6px" },
              }}
            >
              <DateRangePicker
                localeText={{
                  start: t("dateOfDispatchStart"),
                  end: t("dateOfDispatchEnd"),
                }}
                value={filteredDispatch}
                onChange={(newValue) => setFilteredDispatch(newValue)}
              />
            </DemoContainer>
            <DemoContainer
              components={["DateRangePicker"]}
              sx={{
                mt: 2,
                overflow: "visible",
                input: { padding: "8.5px 14px" },
                label: { top: "-6px" },
              }}
            >
              <DateRangePicker
                localeText={{
                  start: t("createdAtStart"),
                  end: t("createdAtEnd"),
                }}
                value={filteredCtreated}
                onChange={(newValue) => setFilteredCreated(newValue)}
              />
            </DemoContainer>
          </Stack>
  
          <TableContainer component={Paper} sx={{ mt: 3 }} color="primary">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHeadSort
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(filteredRows, getComparator(order, orderBy)).map(
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
                            label={t(
                              row.requestType === "order"
                                ? "order"
                                : "deliver"
                            )}
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
      </form>
    </LocalizationProvider>
  );
};
