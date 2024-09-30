import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../lib/enums/enums";

export const LanguageSelector = () => {
  const [t, i18n] = useTranslation();

  const [language, setLanguage] = useState(i18n.language);

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <FormControl
      variant="standard"
      style={{ minWidth: 120, maxWidth: 220, width: "100%" }}
    >
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={language}
        onChange={handleChange}
        label="Age"
      >
        <MenuItem value={LANGUAGES.EN}>{t(LANGUAGES.EN)}</MenuItem>
        <MenuItem value={LANGUAGES.UK}>{t(LANGUAGES.UK)}</MenuItem>
      </Select>
    </FormControl>
  );
};
