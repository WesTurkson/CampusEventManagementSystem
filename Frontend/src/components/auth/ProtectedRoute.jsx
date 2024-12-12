// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to='/login' replace />;
//   }

//   return children;
// };


import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (allowedRoles && !allowedRoles.includes(user.role)) {
      navigate('/'); // Redirect to home if user doesn't have required role
    }
  }, [user, navigate, allowedRoles]);

  return user ? children : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
