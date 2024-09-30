import React, { FC, Key, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { Title } from "../../../lib/theme/styledComponent";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { validationSchemaDeliverRequest } from "../../../lib/schemes/schemes";
import { useDispatch } from "react-redux";
import { createRequest, editRequest } from "../../../store/requests.slice";
import { useGetCities } from "../../../hooks/useGetCountries/useGetCities";
import { useLocaleStorage } from "../../../hooks/useLocaleStorage/useLocaleStorage";
import { IRequest } from "../../../lib/interfaces/interfaces";

export const DeliverForm: FC<{
  initialValues?: IRequest;
  handleClose?: () => void;
}> = ({ initialValues, handleClose }) => {
  const { getCities } = useGetCities();
  const { getLocaleStorage } = useLocaleStorage({ key: "activeUser" });
  const [resetInputField, setResetInputField] = useState<boolean>(false);

  const cities: { label: string }[] = getCities() || [];
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues || {
      id: crypto.randomUUID(),
      cityOrigin: "",
      cityDestination: "",
      date: dayjs(new Date()),
      createdAt: new Date().toISOString(),
    },
    validationSchema: validationSchemaDeliverRequest,
    onSubmit: (values) => {
      dispatch(
        !initialValues
          ? createRequest({
              ...values,
              date: dayjs(values.date).toISOString(),
              requestType: "delivery",
              userEmail: JSON.parse(getLocaleStorage() || "{}").email,
              userId: JSON.parse(getLocaleStorage() || "{}").id,
            })
          : editRequest({
              ...values,
              date: dayjs(values.date).toISOString(),
            })
      );
      setResetInputField((prev) => !prev);
      if (handleClose) {
        handleClose();
      }
      formik.resetForm();
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={formik.handleSubmit}>
        <Container
          maxWidth="md"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!initialValues && (
            <>
              <Stack
                direction="row"
                gap={1}
                mt={6}
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
              >
                <Typography
                  variant="h2"
                  display={"inline"}
                  style={{ fontWeight: "300!important" }}
                >
                  Create a <Title> Delivery Request</Title>
                </Typography>
              </Stack>
              <Typography variant="body1" textAlign={"center"}>
                Please fill out the form below to deliver a parcel. All fields
                are required.
              </Typography>
            </>
          )}

          <Grid container spacing={3} gap={3} width={"100%"} my={3}>
            <Grid size={6} gap={3}>
              <Stack direction={"column"} gap={3}>
                <Autocomplete
                  key={resetInputField.toString() as Key}
                  disablePortal
                  options={cities || []}
                  defaultValue={{ label: initialValues?.cityOrigin || "" }}
                  onChange={(e, value) =>
                    formik.setFieldValue("cityOrigin", value?.label)
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City of Origin"
                      name="cityOrigin"
                      id="cityOrigin"
                      value={formik.values.cityOrigin}
                      error={
                        formik.touched.cityOrigin &&
                        Boolean(formik.errors.cityOrigin)
                      }
                      helperText={
                        formik.touched.cityOrigin && formik.errors.cityOrigin
                      }
                      onBlur={formik.handleBlur}
                      fullWidth
                    />
                  )}
                />
                <Autocomplete
                  key={(resetInputField.toString() + 1) as Key}
                  disablePortal
                  options={cities}
                  defaultValue={{ label: initialValues?.cityDestination || "" }}
                  onChange={(e, value) => {
                    formik.setFieldValue("cityDestination", value?.label);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Destination City"
                      name="cityDestination"
                      id="cityDestination"
                      value={formik.values.cityDestination}
                      error={
                        formik.touched.cityDestination &&
                        Boolean(formik.errors.cityDestination)
                      }
                      helperText={
                        formik.touched.cityDestination &&
                        formik.errors.cityDestination
                      }
                      onBlur={formik.handleBlur}
                      fullWidth
                    />
                  )}
                />
              </Stack>
            </Grid>
            <Grid size={6}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{ width: "100%", mt: "-8px" }}
              >
                <DatePicker
                  label="Date of dispatch"
                  name="date"
                  value={dayjs(formik.values.date)}
                  onChange={(newValue) => {
                    formik.setFieldValue("date", newValue);
                  }}
                  defaultValue={dayjs(initialValues?.date) || dayjs(new Date())}
                  disablePast
                  sx={{ width: "100%", mt: "-10px" }}
                />
              </DemoContainer>
            </Grid>
          </Grid>

          <Button variant="contained" fullWidth type="submit">
            {!initialValues ? "Submit" : "Edit"} Deliver
          </Button>
        </Container>
      </form>
    </LocalizationProvider>
  );
};
