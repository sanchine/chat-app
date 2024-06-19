import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/auth";
import { chatReducer } from "./reducers/chat";
import { dialogsReducer } from "./reducers/dialogs";


// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        dialogs: dialogsReducer
    },
    devTools: true // disable in production
})

