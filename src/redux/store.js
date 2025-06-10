import { configureStore } from "@reduxjs/toolkit";

import clipboardsSlice from "./clipboardsSlice";
import toastsSlice from "./toastsSlice";

const store = configureStore({
    reducer: {
        clipboards: clipboardsSlice.reducer,
        toasts: toastsSlice.reducer
    }
});

export default store;