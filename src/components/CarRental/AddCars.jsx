import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import "./AddCars.css";
import MyVerticallyCenteredModal from "./EditCar";
import { loadData } from "../localStorage";
import { useNavigate } from "react-router-dom";

function AddCars() {
  const [data, setData] = useState(
    []);

  const [alert, setAlert] = useState(false);

  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const handleChange = ({ name, value }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const [modalShow, setModalShow] = useState(false);
  const [selectedCar, setSelectedCar] = useState({});

  const [widthTotal, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const fetchData = () => {
    const token = loadData("token");
    fetch(
      "https://wild-red-goshawk-tie.cyclic.app/car/available-cars-to-rent",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((dataa) => setData(dataa.cars));
  };
  useEffect(() => {
    fetchData();
  }, [alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = loadData("token");

    fetch("https://wild-red-goshawk-tie.cyclic.app/car/add_car", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 1500);
      });

      setForm({})
  };
  const TopDiv = {
    backgroundColor: "black",
    paddingTop: widthTotal > 500 ? "8%" : "20%",
    paddingBottom: "5%",
  };
  const styles = {
    color: "white",
    width: widthTotal > 500 ? "60%" : "95%",

    margin: "auto",
    background: "rgba(0, 0, 0, 0.8)",

    textAlign: "left",

    padding: "50px",
    borderRadius: "20px",
  };
  const showModal = (car) => {
    setSelectedCar(car);
    setModalShow(true);
  };

  const handleDelete = (id) => {
    const token = loadData("token");
    fetch(`https://wild-red-goshawk-tie.cyclic.app/car/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        fetchData();
      });
  };
  return (
    <div style={TopDiv}>
      {/* <input type="text" placeholder="write" onChange={(e)=>setText(e.target.value)}/>
       */}
      <div
        style={{
          backgroundImage: `url(
          "https://mcdn.wallpapersafari.com/medium/12/40/120mvB.jpg"
        )`,
          height: "fit-content",

          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          margin: "auto",
          backgroundColor: "black",
        }}
      >
        <h2
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
          Add Car
        </h2>
        <Form style={styles}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Model</Form.Label>
            <Form.Control
              onChange={(e) => {
                handleChange(e.target);
              }}
              name="model"
              type="text"
              placeholder="Enter Car Model"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Car Number</Form.Label>
            <Form.Control
              onChange={(e) => {
                handleChange(e.target);
              }}
              name="number"
              type="text"
              placeholder="Enter Car Number"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Seating Capacity</Form.Label>
            <Form.Control
              onChange={(e) => {
                handleChange(e.target);
              }}
              name="seatingCapacity"
              type="number"
              placeholder="Capacity"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Rent per day</Form.Label>

            <Form.Control
              onChange={(e) => {
                handleChange(e.target);
              }}
              name="rentPerDay"
              type="number"
              placeholder="Rent Per day"
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Add Car
          </Button>
          {alert ? (
            <Alert
              key={"primary"}
              variant={"primary"}
              style={{ marginTop: "2em" }}
            >
              Car Added
            </Alert>
          ) : (
            ""
          )}
        </Form>
      </div>
      <div
        style={{
          color: "white",
        }}
      >
        <h2
          style={{
            color: "white",
            background: "rgba(0, 0, 0, 0.1)",
            border: "1px solid white",
            width: "fit-content",
            margin: "auto",
            padding: "1%",
            borderRadius: "20px",
          }}
        >
          Your Added Cars
        </h2>
        <div className="notes">
          {data.map((car, index) => (
            <Card style={{ color: "black" }}>
              <Card.Body>
                <Card style={{ border: "1px solid black" }}>
                  <label>Vehicle Model</label>
                  <Card.Title>{car.vehicleModel}</Card.Title>
                  <label>Vehicle Number</label>

                  <Card.Title>{car.vehicleNumber}</Card.Title>
                </Card>
                <span
                  style={{
                    border: "1px solid black",
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
                    <label>Rent</label>
                    <Card.Title> ₹ {car.rentPerDay}</Card.Title>
                  </span>
                </span>
                <Badge
                  bg={!car.available ? "danger" : "info"}
                  style={{ padding: "3%", marginTop: "2%" }}
                >
                  {car.available ? "Available" : "Not Available"}
                </Badge>
              </Card.Body>
              <Card.Body
                style={{ margin: "auto", justifyContent: "space-around" }}
              >
                <Button
                  variant="primary"
                  onClick={() => showModal(car)}
                  style={{ backgroundColor: "gray" }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDelete(car._id);
                  }}
                >
                  Delete
                </Button>{" "}
              </Card.Body>
            </Card>
          ))}
        </div>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          cardata={selectedCar}
        />
      </div>
    </div>
  );
}

export default AddCars;
