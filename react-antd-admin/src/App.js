import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import _ from "lodash";
const User = React.lazy(() => import("./pages/setting/user/index"));
const Business = React.lazy(() => import("./pages/business/product/index"));
const OverView = React.lazy(() => import("./pages/business/overview/index"));
const HomeDiv = React.lazy(() => import("./pages/HomeDiv"));
const Home = React.lazy(() => import("./pages/Home"));
const Menu = React.lazy(() => import("./pages/setting/menu/index"));
const LoginPage = React.lazy(() => import("./pages/login/index"));
const Page404 = () => <div>404 Not Found</div>;
function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div><h1>加载中...</h1></div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <Suspense fallback={<div><h1>加载中...</h1></div>}>
                  <HomeDiv />
                </Suspense>
              }
            >
              <Route index element={<Home />} />
              <Route path="/setting/menu" element={<Menu />} />
              <Route path="/setting/user" element={<User />} />
              <Route path="/business/product" element={<Business />} />
              <Route path="/business/overview" element={<OverView />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;














