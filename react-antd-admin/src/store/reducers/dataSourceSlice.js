import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataSource: [],
};

export const dataSourceSlice = createSlice({
    name: "dataSource",
    initialState,
    reducers: {
        setDataSource: (state, action) => {
            state.dataSource = action.payload;
        },
    },
});

export const { setDataSource } = dataSourceSlice.actions;
export default dataSourceSlice.reducer;