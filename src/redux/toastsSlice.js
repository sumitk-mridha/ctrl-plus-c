import { createSlice } from "@reduxjs/toolkit";

const toastsSlice = createSlice({
    name: "toasts",
    initialState: {
        toasts: []
    },
    reducers: {
        addToast: (state, action) => {
            const { id, message, type } = action.payload;
            state.toasts.push({ id, message, type });
        },
        removeToast: (state, action) => {
            const id = action.payload;
            state.toasts = state.toasts.filter(toast => toast.id !== id);
        }
    }
});

export default toastsSlice;