export const formatDateDMY = (date: Date) => Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
}).format(date);
