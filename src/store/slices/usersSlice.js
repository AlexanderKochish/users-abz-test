import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppService } from "../../service";
const { serviceFetch } = new AppService()

export const usersThunk = createAsyncThunk(
    'users/usersThunk',
  async (page) => {
    const res = await serviceFetch('users',`?page=${page}&count=6`)
    return {
        users: res.users,
        total_pages: res.total_pages, 
        currentPage: res.page
    }
  }
)

const initialState = {
    users: [],
    page: 1,
    totalPages: null,
    loading: true,
    activeModal: false,  
    error: null,
    newUser: {}
}

const usersSlice = createSlice({
    name: 'users',
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
        .addCase(usersThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(usersThunk.fulfilled, (state, {payload}) => {
            const existingIds = new Set(state.users.map( user => user.id))
            const newUsers = payload.users.filter( user => !existingIds.has(user.id))
            state.users = [...state.users,...newUsers],
            state.loading = false;
            state.page = payload.currentPage,
            state.totalPages = payload.total_pages
        })
        .addCase(usersThunk.rejected, (state) => {
            state.loading = false;
            state.error = "Rejected"
        })
    }
})

export const { setLoad, setActiveModal, setPage } = usersSlice.actions;
export default usersSlice.reducer;