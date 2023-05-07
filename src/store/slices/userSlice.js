import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppService } from "../../service";
const { serviceFetch } = new AppService()

export const getUserById = createAsyncThunk(
    'user/getUserById',
    async(id) => {
        const res = await serviceFetch(`users/${id}`)
        return {
            user: res.user
        }
    }
)
const initialState = {
    user: null,
    loading: true,
    activeModal: false,  
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setLoad(state,action){
            state.load = action.payload
        },
        setActiveModal(state,action){
            state.activeModal = action.payload
        },
        setPage(state, action){
            state.page = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserById.fulfilled, (state, {payload}) => {
            state.user = payload.user;
            state.loading = false;
        })
        .addCase(getUserById.rejected, (state) => {
            state.loading = false;
            state.error = "Rejected"
        })
    }
})

export const { setLoad, setActiveModal, setPage } = userSlice.actions;
export default userSlice.reducer;