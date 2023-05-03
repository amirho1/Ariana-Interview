import React from "react";
import Table from "../components/Table";
import { Button, Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ paddingTop: "5em" }}>
      <div>
        <Button variant="contained">Add</Button>
        <Table />
      </div>
    </Container>
  );
}
