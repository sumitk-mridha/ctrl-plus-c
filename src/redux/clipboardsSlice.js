import { createSlice } from "@reduxjs/toolkit";

const clipboardsSlice = createSlice({
    name: "clipboards",
    initialState: {
        clipboards: [""]
    },
    reducers: {
        addClipboard: (state, action) => {
            if(state.clipboards.length < 10) state.clipboards.push("");
        },
        removeClipboard: (state, action) => {
            if(state.clipboards.length < 2) return;
            state.clipboards.splice(action.payload, 1);
        },
        updateClipboardText: (state, action) => {
            const { index, text } = action.payload;
            state.clipboards[index] = text;
        }
    }
});

export default clipboardsSlice;