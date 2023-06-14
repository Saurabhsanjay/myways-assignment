import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const LoginScreen = lazy(() => import("../pages/LoginScreen"));
const Products = lazy(() => import("../pages/Products"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const PrivateRoute = lazy(() => import("../components/PrivateRoute"));

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <LoginScreen />
          </Suspense>
        }
      />

      <Route
        path="/products"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          </Suspense>
        }
      />

      <Route
        path="/product/:id"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute>
              <SingleProduct />
            </PrivateRoute>
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
