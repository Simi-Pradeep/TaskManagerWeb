import {
    add,
    format,
    isBefore,
    isEqual,
    isPast,
    isSameDay,
    parse,
    sub,
} from "date-fns";
import { DATE_FORMAT_DD_MM_YYYY, DATE_FORMAT_YYYY_MM_DD } from "./constants";
import * as uuid from "uuid";

export function isEmpty(value: any | Array<any> | null | undefined): boolean {
    if (!value) return true;
    if (Array.isArray(value)) return value.length > 0 ? false : true;
    return false;
}

export function isNotEmpty(
    value: any | Array<any> | null | undefined
): boolean {
    if (!value) return false;
    if (Array.isArray(value)) return value.length > 0 ? true : false;
    return true;
}

export function parseDate(dateVal: Date) {
    let newDate = new Date();
    console.log("Date ------------------->>>", format(dateVal, "dd-MM-yyy"));
    return parse(format(dateVal, "dd-MM-yyy"), "dd-MM-yyyy", newDate);
}

export function convertDateToServerFormat(dateVal: Date) {
    return format(dateVal, DATE_FORMAT_YYYY_MM_DD);
}

export function getTodaysDateAsString() {
    return format(getTodaysDate(), DATE_FORMAT_YYYY_MM_DD);
}

export function getTomorrowsDateAsString() {
    return format(getTomorrowDate(), DATE_FORMAT_YYYY_MM_DD);
}

export function getTodaysDate() {
    return new Date();
}

export function getYesterdaysDate() {
    return sub(new Date(), { days: 1 });
}

export function getTomorrowDate() {
    return add(new Date(), { days: 1 });
}

export function getDateAfterTomorrowDate() {
    return add(new Date(), { days: 2 });
}

export function getStringAsDate(dateVal: string) {
    const newDate: Date = new Date();
    return parse(dateVal, DATE_FORMAT_YYYY_MM_DD, newDate);
    //return newDate;
}

export function isToday(dateVal: string) {
    //return true;
    return isSameDay(getTodaysDate(), getStringAsDate(dateVal));
}

export function isOldDate(dateVal: string) {
    //return isPast(getStringAsDate(dateVal));
    return isBefore(
        getStringAsDate(dateVal),
        getStringAsDate(getTodaysDateAsString())
    );
}

export function isTomorrow(dateVal: string) {
    return isSameDay(getTomorrowDate(), getStringAsDate(dateVal));
}

export function getRandomUUIDString() {
    return uuid.v4();
}
