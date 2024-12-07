import { IconType } from 'react-icons';
import {
    HomeFilledIcon,
    HomeIcon,
    PersonFilledIcon,
    PersonIcon,
} from '@shopify/polaris-icons';

interface SubItem {
    id: number;
    disabled: boolean;
    heading: string;
    path: any;
}

interface SliderItem {
    id: number;
    heading: any;
    disabled: boolean;
    icon: IconType;
    selected: IconType;
    path: string;
    subItems?: SubItem[];
}
const sidebarData = [
    {
        id: 1,
        heading: 'Dashboard',
        icon: HomeIcon,
        selected: HomeFilledIcon,
        path: '/admin',
    },
    {
        id: 2,
        heading: 'Users',
        icon: PersonIcon,
        selected: PersonFilledIcon,
        path: '/admin/users',
    },

] as SliderItem[];

export { sidebarData };
