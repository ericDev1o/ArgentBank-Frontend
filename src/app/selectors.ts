import { useSelector } from 'react-redux';

import { RootState } from '@/app/types'

export function getToken() {
    return useSelector((state: RootState) => state?.connect?.token)
}

export function getFirstName() {
    return useSelector((state: RootState) => state?.profile?.firstName)
}

export function getLastName() {
    return useSelector((state: RootState) => state?.profile?.lastName)
}

export function getUserName() {
    return useSelector((state: RootState) => state?.profile?.userName)
}