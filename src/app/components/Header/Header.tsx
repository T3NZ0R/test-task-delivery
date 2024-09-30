import React from "react";
import { Stack } from "@mui/material";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
import { AuthButtons } from "../AuthButtons/AuthButtons";
import Logo from "../../../assets/Logo.svg";

export const Header = () => {
  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      alignItems={"center"}
      px={"55px"}
      py={"30px"}
      style={{ backgroundColor: "white" }}
    >
      <img src={Logo} alt="logo" style={{ maxHeight: "35px" }} />
      <Stack direction="row" spacing={9} alignItems={"center"}>
        <LanguageSelector />
        <AuthButtons />
      </Stack>
    </Stack>
  );
};
