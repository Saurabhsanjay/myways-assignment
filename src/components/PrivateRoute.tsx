import  { ReactNode } from "react";
import { Navigate } from "react-router-dom";




interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth: string | null = localStorage.getItem("token");

  if (!auth) {
    alert("Please login first");
    return (
      <>
       <Navigate to='/products' />
      </>
    );
  }

  
  return <>{children}</>;
};

export default PrivateRoute;
