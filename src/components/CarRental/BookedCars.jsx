import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./BookedCars.css";
import { loadData } from "../localStorage";
function BookedCars() {
  const [widthTotal, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [data, setData] = useState([]);

  useEffect(()=>{
     const token = loadData("token");
    fetch("https://wild-red-goshawk-tie.cyclic.app/booking/viewBookedCars", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((dataa) => setData(dataa.customers));

  },[])
  const TopDiv = {
    height: "fit-content",
    backgroundImage: `url("https://cdn.mwallpapers.com/photos/celebrities/hd-wallpapers/car-lights-mad-black-black-car-android-iphone-hd-wallpaper-background-downloadhd-wallpapers-desktop-background-android-iphone-1080p-4k-xoc92.jpg")`,
    paddingBottom: "5%",
    paddingTop: widthTotal > 500 ? "5%" : "20%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div style={TopDiv}>
      <h1
        style={{
          color: "white",
          background: "rgba(0, 0, 0, 0.6)",
          border: "1px solid white",
          width: "fit-content",
          margin: "auto",
          padding: "1%",
          borderRadius: "20px",
        }}
      >
        Cars Booked By Customers
      </h1>

      <div className="notess">
        {data.map((item, index) => (
          <Card
            key={index}
            style={{
              backgroundColor: "black",
              width: "fit-content",
              
              color: "white",
              border: "2px solid white",
              borderRadius: "20px",
              textAlign: "left",
            }}
          >
            <Card.Body>
              <Card.Body
                style={{ border: "1px solid white", borderRadius: "20px" }}
              >
                <Card.Body
                  style={{
                    display: "flex",
                    backgroundColor: "black",
                    justifyContent: "space-around",
                    color: "white",
                  }}
                >
                  <label>Car: </label>
                  <Card.Title>{item.car}</Card.Title>

                  <label>Number: </label>
                  <Card.Title>{item.number}</Card.Title>
                </Card.Body>
                <Card.Body style={{ width: "100%", textAlign: "center" }}>
                  <label>Rent Per Day</label>
                  <Card.Title> ₹ {item.rentPerDay}</Card.Title>
                </Card.Body>
              </Card.Body>
              <Card.Body
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                  marginBottom: "0px",
                  paddingBottom: "0px",
                }}
              >
                <Card.Body
                  style={{ marginBottom: "0px", paddingBottom: "0px" }}
                >
                  <label>Customer Name</label>
                  <Card.Title>
                    {item.customerName.charAt(0).toUpperCase() +
                      item.customerName.slice(1)}
                  </Card.Title>
                </Card.Body>
                <Card.Body
                  style={{ marginBottom: "0px", paddingBottom: "0px" }}
                >
                  <label>Customer Email</label>
                  <Card.Title>{item.customerEmail}</Card.Title>
                </Card.Body>
              </Card.Body>
              <Card.Body
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <Card.Body
                  style={{ marginBottom: "0px", paddingBottom: "0px" }}
                >
                  <label>Start Date</label>
                  <Card.Title>{item.startDate.split("T")[0]}</Card.Title>
                </Card.Body>
                <Card.Body
                  style={{ marginBottom: "0px", paddingBottom: "0px" }}
                >
                  <label>Days</label>
                  <Card.Title>{item.days}</Card.Title>
                </Card.Body>
              </Card.Body>
              <Card.Body style={{ width: "100%", textAlign: "center" }}>
                <label>Amount</label>
                <Card.Title> ₹ {item.amount}</Card.Title>
              </Card.Body>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BookedCars;
