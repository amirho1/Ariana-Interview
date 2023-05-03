import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const pages = ["Home", "Chart"];

const tabs = pages.map(page => {
  const path = page.toLowerCase() === "home" ? "/" : page.toLowerCase();
  return (
    <Link to={path} key={page} style={{ textDecoration: "none" }}>
      <Button sx={{ my: 2, color: "white", display: "block" }}>{page}</Button>
    </Link>
  );
});

function ResponsiveAppBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex" }}>{tabs}</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
