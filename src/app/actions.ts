import { createAction } from "@reduxjs/toolkit"

export const CONNECT = 'CONNECT'
export const DISCONNECT = 'DISCONNECT'

export const connect = createAction(CONNECT, (payloadValue) => ({payload: payloadValue}))
export const disconnect = createAction(DISCONNECT)