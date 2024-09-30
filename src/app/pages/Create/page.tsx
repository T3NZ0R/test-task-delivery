import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import createImg from "../../../assets/Create.png";
import { Title } from "../../lib/theme/styledComponent";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


export const CreatePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Grid width={"100%"} px={3} container>
        <Grid size={6}>
          <Box maxWidth={"490px"}>
            <Typography variant="h2" fontWeight={300} display={"inline"}>
             {t("createTitle.0")}
              <Title>  {t("createTitle.1")}</Title>
            </Typography>
            <Typography variant="body1">
              {t("createDescription")}
            </Typography>
            <Stack direction="row" spacing={2} maxWidth={"80%"} mt={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("order")}
              >
                {t("order")}
              </Button>

              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => navigate("deliver")}
              >
               {t("deliver")}
              </Button>
            </Stack>
          </Box>
        </Grid>
        <Grid size={6}>
          <Box
            width={"100%"}
            height={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <img
              src={createImg}
              alt="Not Authed Layout"
              style={{ maxWidth: "560px", width: "100%", height: "auto" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
