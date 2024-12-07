import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';

import { usePathname } from 'next/navigation';
import { sidebarData } from '@/data/sidebarData';
import '../../styles/style.css';
import { IconType } from 'react-icons';
import { Icon } from '@shopify/polaris';
import logo from '@/assets/images/logo.webp';
import IconCaretsDown from '@/icon/icon-carets-down';

interface SubItem {
    id: number;
    heading: string;
    path: string;
}

interface SliderItem {
    id: number;
    heading: string;
    icon: IconType;
    selected: IconType;
    path: string;
    subItems?: SubItem[];
}

const VendorSidebar = () => {
    const dispatch = useDispatch();
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const pathname = usePathname();

    const [openMenus, setOpenMenus] = useState<number[]>([]);
    const [activePath, setActivePath] = useState(pathname);

    useEffect(() => {
        setActivePath(pathname);
    }, [pathname]);

    const handleSidebarToggle = () => {
        dispatch(toggleSidebar());
    };

    const toggleSubmenu = (id: number) => {
        setOpenMenus((prev) => (prev.includes(id) ? prev.filter((menuId) => menuId !== id) : [...prev, id]));
    };

    const isActive = (path: string) => {
        const fullPath = `/${path}`;
        return activePath === fullPath || (activePath === `/admin` && path === `/admin`);
    };

    const isSubItemActive = (subItems?: SubItem[]) => {
        return subItems?.some((subItem) => isActive(subItem.path));
    };

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav className={`sidebar fixed bottom-0 top-0 z-50 h-full w-[250px] bg-[#fff] shadow-md transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}>
                <div className="bg-[#fffff] dark:bg-black">
                    <div className="flex items-center justify-between gap-10 px-4 py-2 text-white bg-white">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <img width={74} src={logo.src} alt="Logo" className="relative left-3" />
                        </Link>

                        <button onClick={handleSidebarToggle} className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10">
                            <IconCaretsDown className="m-auto rotate-90 text-black" />
                        </button>
                    </div>
                    <ul className="custom-scrollbar relative max-h-[calc(100vh-60px)] space-y-0.5 overflow-y-auto  p-4 py-0 pt-5">
                        {sidebarData.map((item, index) => (
                            <li key={index} className={`mb-1 py-1 ${isActive(item.path) || isSubItemActive(item.subItems) ? 'bg-gray-100 ' : ''} rounded-lg`}>
                                <div
                                    className={`flex w-full items-center rounded-md ${isActive(item.path) || isSubItemActive(item.subItems) ? ' ' : 'hover:bg-gray-200'} rounded-lg`}
                                    onClick={() => item.subItems && toggleSubmenu(item.id)}
                                >
                                    {!isActive(item.path) ? (
                                        <Link href={`${item.path}`}>
                                            <div className={`flex items-center gap-3 px-3 py-1 ${isActive(item.path) ? 'text-black' : 'text-[#555]'}`}>
                                                <Icon source={isActive(item.path) ? item.selected : item.icon} />
                                                {item.heading}
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className={`flex items-center gap-3 px-3 py-1 text-black cursor-pointer`}>
                                            <Icon source={item.selected} />
                                            {item.heading}
                                        </div>
                                    )}
                                    {item.subItems && <IconCaretsDown className={`ml-auto transform transition-transform duration-300 ${openMenus.includes(item.id) ? 'rotate-180' : ''}`} />}
                                </div>
                                {item.subItems && (
                                    <ul className={`overflow-hidden transition-all duration-300 ease-in-out ${openMenus.includes(item.id) ? 'max-h-96' : 'max-h-0'}`}>
                                        {item.subItems.map((subItem, subindex) => (
                                            <li key={`${subindex}-subitem`} className={`mb-1 ml-10 cursor-pointer rounded-md px-2 py-1 ${isActive(subItem.path) ? 'bg-gray-100' : ''}`}>
                                                {!isActive(subItem.path) ? (
                                                    <Link href={`/${subItem.path}`} className={` ${isActive(subItem.path) ? 'text-black' : 'text-[#555]'} text-xs `}>
                                                        {subItem.heading}
                                                    </Link>
                                                ) : (
                                                    <span className="text-black text-xs cursor-pointer">{subItem.heading}</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default VendorSidebar;
