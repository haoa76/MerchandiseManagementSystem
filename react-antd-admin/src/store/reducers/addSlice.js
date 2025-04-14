import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    collapsed:false
}

export const addSlice = createSlice({
    name:'add',
    initialState,
    reducers:{
        setCollapsed:(state,action)=>{
            // console.log(state.collapsed)
            // console.log(action.payload)
            state.collapsed = action.payload
        }
    }
})

export const {setCollapsed} = addSlice.actions
export default addSlice.reducer