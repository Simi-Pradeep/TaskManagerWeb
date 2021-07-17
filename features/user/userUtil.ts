import Cookies from "js-cookie";
import { User } from "./userModels";
const USER_COOKIE_KEY = "userSession";

export function addUserInfoToCookie(user: User) {
    Cookies.set(USER_COOKIE_KEY, JSON.stringify(user));
}

export function removeUserInfoFromCookie() {
    Cookies.remove(USER_COOKIE_KEY);
}

export function isAthourized() {
    return Cookies.get(USER_COOKIE_KEY) ? true : false;
}
