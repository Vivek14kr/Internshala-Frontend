import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

import "./AddCars.css";
import RentCar from './RentCar';
import { loadData } from '../localStorage';
import { Navigate, useNavigate } from 'react-router-dom';
function CarsAvailable() {
     const [modalShow, setModalShow] = useState(false);
     const UserType = loadData("type")
      const [data, setData] = useState([]);
      const [selectedCar, setSelectedCar] = useState();
      const navigate = useNavigate()
      const [widthTotal, setWidth] = useState(window.innerWidth);

      const fetchData = ()=>{
        fetch("https://wild-red-goshawk-tie.cyclic.app/car/all-cars")
          .then((res) => res.json())
          .then((data) => setData(data.cars));
      }

      useEffect(()=>{
        fetchData()
      },[])
      useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    const showModal = (car) => {

      const token = loadData("token" )

      if (token){
setSelectedCar(car);
setModalShow(true);
      }
else {
  navigate("/user-login")
}

       
    };
   
     const TopDiv = {
       color: "white",
       background: "rgba(0, 0, 0, 0.1)",
       border: "1px solid white",
       width: "fit-content",
       margin: "auto",
       marginTop: widthTotal > 500 ? "3%" : "25%",
       padding: "1%",
       borderRadius: "20px",
     };
  return (
    <div
      style={{
        height: "fit-content",
        backgroundImage: `url("https://wallpaperaccess.com/full/1179614.jpg")`,
        padding: "5%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        <h2 style={TopDiv}>Cars Available</h2>
      </div>
      <div>
        <div className="notes">
          {data.map((car, index) => (
            <Card
              style={{
                color: "white",
                background: "rgba(0, 0, 0, 0.6)",
                border: "1px solid white",
              }}
            >
              <Card.Body>
                <Card
                  style={{
                    color: "white",
                    border: "1px solid white",
                    background: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <label>Vehicle Model</label>
                  <Card.Title>{car.vehicleModel}</Card.Title>
                  <label>Vehicle Number</label>

                  <Card.Title>{car.vehicleNumber}</Card.Title>
                </Card>
                <span
                  style={{
                    border: "1px solid white",
                    display: "flex",
                    margin: "auto",
                    textAlign: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <span>
                    <label>Seating Capacity</label>
                    <Card.Title>{car.seatingCapacity}</Card.Title>
                  </span>
                  <span>
                    <label>Rent Per Day</label>
                    <Card.Title>₹{car.rentPerDay}</Card.Title>
                  </span>
                </span>
              </Card.Body>
              <Card.Body
                style={{ margin: "auto", justifyContent: "space-around" }}
              >
                {/* <Button
                variant="primary"
                onClick={() => showModal(car)}
                style={{ backgroundColor: "gray" }}
              >
                Edit
              </Button> */}
                {UserType == "customer" || UserType == undefined? <Button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                  }}
                  onClick={() => {
                    showModal(car);
                  }}
                >
                  Rent
                </Button>:""}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <RentCar
        show={modalShow}
        onHide={() => setModalShow(false)}
        cardata={selectedCar}
      />
    </div>
  );
}

export default CarsAvailable