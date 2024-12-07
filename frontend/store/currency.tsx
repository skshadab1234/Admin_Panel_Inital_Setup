import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
    currentCurrency: string; // Current selected currency
    currencySymbol: string;  // Symbol for the current currency (e.g., ₹, $, €)
}

const initialState: CurrencyState = {
    currentCurrency: 'INR', // Default currency
    currencySymbol: '₹'      // Default currency symbol
};

// Define the payload structure
interface CurrencyPayload {
    currentCurrency: string; // Currency code (e.g., INR, USD)
    currencySymbol: string;  // Currency symbol (e.g., ₹, $)
}

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        // Set the current currency and its symbol from the payload
        setCurrentCurrency(state, action: PayloadAction<CurrencyPayload>) {
            state.currentCurrency = action.payload.currentCurrency;
            state.currencySymbol = action.payload.currencySymbol;
        },
    },
});

export const { setCurrentCurrency } = currencySlice.actions;

export default currencySlice.reducer;
