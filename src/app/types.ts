export type State = {
    token: string | null
}

export type Action = 
| {type:'CONNECT', payload: string}
| {type:'DISCONNECT'}