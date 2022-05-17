const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const getMonth = (type="num") => {

    const localDate = new Date();
    return type === "num" ?  localDate.getMonth() : months[localDate.getMonth()];
    
}