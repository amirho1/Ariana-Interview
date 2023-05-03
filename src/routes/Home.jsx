import React, { useState } from "react";
import Table from "../components/Table";
import { Button, Container } from "@mui/material";
import Modal from "../components/Modal";

export default function Home() {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [userID, setUserID] = useState(undefined);

  function handleModalOpen() {
    setModalDisplay(true);
  }

  function handleModalClose() {
    setModalDisplay(false);
  }

  return (
    <Container maxWidth="md" sx={{ paddingTop: "5em" }}>
      <Modal
        display={modalDisplay}
        setUserID={setUserID}
        handleModalClose={handleModalClose}
        id={userID}
      />

      <div>
        <Button variant="contained" onClick={handleModalOpen}>
          Add
        </Button>
        <Table setUserID={setUserID} handleModalOpen={handleModalOpen} />
      </div>
    </Container>
  );
}
