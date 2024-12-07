import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StoreState {
    storeData: any; // Add this line to handle selected file IDs
}

const initialState: StoreState = {
    storeData: null, // Initialize storeData
};

const storeVendor = createSlice({
    name: 'storeData',
    initialState,
    reducers: {
        setStoreDataRedux(state, action: PayloadAction<{}>) {
            state.storeData = action.payload;
        },
    },
});

export const { setStoreDataRedux } = storeVendor.actions;

export default storeVendor.reducer;
