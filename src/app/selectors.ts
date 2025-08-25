import { useSelector } from "react-redux";

import { State } from "./types";

export function getToken() {
    return useSelector((state: State) => state?.connect?.token)
}

export function getFirstName() {
    return useSelector((state: State) => state?.profile?.firstName)
}

export function getLastName() {
    return useSelector((state: State) => state?.profile?.lastName)
}

export function getUserName() {
    return useSelector((state: State) => state?.profile?.userName)
}