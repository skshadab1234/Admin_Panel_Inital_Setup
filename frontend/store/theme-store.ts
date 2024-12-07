import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface for a single theme template
interface ThemeTemplate {
    template_id: number;
    template_name: string;
    template_image: string;
    template_description: string;
    template_created_at: string;
    template_updated_at: string;
    template_changes: string;
    template_links: [];
    template_install_command: string;
    preview_url: string;
}

// Interface for the theme store's state
interface ThemeStoreState {
    selectedTemplate: ThemeTemplate | null;
    loading: boolean;
    themeList: ThemeTemplate[];
}

const themeStore = createSlice({
    name: 'theme_store',
    initialState: {
        selectedTemplate: null,
        loading: false,
        themeList: [],
    } as ThemeStoreState, // Applying the ThemeStoreState type
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setThemeList(state, action: PayloadAction<ThemeTemplate[]>) {
            state.themeList = action.payload;
        },
        updateSelectedTemplate(state, action: PayloadAction<ThemeTemplate | null>) {
            state.selectedTemplate = action.payload;
            state.loading = false;
        },
    },
});

export const { setLoading, updateSelectedTemplate, setThemeList } = themeStore.actions;

export default themeStore.reducer;
