import { useEffect } from 'react';

const usePageFocusEffect = (callback: () => void) => {
    useEffect(() => {
        const handleFocus = () => {
            callback();
        };

        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [callback]);
};

export default usePageFocusEffect;
