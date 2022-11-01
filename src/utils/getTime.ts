
//function get time in seconds and return a string with the time in format hh:mm:ss
export function getTime(seconds: number): string {
    const date = new Date(0);
    date.setSeconds(seconds);
    const timeString = date.toISOString().substr(11, 8);
    return timeString;
}