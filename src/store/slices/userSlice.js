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
export const createNewUser = createAsyncThunk(
    'user/createNewUser',
    async ({e,token}) => {
        const userForm = e.target;
        const formData = new FormData(userForm);
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}users`, {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": "Bearer " + token
          }, 
        });
        if(res.ok){
          alert("New User Created")
          location.reload()
        }else{
          alert("Pleace add to all fields on inputs")
        }
        userForm.querySelectorAll('input','input[type=radio]')
        .forEach( el => {
            if(el.value) el.value = '';
            if(el.checked) el.checked = false;
          })
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
        .addCase(createNewUser.pending,(state) => {
            state.error = null;
            state.loading = true;
        })
        .addCase(createNewUser.fulfilled,(state) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(createNewUser.rejected,(state, action) => {
            state.loading = false;
            state.error = 'some error'
        })
    }
})

export const { setLoad, setActiveModal, setPage } = userSlice.actions;
export default userSlice.reducer;