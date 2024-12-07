import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
    color_palette: any; // Define types based on your actual data structure
    menuItems: MenuItem[]; // Array to store menu items
    megamenu: MegaMenu; // Updated type for megamenu
}

interface MenuItem {
    name: string;
    url: string;
    dropdown: [];
    megamenu: MegaMenu;
}

interface MegaMenu {
    name: string;
    megamenu: MegaMenuSection[]; // Array of sections
}

interface MegaMenuSection {
    title: string;
    url: string;
    items: MegaMenuItem[]; // Array of items in each section
}

interface MegaMenuItem {
    name: string;
    url: string;
}

const initialState: MenuState = {
    color_palette: null, // Initial value can be set to null or an empty object/array
    menuItems: [], // Array to store menu items
    megamenu: {
        name: '',
        megamenu: [], // Initially empty array for megamenu sections
    },

};

const menuSlice = createSlice({
    name: 'menu_slice',
    initialState,
    reducers: {
        setColorPalette(state, action: PayloadAction<any>) {
            state.color_palette = action.payload;
        },
        updateMenuItems(state, action: PayloadAction<MenuItem>) {
            const newItem = action.payload;
            const existingIndex = state.menuItems.findIndex(item => item.name === newItem.name && item.url === newItem.url);
            if (existingIndex !== -1) {
                state.menuItems[existingIndex] = newItem;
            } else {
                state.menuItems.push(newItem);
            }
        },
        updateMegaMenuName(state, action: PayloadAction<string>) {
            state.megamenu.name = action.payload;
        },
        setMegaMenuSections(state, action: PayloadAction<MegaMenu>) {
            state.megamenu = action.payload;
        },
        addMegaMenuSection(state, action: PayloadAction<MegaMenuSection>) {
            const existingSection = state.megamenu.megamenu.find(section => section.title === action.payload.title);
            if (!existingSection) {
                state.megamenu.megamenu.push(action.payload);
            }
        },
        addMegaMenuItem(state, action: PayloadAction<{ sectionIndex: number; item: MegaMenuItem }>) {
            const { sectionIndex, item } = action.payload;
            if (state.megamenu.megamenu[sectionIndex]) {
                state.megamenu.megamenu[sectionIndex].items.push(item);
            }
        },
        removeMegaMenuItem(state, action: PayloadAction<{ sectionIndex: number; itemIndex: number }>) {
            const { sectionIndex, itemIndex } = action.payload;
            if (state.megamenu.megamenu[sectionIndex]) {
                state.megamenu.megamenu[sectionIndex].items.splice(itemIndex, 1);
            }
        },
        updateMegaMenuSection(state, action: PayloadAction<{ sectionIndex: number; updatedSection: MegaMenuSection }>) {
            const { sectionIndex, updatedSection } = action.payload;
            if (state.megamenu.megamenu[sectionIndex]) {
                state.megamenu.megamenu[sectionIndex] = updatedSection;
            }
        },
        updateMegaMenuSections(state, action: PayloadAction<MegaMenu>) {
            state.megamenu = action.payload

        },
        removeMegaMenuSection(state, action: PayloadAction<number>) {
            state.megamenu.megamenu.splice(action.payload, 1);
        },
        setMenuItems(state, action: PayloadAction<MenuItem[]>) {
            state.menuItems = action.payload;
        },
        removeMenuItem(state, action: PayloadAction<{ name: string; url: string }>) {
            state.menuItems = state.menuItems.filter(item => !(item.name === action.payload.name && item.url === action.payload.url));
        },
        resetMenuItems(state) {
            state.menuItems = [];
        },
    },
});

export const {
    setMenuItems,
    setColorPalette,
    updateMenuItems,
    removeMenuItem,
    resetMenuItems,
    updateMegaMenuName,
    setMegaMenuSections,
    addMegaMenuSection,
    addMegaMenuItem,
    removeMegaMenuItem,
    updateMegaMenuSection,
    removeMegaMenuSection,
    updateMegaMenuSections
} = menuSlice.actions;

export default menuSlice.reducer;
