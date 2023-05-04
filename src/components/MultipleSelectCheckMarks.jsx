/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { TextField } from "@mui/material";
import "./MultipleSelectCheckMarks.css";

const skills = ["HTML", "CSS", "Javascript", "React", "Angular", "Node.JS"];

function removeOrAddSkill(prevSkills, name) {
  const index = prevSkills.findIndex(skill => skill === name);
  if (index > -1) {
    return prevSkills.filter((_, i) => index !== i);
  } else {
    return [...prevSkills, name];
  }
}

export default function MultipleSelectCheckMarks({ onChange, value }) {
  const [search, setSearch] = useState("");
  const [dropdownDisplay, setDropDownDisplay] = useState(false);
  const [searchedSkills, setSearchedSkills] = useState(skills);

  const menuItems = useMemo(
    () =>
      searchedSkills.map((name, index) => (
        <MenuItem key={index} value={name} onClick={() => handleCheckBoxClick(name)}>
          <Checkbox checked={value.indexOf(name) > -1} />
          <ListItemText primary={name} />
        </MenuItem>
      )),
    [value, searchedSkills]
  );

  function handleCheckBoxClick(name) {
    onChange(removeOrAddSkill(value, name));
  }

  function onSearchChange(e) {
    setSearch(e.currentTarget.value);
  }

  function showDropDown(e) {
    e.stopPropagation();
    setDropDownDisplay(true);
  }

  function hideDropDown() {
    setDropDownDisplay(false);
  }

  /**
   * on change of skills input filter the skills
   */
  useEffect(() => {
    const regex = new RegExp(search, "gi");
    const foundFromSearch = skills.filter(value => regex.test(value));
    setSearchedSkills(foundFromSearch);
  }, [search]);

  // close Dropdown on user click on other parts of ui
  useEffect(() => {
    window.addEventListener("click", hideDropDown);

    return () => {
      window.removeEventListener("click", hideDropDown);
    };
  }, []);

  return (
    <div className="selectorWrapper" onClick={showDropDown}>
      <TextField
        required
        onChange={onSearchChange}
        id="outlined-required"
        value={search}
        label="skills"
        sx={{ width: "100%" }}
      />
      <div className={`menuItems ${dropdownDisplay ? "show" : ""}`}>{menuItems}</div>
    </div>
  );
}
