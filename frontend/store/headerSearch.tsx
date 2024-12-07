import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const headerSlice = createSlice({
    name: 'header',
    initialState: {
        searchToggled: false, // Initial state for the search overlay visibility
        searchQuery: { selected: 'All', value: '' }, // Initial state for the search query
        headerSearchloading: false, // Loading state for the search functionality
    },
    reducers: {
        toggleSearch: (state) => {
            // Toggle the searchToggled value between true and false
            state.searchToggled = !state.searchToggled;
        },
        setSearchQuery: (state, action: PayloadAction<any>) => {
            // Set the search query from the action payload
            state.searchQuery = action.payload;
        },
        setHeaderSearchLoading: (state, action: PayloadAction<boolean>) => {
            // Set the loading state based on the payload
            state.headerSearchloading = action.payload;
        },
    },
});

// Export actions for toggling search, setting search query, and managing loading state
export const { toggleSearch, setSearchQuery, setHeaderSearchLoading } = headerSlice.actions;

export default headerSlice.reducer;
