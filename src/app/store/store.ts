import {configureStore} from "@reduxjs/toolkit";
import { requestsReducer } from "./requests.slice";

const store = configureStore({
    reducer:{
        requestsReducer
    }
})

export {store};