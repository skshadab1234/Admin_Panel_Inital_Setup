'use client';

import ContentAnimation from '@/components/layouts/content-animation';
import MainContainer from '@/components/layouts/main-container';
import Overlay from '@/components/layouts/overlay';
import ScrollToTop from '@/components/layouts/scroll-to-top';
import VendorHeader from '@/components/layouts/vendorHeader'; // VendorHeader dispatches vendor data
import VendorSidebar from '@/components/layouts/vendorSidebar';
import { usePathname } from 'next/navigation';
import Template from './template';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import NextTopLoader from 'nextjs-toploader';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const sidebar = useSelector((state: IRootState) => state.themeConfig.sidebar);
 
    return (
        <>
            {/* BEGIN MAIN CONTAINER */}
            <div className="relative">
                <NextTopLoader color="#758694" />
                {!pathname.includes('/bulk') ? (
                    <>
                        <Overlay />
                        <ScrollToTop />

                        {pathname === '/vendor/allstore' ? (
                            <ContentAnimation>{children}</ContentAnimation>
                        ) : (
                            <MainContainer>
                                <VendorHeader />

                                {/* BEGIN SIDEBAR */}
                                <VendorSidebar />
                                {/* END SIDEBAR */}
                                <div className={`main-content ${sidebar ? '!ml-0' : '!md:ml-[250px]'} relative flex min-h-screen flex-col rounded-tr-lg`}>
                                    {/* BEGIN CONTENT AREA */}
                                    <ContentAnimation>
                                        {/* Check if vendor is loaded and then determine if the route is allowed */}
                                        <Template key={pathname}>{children}</Template>
                                    </ContentAnimation>
                                </div>
                            </MainContainer>
                        )}
                    </>
                ) : (
                    children
                )}
            </div>
        </>
    );
}
