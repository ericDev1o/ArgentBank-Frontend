import { useSelector } from "react-redux";

import { State } from "./types";

export function getToken() {
    return useSelector((state: State) => state?.connect?.token)
}

/**
 * This selector is currently for 
 * ../features/getProfile/getProfileSlice.ts getProfileThunk(token) testing purpose only
 * @returns the user id
 */
export function getId() {
    return useSelector((state: State) => state?.profile?.id)
}

/**
 * This selector is currently for 
 * ../features/getProfile/getProfileSlice.ts getProfileThunk(token) testing purpose only
 * @returns the user email
 */
export function getEmail() {
    return useSelector((state: State) => state?.profile?.email)
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