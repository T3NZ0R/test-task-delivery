import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Paper,
  Stack,
  Typography,
  Chip,
  Box,
  IconButton,
  Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IRequest,
  IRootState,
  IUserRow,
} from "../../lib/interfaces/interfaces";
import { useLocaleStorage } from "../../hooks/useLocaleStorage/useLocaleStorage";
import { useParams } from "react-router-dom";
import { createDataUser } from "../../lib/utils/rowData";
import { deleteRequest } from "../../store/requests.slice";
import { OrderForm } from "../../components/forms/OrderForm/OrderForm";
import { DeliverForm } from "../../components/forms/DeliverForm/DeliverForm";

import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

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

  const userTable = t("userTable", { returnObjects: true });

  return (
    <>
      <Container sx={{ mt: 3 }}>
        <Typography variant="h3">{t("userRequests")}</Typography>
        <Stack></Stack>
        <TableContainer component={Paper} sx={{ mt: 3 }} color="primary">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {userTable &&
                  (userTable as string[]).length &&
                  (userTable as string[]).map(
                    (userTable: string, index: number) => (
                      <TableCell
                        key={userTable}
                        align={index <= 4 ? "left" : "center"}
                      >
                        <Typography variant="subtitle1">{userTable}</Typography>
                      </TableCell>
                    )
                  )}
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
                        row.requestType === "order" ? "success" : "primary"
                      }
                      style={{ textTransform: "capitalize" }}
                      label={t(row.requestType)}
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
