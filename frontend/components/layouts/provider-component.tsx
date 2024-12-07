'use client';
import App from '@/App';
import store from '@/store';
import { Provider } from 'react-redux';
// import NextToploader from '../SettingComponets/settings/NextToploader';
import React, { ReactNode, Suspense, useEffect } from 'react';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';

interface IProps {
    children?: ReactNode;
}

const ProviderComponent = ({ children }: IProps) => {
    return (
        <Provider store={store}>
            <Suspense fallback={''}>
                <AppProvider i18n={enTranslations}>
                    {/* <NextToploader /> */}
                    <App>{children} </App>
                </AppProvider>
            </Suspense>
        </Provider>
    );
};

export default ProviderComponent;
