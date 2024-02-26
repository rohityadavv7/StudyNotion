import "./App.css";
import Home from "./pages/Home";
import { Route,Routes } from "react-router-dom";
import Navbar from "./components/Common/Navbar";
import Login from "./pages/LogIn";
import Signup from "./pages/SignUp";
import OpenRoute from "./components/core/Auth/OpenRoute"
import ForgotPassword  from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";

function App() {
  const {user} = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter bg-richblack-900">

        <Navbar/>

        <Routes>
          <Route path="/" element={<Home/>}/>

            <Route
                  path="signup"
                  element={
                    <OpenRoute>
                      <Signup />
                    </OpenRoute>
                  }
                />
            <Route
                  path="login"
                  element={
                    <OpenRoute>
                      <Login />
                    </OpenRoute>
                  }
                />

            <Route
                  path="forgot-password"
                  element={
                    <OpenRoute>
                      <ForgotPassword />
                    </OpenRoute>
                  }
                />

            <Route
                  path="verify-email"
                  element={
                    <OpenRoute>
                      <VerifyEmail />
                    </OpenRoute>
                  }
                />

            <Route
                  path="update-password/:id"
                  element={
                    <OpenRoute>
                      <UpdatePassword />
                    </OpenRoute>
                  }
                />

            <Route
                  element={
                    <PrivateRoute>
                        <Dashboard/>
                    </PrivateRoute>
                  }>

                  <Route path="dashboard/my-profile"
                      element={<MyProfile/>}
                  />

                  <Route path="dashboard/enrolled-courses"
                      element={<EnrolledCourses/>}
                  />
                  {
                    user?.accountType === "Student" && (
                      <>
                        <Route
                          path="dashboard/cart"
                          element={<Cart/>}
                        />,

                        <Route
                          path="dashboard/enrolled-courses"
                          element={<EnrolledCourses/>}
                        />
                      </>
                    )
                  }

                   {
                    user?.accountType === "Instructor" && (
                      <>
                        <Route
                          path="dashboard/add-course"
                          element={<AddCourse/>}
                        />
                      </>
                    )
                  }
            </Route>
              

           
        </Routes>
    </div>
  );
}

export default App;
