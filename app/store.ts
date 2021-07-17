import {
    Action,
    combineReducers,
    configureStore,
    Store,
    ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
//import {persistReducer} from "redux-persist";
import { taskSlice } from "../features/task/taskSlice";
import { userSlice } from "../features/user/userSlice";
// import storage from 'redux-persist/lib/storage';
// import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist/es/constants";
// import {persistStore} from "redux-persist";

// const rootReducer = combineReducers({
//     task: taskSlice.reducer,
//     user: userSlice.reducer,
//   })

//   const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
//   }

//   const persistedReducer = persistReducer(persistConfig, rootReducer)

const makeStore = () =>
    configureStore({
        reducer: {
            task: taskSlice.reducer,
            user: userSlice.reducer,
        },
    });

// const makeStore = () =>
//     configureStore({
//         reducer: persistedReducer,
//         middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//         serializableCheck: {
//             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//         }),
//     });

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore);
// export const persistVal: any = {
//     persistStore: persistStore(store)
// }
export default store;
