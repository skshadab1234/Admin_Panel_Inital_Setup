import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import modalslice from './modal';
import currency from './currency';
import storeVendor from './storeVendor';
import menuslice from './menuSlice';
import themeStore from './theme-store';
import vendorSlice from './vendorSlice'
const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    modal: modalslice,
    currency,
    storeVendor,
    menuslice,
    themeStore,
    vendorSlice
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
