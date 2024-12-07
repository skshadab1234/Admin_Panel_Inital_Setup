import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for a vendor object
interface Vendor {
    id: number;
    name: string;
    email: string;
    admin_image: string | null;
    joined_date: string;
    phone_number: string;
    is_multiple_shop: boolean;
    about_company: string;
    admin_status: string;
    verified: any;
}

// Initial state is an empty vendor object
const initialState: Partial<Vendor> = {};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        addVendor(state, action: PayloadAction<Vendor>) {
            // Replace the entire state with the new Vendor object
            return { ...action.payload };
        },
        read(state, action: PayloadAction<Vendor>) {
            // Replace the entire state with the new data
            return { ...action.payload };
        },
    },
});

// Export actions and reducer
export const { addVendor, read } = adminSlice.actions;
export default adminSlice.reducer;
