import { createSlice } from "@reduxjs/toolkit";

const toastsSlice = createSlice({
    name: "toasts",
    initialState: {
        toasts: []
    },
    reducers: {
        addToast: (state, action) => {
            state.toasts.push(action.payload);
        },
        removeToast: (state, action) => {
            state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
        }
    }
});

export default toastsSlice;