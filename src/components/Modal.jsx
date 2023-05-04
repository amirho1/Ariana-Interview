/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useReducer } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MUIModal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Button, TextField } from "@mui/material";
import { preventDefault } from "../helpers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MultipleSelectCheckMarks from "./MultipleSelectCheckMarks.jsx";
import { useDispatch, useSelector } from "react-redux";
import { add, edit, selectUser } from "../redux/features/usersSlice";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const initialUserData = {
  name: "",
  lastname: "",
  birthdayDate: "",
  skills: [],
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "name":
      return { ...state, name: payload.target.value };
    case "lastname":
      return { ...state, lastname: payload.target.value };
    case "birthdayDate":
      // eslint-disable-next-line no-case-declarations
      const date = new Date(payload.$d).valueOf();
      return { ...state, birthdayDate: date };
    case "skills":
      return { ...state, skills: [...payload] };
    case "updateAll":
      return payload;
    case "clear":
      return { ...initialUserData };
  }
}

export default function Modal({ handleModalClose, display, id, setUserID }) {
  const defaultUserData = useSelector(selectUser(id)) || initialUserData;

  const [user, dispatch] = useReducer(reducer, defaultUserData);
  const reduxDispatch = useDispatch();

  function onChange(type) {
    return function handler(e) {
      dispatch({
        payload: e,
        type,
      });
    };
  }

  useEffect(() => {
    dispatch({ type: "updateAll", payload: defaultUserData });
  }, [defaultUserData, id]);

  function addUserToReduxOrEdit() {
    dispatch({ type: "clear" });
    if (id) {
      reduxDispatch(edit({ ...user, id }));
    } else {
      reduxDispatch(add(user));
    }
    handleModalClose();
    setUserID(undefined);
  }

  function onCancel() {
    dispatch({ type: "clear" });
    handleModalClose();
    setUserID(undefined);
  }

  const title = useMemo(() => (id ? "Edit" : "Add"), [id]);

  return (
    <MUIModal
      open={display}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography>{title}</Typography>
          <Button onClick={onCancel}>
            <CloseIcon />
          </Button>
        </Box>
        <form className="form" onSubmit={preventDefault} style={{ padding: "1rem 0" }}>
          <Box>
            <TextField
              required
              onChange={onChange("name")}
              value={user.name}
              id="outlined-required"
              label="Name"
              sx={{ width: "100%" }}
            />
          </Box>
          <Box>
            <TextField
              required
              onChange={onChange("lastname")}
              id="outlined-required"
              value={user.lastname}
              label="lastname"
              sx={{ width: "100%" }}
            />
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(user.birthdayDate)}
                label="Birthday date"
                onChange={onChange("birthdayDate")}
                required
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <MultipleSelectCheckMarks value={user.skills} onChange={onChange("skills")} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" onClick={addUserToReduxOrEdit}>
              Save
            </Button>
            <Button variant="contained" sx={{ background: "red" }} onClick={onCancel}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </MUIModal>
  );
}
