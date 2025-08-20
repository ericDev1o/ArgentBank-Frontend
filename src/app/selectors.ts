import { useSelector } from "react-redux";

import { State } from "./types";

export function getToken() {
    return useSelector((state: State) => state?.token)
}