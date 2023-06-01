// create exact time / for example (00:00)
let today = new Date();
let hour = today.getHours();
if(hour < 10){
    hour = `0${hour}`
};
let minutes = today.getMinutes();
if(minutes < 10){
    minutes = `0${minutes}`
};
export let time = hour + ":" + minutes;

// craete exact day / for example (01.01.2023)
let month = today.getMonth() + 1;
if (month < 10) {
    month = `0${month}`
};
export let day = today.getDate() + "." + month + "." + today.getFullYear();
