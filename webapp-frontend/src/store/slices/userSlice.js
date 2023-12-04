import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAdmin: false
    },
    reducers: {
        setUserType: (state, action) => {
            return action.payload;
        }
    }
})

export default userSlice.reducer
export const { setUserType } = userSlice.actions;