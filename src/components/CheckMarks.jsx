/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const skills = ["HTML", "CSS", "Javascript", "React", "Angular", "Node.JS"];

// eslint-disable-next-line no-unused-vars, react/prop-types
export default function MultipleSelectCheckmarks({ onChange, value }) {
  const menuItems = useMemo(
    () =>
      skills.map((name, index) => (
        <MenuItem key={index} value={name}>
          <Checkbox checked={value.indexOf(name) > -1} />
          <ListItemText primary={name} />
        </MenuItem>
      )),
    [value]
  );

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    onChange(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={selected => selected.join(", ")}
          MenuProps={MenuProps}>
          {menuItems}
        </Select>
      </FormControl>
    </div>
  );
}
