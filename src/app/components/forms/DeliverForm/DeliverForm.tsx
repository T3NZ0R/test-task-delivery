import  { FC, Key, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Autocomplete,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Grid from "@mui/material/Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { validationSchemaDeliverRequest } from "../../../lib/schemes/schemes";
import { createRequest, editRequest } from "../../../store/requests.slice";
import { useGetCities } from "../../../hooks/useGetCountries/useGetCities";
import { useLocaleStorage } from "../../../hooks/useLocaleStorage/useLocaleStorage";
import { IRequest } from "../../../lib/interfaces/interfaces";
import { Title } from "../../../lib/theme/styledComponent";

import { useTranslation } from "react-i18next";

export const DeliverForm: FC<{
  initialValues?: IRequest;
  handleClose?: () => void;
}> = ({ initialValues, handleClose }) => {
  const { getCities } = useGetCities();
  const { getLocaleStorage } = useLocaleStorage({ key: "activeUser" });
  const [resetInputField, setResetInputField] = useState<boolean>(false);

  const { t } = useTranslation();

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
                  {t("deliveryTitle.0")} <Title> {t("deliveryTitle.1")}</Title>
                </Typography>
              </Stack>
              <Typography variant="body1" textAlign={"center"}>
                {t("deliveryDescription")}
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
                      label={t("cityOrigin")}
                      name="cityOrigin"
                      id="cityOrigin"
                      value={formik.values.cityOrigin}
                      error={
                        formik.touched.cityOrigin &&
                        Boolean(formik.errors.cityOrigin)
                      }
                      helperText={
                        formik.touched.cityOrigin &&
                        formik.errors.cityOrigin 
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
                      label={t("cityDestination")}
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
                  label={t("dateOfDispatch")}
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
            {!initialValues ? t("submit") : t("edit")} {t("deliver")}
          </Button>
        </Container>
      </form>
    </LocalizationProvider>
  );
};
