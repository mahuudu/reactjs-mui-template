const {createSlice} = require('@reduxjs/toolkit');

const counterSlice = createSlice({
    name : 'counter',
    initialState : 0,
    reducers : {
        increase(state){
            return state + 1;
        },
        decrese(state){
            return state - 1;
        },
    }
});

const {actions,reducer} = counterSlice;
export const {increase, decrese} = actions;
export default reducer;