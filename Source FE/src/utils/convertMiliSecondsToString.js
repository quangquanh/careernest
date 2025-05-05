import { format } from 'date-fns';

export const convertMillisecondsToString = (timestamp) => {
    if (!timestamp) return '';
    try {
        const date = new Date(timestamp);
        return format(date, 'dd/MM/yyyy');
    } catch (error) {
        console.error('Error converting timestamp:', error);
        return '';
    }
};
