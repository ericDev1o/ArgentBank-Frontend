import storage from 'redux-persist/lib/storage'
import { PersistConfig } from 'redux-persist'

import { RootState } from '@/app/types'

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
    whitelist: ['connect']
}

export default persistConfig