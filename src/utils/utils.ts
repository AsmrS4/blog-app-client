export const dateTimeFormatter = (datetime: string | null | undefined): string | null => {
    if(datetime) {
        let [date, time] = datetime && datetime.slice(0,16).split('T');
        date = date.split('-').reverse().join('.');
        return date + ' ' + time;
    }
    return null;
}