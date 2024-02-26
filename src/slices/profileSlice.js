import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    user:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):null,
}

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setLoading(state, value) {
        state.loading = value.payload;
        },
        setUser(state,value){
            state.user = value.payload;
        },
    },
});

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;