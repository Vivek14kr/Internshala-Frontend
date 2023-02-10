import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AgencyRegistration from "./components/Registration/AgencyRegistration";
import UserRegistration from "./components/Registration/UserRegistration";
import UserLogin from "./components/Login/UserLogin";
import AgencyLogin from "./components/Login/AgencyLogin";
import Home from "./components/Home";
import Navbarr from "./components/Navbar";
import AddCars from "./components/CarRental/AddCars";
import CarsAvailable from "./components/CarRental/CarsAvailable";
import BookedCars from "./components/CarRental/BookedCars";
import { loadData } from "./components/localStorage";
import SecondNavbarr from "./components/SecondNav";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "./context/tokenContext";
import { PrivateRoute } from "./components/privateRoute";

function App() {

  let [checktoken, setChecktoken]  = useState(false);

  useEffect(()=>{
    let t = loadData("token")
    if (t){
      setChecktoken(!checktoken)
    }
  }, [])
const { token } = useContext(TokenContext);
console.log("token : ", token)
  return (
    <div className="App">
      {token || checktoken ? <Navbarr /> : <SecondNavbarr />}

      <Routes>
        <Route path="/" element={<CarsAvailable />} />
        <Route
          path="/add-car"
          element={
            <PrivateRoute>
              <AddCars />
            </PrivateRoute>
          }
        />
        <Route
          path="/booked-cars"
          element={
            <PrivateRoute>
              <BookedCars />
            </PrivateRoute>
          }
        />

        <Route path="/agency-register" element={<AgencyRegistration />} />
        <Route path="/user-register" element={<UserRegistration />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/agency-login" element={<AgencyLogin />} />
      </Routes>
    </div>
  );
}

export default App;
