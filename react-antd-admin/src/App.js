import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDataSource } from './store/reducers/dataSourceSlice'
import _ from "lodash";
import User from "./pages/setting/user/index";
import Business from "./pages/business/product/index";
import OverView from "./pages/business/overview/index";
import HomeDiv from "./pages/HomeDiv";
import Home from "./pages/Home";
import Menu from "./pages/setting/menu/index"
import LoginPage from './pages/login/index'
const Page404 = () => <div>404 Not Found</div>;

function App() {

  const dispatch = useDispatch()
  const dataSource = useSelector(state => state.dataSource.dataSource);



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomeDiv />}>
            <Route index element={<Home />} />
            <Route path="/setting/menu" element={<Menu />} />
            <Route path="/setting/user" element={<User />} />
            <Route path="/business/product" element={<Business />} />
            <Route path="/business/overview" element={<OverView />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;













