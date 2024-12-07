import 'swiper/css';
import 'swiper/css/navigation';
import Swal from 'sweetalert2';

export const showToast = (message: string, type = "info") => {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: type, // success, error, info
        title: message,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast: any) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    } as any);
};

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

export const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
};

export const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

export const formatNumber = (number: number) => {
    return new Intl.NumberFormat('en-US').format(number);
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    // Zero out the time parts for comparison
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const daysDifference = Math.floor((nowOnly.getTime() - dateOnly.getTime()) / (1000 * 60 * 60 * 24));
    const weeksDifference = Math.floor(daysDifference / 7);

    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Use 12-hour clock (AM/PM)
    };

    if (daysDifference === 0) {
        return `Today at ${date.toLocaleTimeString(undefined, options)}`;
    } else if (daysDifference === 1) {
        return `Yesterday at ${date.toLocaleTimeString(undefined, options)}`;
    } else if (weeksDifference > 0) {
        return `${weeksDifference} week${weeksDifference > 1 ? 's' : ''} ago`;
    } else if (daysDifference > 0) {
        return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) + ' at ' + date.toLocaleTimeString(undefined, options);
    }
};

export const generateSlug = (name: string) => {
    return name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};


export const showMessage = (msg = '', type = 'success') => {
    const toast: any = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        customClass: { container: 'toast' },
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
};


export const currencies = [
    { currency: 'United States Dollar', code: 'USD', symbol: '$', exchangeRate: 1.0 },
    { currency: 'Euro', code: 'EUR', symbol: '€', exchangeRate: 0.85 },
    { currency: 'Japanese Yen', code: 'JPY', symbol: '¥', exchangeRate: 110.0 },
    { currency: 'British Pound', code: 'GBP', symbol: '£', exchangeRate: 0.75 },
    { currency: 'Canadian Dollar', code: 'CAD', symbol: 'C$', exchangeRate: 1.25 },
    { currency: 'Australian Dollar', code: 'AUD', symbol: 'A$', exchangeRate: 1.35 },
    { currency: 'Swiss Franc', code: 'CHF', symbol: 'CHF', exchangeRate: 0.92 },
    { currency: 'Chinese Yuan', code: 'CNY', symbol: '¥', exchangeRate: 6.45 },
    { currency: 'Indian Rupee', code: 'INR', symbol: '₹', exchangeRate: 83.96 },
    { currency: 'Mexican Peso', code: 'MXN', symbol: '$', exchangeRate: 20.0 },
    { currency: 'Russian Ruble', code: 'RUB', symbol: '₽', exchangeRate: 74.0 },
    { currency: 'Brazilian Real', code: 'BRL', symbol: 'R$', exchangeRate: 5.3 },
    { currency: 'South African Rand', code: 'ZAR', symbol: 'R', exchangeRate: 14.5 },
    { currency: 'South Korean Won', code: 'KRW', symbol: '₩', exchangeRate: 1150.0 },
    { currency: 'Saudi Riyal', code: 'SAR', symbol: 'ر.س', exchangeRate: 3.75 },
    { currency: 'Turkish Lira', code: 'TRY', symbol: '₺', exchangeRate: 8.5 },
    { currency: 'Indonesian Rupiah', code: 'IDR', symbol: 'Rp', exchangeRate: 14200.0 },
    { currency: 'New Zealand Dollar', code: 'NZD', symbol: 'NZ$', exchangeRate: 1.4 },
    { currency: 'Singapore Dollar', code: 'SGD', symbol: 'S$', exchangeRate: 1.35 },
    { currency: 'Hong Kong Dollar', code: 'HKD', symbol: 'HK$', exchangeRate: 7.8 },
    { currency: 'Norwegian Krone', code: 'NOK', symbol: 'kr', exchangeRate: 8.7 },
    { currency: 'Swedish Krona', code: 'SEK', symbol: 'kr', exchangeRate: 8.6 },
    { currency: 'shadab Krone', code: 'DKK', symbol: 'kr', exchangeRate: 6.3 },
    { currency: 'Polish Zloty', code: 'PLN', symbol: 'zł', exchangeRate: 3.8 },
    { currency: 'Thai Baht', code: 'THB', symbol: '฿', exchangeRate: 33.0 },
    { currency: 'Malaysian Ringgit', code: 'MYR', symbol: 'RM', exchangeRate: 4.2 },
    { currency: 'Philippine Peso', code: 'PHP', symbol: '₱', exchangeRate: 50.0 },
    { currency: 'Vietnamese Dong', code: 'VND', symbol: '₫', exchangeRate: 23000.0 },
    { currency: 'Nigerian Naira', code: 'NGN', symbol: '₦', exchangeRate: 410.0 },
    { currency: 'Pakistani Rupee', code: 'PKR', symbol: '₨', exchangeRate: 160.0 },
    { currency: 'Bangladeshi Taka', code: 'BDT', symbol: '৳', exchangeRate: 85.0 },
    { currency: 'Egyptian Pound', code: 'EGP', symbol: '£', exchangeRate: 15.7 },
    { currency: 'Argentine Peso', code: 'ARS', symbol: '$', exchangeRate: 98.0 },
    { currency: 'Chilean Peso', code: 'CLP', symbol: '$', exchangeRate: 760.0 },
    { currency: 'Colombian Peso', code: 'COP', symbol: '$', exchangeRate: 3800.0 },
    { currency: 'Peruvian Sol', code: 'PEN', symbol: 'S/', exchangeRate: 4.1 },
    { currency: 'Iraqi Dinar', code: 'IQD', symbol: 'ع.د', exchangeRate: 1460.0 },
    { currency: 'Israeli New Shekel', code: 'ILS', symbol: '₪', exchangeRate: 3.2 },
    { currency: 'Kazakhstani Tenge', code: 'KZT', symbol: '₸', exchangeRate: 425.0 },
    { currency: 'Kenyan Shilling', code: 'KES', symbol: 'Sh', exchangeRate: 108.0 },
    { currency: 'Kuwaiti Dinar', code: 'KWD', symbol: 'د.ك', exchangeRate: 0.3 },
    { currency: 'Sri Lankan Rupee', code: 'LKR', symbol: 'Rs', exchangeRate: 200.0 },
    { currency: 'Qatari Riyal', code: 'QAR', symbol: 'ر.ق', exchangeRate: 3.64 },
    { currency: 'Romanian Leu', code: 'RON', symbol: 'lei', exchangeRate: 4.1 },
    { currency: 'Ukrainian Hryvnia', code: 'UAH', symbol: '₴', exchangeRate: 27.0 },
    { currency: 'Hungarian Forint', code: 'HUF', symbol: 'Ft', exchangeRate: 300.0 },
    { currency: 'Icelandic Krona', code: 'ISK', symbol: 'kr', exchangeRate: 130.0 },
    { currency: 'Jordanian Dinar', code: 'JOD', symbol: 'د.ا', exchangeRate: 0.71 },
    { currency: 'Lebanese Pound', code: 'LBP', symbol: 'ل.ل', exchangeRate: 1500.0 },
    { currency: 'Moroccan Dirham', code: 'MAD', symbol: 'د.م.', exchangeRate: 9.0 },
    { currency: 'Omani Rial', code: 'OMR', symbol: 'ر.ع.', exchangeRate: 0.38 },
    { currency: 'Serbian Dinar', code: 'RSD', symbol: 'дин.', exchangeRate: 100.0 },
    { currency: 'Tunisian Dinar', code: 'TND', symbol: 'د.ت', exchangeRate: 2.8 },
    { currency: 'Uruguayan Peso', code: 'UYU', symbol: '$', exchangeRate: 43.0 },
    { currency: 'Venezuelan Bolivar', code: 'VES', symbol: 'Bs.', exchangeRate: 4.1 },
    // Add more currencies as needed
];

export function formatDateTime(date: string | number | Date, locale: string = 'en-US', options?: Intl.DateTimeFormatOptions): string {
    const dateObject = new Date(date);

    const defaultOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        year: 'numeric',
        month: 'short',
    };

    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options })?.format(dateObject);
}

export function getInitials(name: string): string {
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase(); // If only one part, return first letter
    }
    const firstInitial = nameParts[0].charAt(0).toUpperCase();
    const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
}
