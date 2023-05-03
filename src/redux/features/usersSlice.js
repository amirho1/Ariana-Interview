import { createSlice } from "@reduxjs/toolkit";
import { lastIndexId } from "../../helpers";

const initialState = [
  {
    name: "AmirHossein",
    lastname: "Salighedar",
    birthdayDate: 849618323000,
    skills: ["HTML", "CSS", "React", "Javascript"],
    id: 1,
  },
];

const usersSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    add(state, { payload }) {
      state.push({ ...payload, id: lastIndexId(state) + 1 });
    },
    remove(state, { payload }) {
      return state.filter(value => value.id !== payload);
    },
    edit(state, { payload }) {
      const newState = [...state];
      const index = newState.findIndex(value => value.id === payload.id);
      newState[index] = payload;
      return newState;
    },
  },
});

export function selectUser(id) {
  if (!id) return () => null;
  return state => state.users.find(user => user.id === id);
}

export const { add, remove, edit } = usersSlice.actions;

export default usersSlice.reducer;
