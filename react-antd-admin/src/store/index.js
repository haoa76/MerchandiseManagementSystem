import { configureStore } from "@reduxjs/toolkit";
// import { thunk } from "redux-thunk"; // 注意：Redux Toolkit 已默认包含 thunk，无需手动导入！
import addSlice from './reducers/addSlice'
import dataSourceSlice from "./reducers/dataSourceSlice";
import  userInfoSlice  from "./reducers/userInfoSlice";

const store = configureStore({
    reducer: {
        add: addSlice,
        dataSource: dataSourceSlice,
        userInfo:userInfoSlice
    },
    // middleware: (getDefaultMiddleware) => [
    //     ...getDefaultMiddleware(), // 保留默认中间件（包含 thunk）
    //     // 如果需要其他中间件（如日志），在此追加
    // ],
    devTools: true, // 启用 DevTools方便查看变化
});

export default store;