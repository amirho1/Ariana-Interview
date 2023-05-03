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
import { useSelector } from "react-redux";

const heads = ["index", "name", "lastname", "birthday date", "skills", "actions"].map(val => (
  <TableCell key={val}>{val.toUpperCase()}</TableCell>
));

export default function BasicTable() {
  const users = useSelector(state => state.users);

  const tableRowElements = useMemo(
    () =>
      users.map((row, i) => (
        <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell component="th" scope="row">
            {i + 1}
          </TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.lastname}</TableCell>
          <TableCell>{row.birthDayDate}</TableCell>
          <TableCell>{row.skills}</TableCell>
          <TableCell>
            <DeleteIcon sx={{ color: "red", cursor: "pointer" }} />
            <EditIcon sx={{ cursor: "pointer" }} />
          </TableCell>
        </TableRow>
      )),
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
