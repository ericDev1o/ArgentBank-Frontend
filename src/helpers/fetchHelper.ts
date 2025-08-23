type ThunkApi = {
  rejectWithValue: (value: any) => any;
}

/**
 * @param response of awaited fetch
 * @param slice connect or profile
 * @param thunkApi 
 */
export default async function fetchThunkResp(
    response: Response,
    slice: string,
    thunkApi: ThunkApi
) {
    if(response.ok){
        const data = await response.json()
        if(slice === 'profile')
            return data?.body
        else if (slice === 'connect')
            return data?.body?.token
    }
    else if(response.status == 400) {
        const credError = await response.json()
        return thunkApi.rejectWithValue(credError?.message)
    }
    else if(response.status == 500) {
        const servError = await response.json()
        return thunkApi.rejectWithValue(servError?.message)
    }
    else return thunkApi.rejectWithValue('Connection error')
}