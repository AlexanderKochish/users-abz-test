import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/usersSlice";
import userSlice from "./slices/userSlice";
import positionsSlice from "./slices/positionsSlice";
import tokenSlice from "./slices/tokenSlice";

const store = configureStore({
    reducer: {
        users: usersSlice,
        user: userSlice,
        positions: positionsSlice,
        token: tokenSlice
    }
})

export default store;