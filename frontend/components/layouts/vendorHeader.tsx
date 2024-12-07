'use client';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { IRootState } from '@/store';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { usePathname, useRouter } from 'next/navigation';
import { addVendor } from '@/store/vendorSlice';
import logo from '@/assets/images/logo.webp';
import IconCaretsDown from '@/icon/icon-carets-down';
import Profile from './Profile';

export function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        // Use optional chaining and nullish coalescing to handle potential undefined
        const cookieValue = parts.pop()?.split(';').shift() ?? '';
        return cookieValue;
    }
    return undefined;
}

const VendorHeader = () => {
    const pathname = usePathname();
    // console.log(trimpath);
    const pathSegments = pathname.split('/');
    const secondSegment = pathSegments?.[2];
    const [isFetched, setIsFetched] = useState(false);
    const router = useRouter();

    const dispatch = useDispatch();

    const handleSidebarToggle = () => {
        dispatch(toggleSidebar());
    };

    const deleteCookie = (name = 'bappaSagartech') => {
        // Set the cookie's value to an empty string and its expiration date to a time in the past
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Alert the user that the cookie has been deleted

        router.push('/admin-login');
    };

    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }

            let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
            for (let i = 0; i < allLinks.length; i++) {
                const element = allLinks[i];
                element?.classList.remove('active');
            }
            selector?.classList.add('active');

            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [pathname]);

    const fetchVendorLogin = async () => {
        // await delayVendorBy5Sec()
        // Retrieve the token from the cookies
        const token = getCookie('bappaSagartech');

        // Include the Bearer token in the request header and send a POST request
        const res = await fetch(`${process.env.ADMINURL}/api/getbappaLoginDetails`, {
            method: 'POST', // Specify the method as POST
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
                Authorization: `Bearer ${token}`, // Include the Bearer token in the Authorization header
            },
        });

        if (!res.ok) {
            deleteCookie('bappaSagartech');
            return; // Stop further execution if the response is not ok
        }

        if (res.ok) {
            const data = await res.json();
            // Dispatch the vendor data to the state
            dispatch(addVendor(data?.data));
        }
    };

    useEffect(() => {
        // Call fetchVendorLogin only if it hasn't been called yet
        if (!isFetched) {
            fetchVendorLogin();
            setIsFetched(true); // Set the flag to true after the first call
        }
    }, [pathname, isFetched]); // Adding isFetched to the dependency array ensures it runs only once.

    const vendorData: any = useSelector((state: IRootState) => state.vendorSlice);

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className={`flex h-16 w-full items-center justify-between rounded-br-lg bg-white py-2.5 pr-2 dark:bg-white md:flex-wrap md:px-5 md:pr-4`}>
                    <div className=" horizontal-logo flex items-center gap-10 lg:hidden">
                        <Link href="/" className="main-logo hidden shrink-0  items-center md:block">
                            <img width={60} className="" src={logo.src} alt="" />
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon bg-white-light/40p-2 hover:bg-whie-light/90 flex flex-none rounded-full hover:text-primary dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden ltr:ml-2 rtl:mr-2"
                            onClick={handleSidebarToggle}
                        >
                            <IconCaretsDown className="h-5 w-5 -rotate-90 text-black" />
                        </button>
                    </div>
                    <div className="hidden lg:block"> </div>

                    <div className="mr-2  sm:block md:mr-10 rtl:ml-2">
                        <div className="flex items-center">
                            <div
                                // onClick={handleSearchToggle}
                                className="flex h-8 w-60 "
                            >
                                {/* <div className="flex items-center">
                                    <IoIosSearch style={{ color: 'white' }} className="mr-1" />
                                    <p>Search</p>
                                </div>
                                <div className="hidden items-center md:flex">
                                    <p className="mr-2 flex h-5 items-center rounded-sm bg-gray-900 px-2 text-xs">CTRL</p>
                                    <p className="mr-2 flex h-5 items-center rounded-sm bg-gray-900 px-2 text-xs">K</p>
                                </div> */}
                                {/* <HeaderSearchBar /> */}
                            </div>
                            {/* {searchBarToggled && <SearchBar ref={searchBarRef} />} */}
                        </div>
                    </div>
                    <div className="flex items-center dark:text-[#d0d2d6] ">
                        <div className="ml-4">
                            <Profile vendorData={vendorData} store={secondSegment} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default VendorHeader;
