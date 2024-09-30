import { FC, Key, useState } from "react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  Autocomplete,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { TYPES } from "../../../lib/enums/enums";
import { useGetCities } from "../../../hooks/useGetCountries/useGetCities";
import { useLocaleStorage } from "../../../hooks/useLocaleStorage/useLocaleStorage";
import { useDispatch } from "react-redux";
import { createRequest, editRequest } from "../../../store/requests.slice";
import { IRequest } from "../../../lib/interfaces/interfaces";
import { validationSchemaOrderRequest } from "../../../lib/schemes/schemes";

import { Title } from "../../../lib/theme/styledComponent";

import { useTranslation } from "react-i18next";

export const OrderForm: FC<{
  initialValues?: IRequest;
  handleClose?: () => void;
}> = ({ initialValues, handleClose }) => {
  const { getCities } = useGetCities();
  const { getLocaleStorage } = useLocaleStorage({ key: "activeUser" });
  const [resetInputField, setResetInputField] = useState<boolean>(false);
  const cities: { label: string }[] = getCities() || [];
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: initialValues || {
      id: crypto.randomUUID(),
      cityOrigin: "",
      cityDestination: "",
      type: "",
      date: dayjs(new Date()),
      createdAt: new Date().toISOString(),
      description: "",
    },
    validationSchema: validationSchemaOrderRequest,
    onSubmit: (values) => {
      dispatch(
        !initialValues
          ? createRequest({
              ...values,
              date: dayjs(values.date).toISOString(),
              requestType: "order",
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
                  {t("orderTitle.0")} <Title> {t("orderTitle.1")}</Title>
                </Typography>
              </Stack>
              <Typography variant="body1" textAlign={"center"}>
                {t("orderDescription")}
              </Typography>
            </>
          )}

          <Grid container spacing={3} gap={3} width={"100%"} my={3}>
            <Grid size={6} gap={3}>
              <Stack direction={"column"} gap={3}>
                <Autocomplete
                  key={resetInputField.toString() as Key}
                  disablePortal
                  options={cities}
                  defaultValue={{ label: initialValues?.cityOrigin || "" }}
                  onChange={(e, value) =>
                    formik.setFieldValue("cityOrigin", value?.label)
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={t("cityOfOrigin")}
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
                <FormControl fullWidth>
                  <InputLabel id="type-label">{t("type")}</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    name="type"
                    value={formik.values.type}
                    defaultValue={initialValues?.type}
                    label={t("type")}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                  >
                    {Object.values(TYPES).map((type) => (
                      <MenuItem key={type} value={type}>
                        <Typography
                          variant="body1"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {t(type)}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  id="description"
                  name="description"
                  label={t("parcelDescription")}
                  variant="outlined"
                  multiline
                  rows={4}
                  value={formik.values.description}
                  defaultValue={initialValues?.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description &&
                    formik.errors.description 
                  }
                  onBlur={formik.handleBlur}
                />
              </Stack>
            </Grid>
            <Grid size={6}>
              <Autocomplete
                key={resetInputField.toString() as Key}
                disablePortal
                options={cities}
                defaultValue={{ label: initialValues?.cityDestination || "" }}
                onChange={(e, value) => {
                  formik.setFieldValue("cityDestination", value?.label);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t("destinationCity")}
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
              <DemoContainer
                components={["DatePicker"]}
                sx={{ width: "100%", mt: 2 }}
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
            {!initialValues ? t("submit") : t("edit")} {t("order")}
          </Button>
        </Container>
      </form>
    </LocalizationProvider>
  );
};
