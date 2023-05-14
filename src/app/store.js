import userReducer from '../features/user/userSlice';
import counterReducer from '../features/counter/counterSlide';
import { configureStore } from "@reduxjs/toolkit";



const rootReducer = {
    couter : counterReducer,
    user : userReducer,
};



const store = configureStore({
    reducer : rootReducer
});


export default store;