import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    name: "AmirHossein",
    lastname: "Salighedar",
    birthDayDate: 849618323000,
    skills: ["HTML", "CSS", "React", "Javascript"],
  },
];

const usersSlice = createSlice({
  initialState,
  name: "users",
  reducers: {},
});

export default usersSlice.reducer;
