import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    isOpen: boolean;
    selectedFileIds: number[]; // Add this line to handle selected file IDs
    selectedImage: string[];
}

const initialState: ModalState = {
    isOpen: false,
    selectedFileIds: [], // Initialize selectedFileIds
    selectedImage: [],
};

const modalslice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleModal(state) {
            state.isOpen = !state.isOpen;
        },
        openModal(state) {
            state.isOpen = true;
        },
        closeModal(state) {
            state.isOpen = false;
        },
        setModalState(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },
        setSelectedFileIds(state, action: PayloadAction<number[]>) {
            state.selectedFileIds = action.payload; // Set the selected file IDs
        },
        setSelectedImage(state, action: PayloadAction<string[]>) {
            state.selectedImage = action.payload; // Set the selected file IDs
        },
    },
});

export const { toggleModal, openModal, closeModal, setModalState, setSelectedFileIds, setSelectedImage } = modalslice.actions;

export default modalslice.reducer;
