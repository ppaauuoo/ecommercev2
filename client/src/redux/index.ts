import { configureStore } from "@reduxjs/toolkit"
import { cartTotalSlice } from "./cartTotalSlice"



const store = configureStore({
    reducer: { //merge all reducers
        cartTotal: cartTotalSlice.reducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store
