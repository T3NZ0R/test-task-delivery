import React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import {
  IRequest,
  IRootState,
  IUserRow,
} from "../../lib/interfaces/interfaces";
import { useLocaleStorage } from "../../hooks/useLocaleStorage/useLocaleStorage";
import { createDataAllUser } from "../../lib/utils/rowData";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";
export const AllRequests = () => {
  const request = useSelector((state: IRootState) => state.requestsReducer);
  const { getLocaleStorage } = useLocaleStorage({ key: "requests" });

  const userRequests =
    request.request || JSON.parse(getLocaleStorage() || "[]");

  const rows = userRequests.map((request: IRequest) =>
    createDataAllUser(
      request.requestType,
      request.cityOrigin,
      request.cityDestination,
      request.date,
      request.createdAt,
      <EditIcon color="primary" />,
      <DeleteIcon color="error" />
    )
  );

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h3">Users requests</Typography>
      <Stack></Stack>
      <TableContainer component={Paper} sx={{ mt: 3 }} color="primary">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">Type of request</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle1">City of Origin</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle1">Destination City</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle1">Date of dispatch</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle1">Created at</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1">Edit</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1">Delete</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: IUserRow) => (
              <TableRow
                key={row.createdAt}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Chip
                    color={row.typeRequest === "order" ? "success" : "primary"}
                    style={{ textTransform: "capitalize" }}
                    label={row.typeRequest}
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
                <TableCell align="center">{row.edit}</TableCell>
                <TableCell align="center">{row.deleteIcon}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
