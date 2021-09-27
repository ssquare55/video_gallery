import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import contentSlice from './contentSlice'
import wishlistSlice from './wishlistSlice'

export const store = configureStore({
    reducer: {
        user: userSlice,
        content: contentSlice,
        wishlist: wishlistSlice,
    }
})