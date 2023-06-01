import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'open'
}
const sidebarSlice = createSlice({
    name: 'sidebarStatus',
    initialState,
    reducers: {
        setSidebarStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { setSidebarStatus } = sidebarSlice.actions;
export default sidebarSlice.reducer;