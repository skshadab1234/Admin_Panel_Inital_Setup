import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ProviderComponent from '@/components/layouts/provider-component';

export const Adminurl = process.env.ADMINURL;

// This is Siyahfy project metadata
export const metadata: Metadata = {
    title: {
        template: '%s | Bappamajhalaadka',
        default: 'Bappamajhalaadka',
    },
};

const inter = Inter({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['greek'],
    display: 'swap',
    variable: '--font-inter',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.variable} suppressHydrationWarning={true}>
                <ProviderComponent>{children}</ProviderComponent>
            </body>
        </html>
    );
}
