import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  IRequest,
  IRootState,
  IUserRow,
} from "../../lib/interfaces/interfaces";
import { useLocaleStorage } from "../../hooks/useLocaleStorage/useLocaleStorage";
import { useParams } from "react-router-dom";
import { createDataUser } from "../../lib/utils/rowData";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";
import { Box, IconButton, Modal } from "@mui/material";
import { deleteRequest } from "../../store/requests.slice";
import { OrderForm } from "../../components/forms/OrderForm/OrderForm";
import { DeliverForm } from "../../components/forms/DeliverForm/DeliverForm";

const style = {
  position: "absolute" as "const",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const UserRequests = () => {
  const params = useParams();

  const request = useSelector((state: IRootState) => state.requestsReducer);
  const { getLocaleStorage } = useLocaleStorage({ key: "requests" });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<IRequest>();
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const userRequests = (
    request.request || JSON.parse(getLocaleStorage() || "[]")
  ).filter((request: IRequest) => request.userId === params.userId);
  const dispatch = useDispatch();

  const rows = userRequests.map((request: IRequest) =>
    createDataUser(
      request.requestType,
      request.cityOrigin,
      request.cityDestination,
      request.date,
      request.createdAt,
      <IconButton
        onClick={() => {
          setInitialState(request);
          handleOpen();
        }}
      >
        <EditIcon color="primary" />
      </IconButton>,
      <IconButton
        color="error"
        onClick={() => {
          dispatch(deleteRequest(request.id));
        }}
      >
        <DeleteIcon />
      </IconButton>
    )
  );

  return (
    <>
      <Container sx={{ mt: 3 }}>
        <Typography variant="h3">User requests</Typography>
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
                      color={
                        row.typeRequest === "order" ? "success" : "primary"
                      }
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
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {initialState?.requestType === "order" ? (
            <OrderForm initialValues={initialState} handleClose={handleClose} />
          ) : (
            <DeliverForm
              initialValues={initialState}
              handleClose={handleClose}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};
