'use client';
import { IRootState } from '@/store';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ContentAnimation = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const [animation, setAnimation] = useState(themeConfig.animation);

    useEffect(() => {
        setAnimation(themeConfig.animation);
    }, [themeConfig.animation]);

    useEffect(() => {
        setAnimation(themeConfig.animation);
        setTimeout(() => {
            setAnimation('');
        }, 1100);
    }, [pathname]);
    return (
        <>
            {/* BEGIN CONTENT AREA */}
            <div id="pageScroll" style={{ scrollbarWidth: 'thin' }} className={`${pathname != '/vendor/allstore' && ' h-[92vh] overflow-y-auto'}`}>
                <div className={`${animation} ${pathname != '/vendor/allstore' && 'px-3 md:px-10 py-2'} rounded-lg animate__animated `}>
                    {children}
                    {/* h-[92vh] overflow-y-scroll */}
                </div>
            </div>
            {/* END CONTENT AREA */}
        </>
    );
};

export default ContentAnimation;
