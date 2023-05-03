/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { Chip } from "@mui/material";
import { remove } from "../redux/features/usersSlice";
import { calcAge } from "../helpers";

const heads = ["index", "name", "lastname", "age", "skills", "actions"].map((val, index) => (
  <TableCell key={index}>{val.toUpperCase()}</TableCell>
));

function createChipFromSkills(skills) {
  return skills.map(
    (value, index) => <Chip key={index} label={value} color="primary" variant="outlined" />,
    []
  );
}

export default function BasicTable({ setUserID, handleModalOpen }) {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  function removeUser(id) {
    dispatch(remove(id));
  }

  const tableRowElements = useMemo(
    () =>
      users.map((user, index) => {
        return (
          <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.lastname}</TableCell>
            <TableCell>{user.birthdayDate ? calcAge(user.birthdayDate) : undefined}</TableCell>
            <TableCell>{createChipFromSkills(user.skills)}</TableCell>
            <TableCell>
              <DeleteIcon
                onClick={() => removeUser(user.id)}
                sx={{ color: "red", cursor: "pointer" }}
              />
              <EditIcon
                onClick={() => {
                  setUserID(user.id);
                  handleModalOpen();
                }}
                sx={{ cursor: "pointer" }}
              />
            </TableCell>
          </TableRow>
        );
      }),
    [users]
  );

  return (
    <TableContainer sx={{ minWidth: "100%", marginTop: "1rem" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>{heads}</TableRow>
        </TableHead>
        <TableBody>{tableRowElements}</TableBody>
      </Table>
    </TableContainer>
  );
}
