import { configureStore } from "@reduxjs/toolkit";
import users from "./features/usersSlice";

const store = configureStore({ reducer: { users } });

export default store;
