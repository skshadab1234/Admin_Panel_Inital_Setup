import { IconType } from 'react-icons';
import { FaStore } from 'react-icons/fa6';
import { PiNotepadBold } from 'react-icons/pi';
import { HiOutlineTableCells } from 'react-icons/hi2';
import { FileIcon, PlanIcon, StoreIcon } from '@shopify/polaris-icons';

interface SubItem {
    id: number;
    heading: string;
    path: string;
}

interface SettingItem {
    id: number;
    heading: string;
    icon: IconType;
    path: string;
    subItems?: SubItem[];
}
const settingData = {
    settingDatas: [
        {
            id: 1,
            heading: 'General',
            icon: StoreIcon,
            path: 'general',
        },

        {
            id: 2,
            heading: 'Plan',
            icon: PlanIcon,
            path: 'plan',
        },
        {
            id: 3,
            heading: 'Policies',
            icon: FileIcon,
            path: 'policies',
        },

        // {
        //     id: 5,
        //     heading: 'Billing',
        //     icon: FaProjectDiagram,
        //     path: '#',
        // },
        // {
        //     id: 6,
        //     heading: 'Documents',
        //     icon: IoDocumentText,
        //     path: 'docs',
        // },

        // {
        //     id: 9,
        //     heading: 'Products',
        //     icon: IoPricetag,
        //     path: 'products',
        // },
        // {
        //     id: 10,
        //     heading: 'Customers',
        //     icon: FaUser,
        //     path: 'customers',
        // },

        // { id: 11, heading: 'Discounts', icon: CiDiscount1, path: 'discounts' },
    ] as SettingItem[],
};

export default settingData;
