import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import "./AddCars.css";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { loadData } from "../localStorage";
import Alert from "react-bootstrap/Alert";

function RentCar(props) {
  console.log(props, " props");
  const [startDates, setStartDate] = useState(new Date());
  const [dayss, setDays] = useState(0);
    const [alert, setAlert] = useState(false);
  const [total, setTotal] = useState(0);
  const [rent, setRent] = useState(0);
  const [form, setForm] = useState({});
  const [booking, setBooking] = useState(false)

  useEffect(() => {
    setForm(props.cardata);
    if (props.cardata) {
      setRent(props.cardata.rentPerDay);
    }
  }, [props.cardata]);
  console.log(form , " form check")

  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [end] = dates;

    setEndDate(end);
  };

  const handleChange = (val) => {
    console.log(val, " val");
    setDays(val);
    setTotal(rent * val);
  };

  const handleSubmit = (e) => {

    e.preventDefault()

      const token = loadData("token");


      fetch(
        `https://wild-red-goshawk-tie.cyclic.app/car/rent-car/${form._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            days: dayss,
            startDate: startDates,
            amount: total,
            carAgency: form.agencyId,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setBooking(true);
        });
      

      
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="special_modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Rent Car</Modal.Title>
      </Modal.Header>
      {!booking ? (
        <Modal.Body>
          <Form
            style={{
              margin: "auto",

              textAlign: "left",
              border: "1px solid black",
              padding: "15px",
              borderRadius: "20px",
            }}
          >
            {alert ? (
              <Alert
                key={"primary"}
                variant={"primary"}
                style={{ marginTop: "2em" }}
              >
                Booking Successful
              </Alert>
            ) : (
              ""
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Vehicle Model</Form.Label>
              <Form.Control
                name="vehicleModel"
                type="text"
                disabled
                value={form && form.vehicleModel ? form.vehicleModel : ""}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Vehicle Number</Form.Label>
              <Form.Control
                disabled
                value={form && form.vehicleNumber ? form.vehicleNumber : ""}
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Seating Capacity</Form.Label>
              <Form.Control
                disabled
                value={form && form.seatingCapacity ? form.seatingCapacity : ""}
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Rent Per Day</Form.Label>
              <Form.Control
                disabled
                value={form && form.rentPerDay ? form.rentPerDay : ""}
                type="text"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                selected={startDates}
                onChange={(date) => setStartDate(date)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              style={{
                display: "flex",
                color: "white",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  marginTop: "1%",
                  display: "flex",
                  width: "40%",
                  justifyContent: "space-around",
                }}
              >
                <Form.Label style={{ float: "right" }}>
                  Number of Days
                </Form.Label>

                <Form.Select
                  style={{
                    marginLeft: "5%",
                    height: "100%",
                    width: "100px",
                    color: "black",
                  }}
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                  aria-label="Default select example"
                >
                  <option>Days</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
                    (item) => (
                      <option value={item}>{item}</option>
                    )
                  )}
                </Form.Select>
              </span>
              <span
                style={{
                  color: "white",
                  justifyContent: "space-evenly",
                  paddingRight: "2em",
                }}
              >
                <Form.Label>Total : </Form.Label>
                <Form.Text style={{ color: "white" }}> ₹ {total}</Form.Text>
              </span>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{
                margin: "auto",
                justifyContent: "center",
                backgroundColor: "black",
                color: "white",
              }}
              onClick={handleSubmit}
            >
              Rent
            </Button>
          </Form>
        </Modal.Body>
      ) : (
        <Modal.Body>
          <Alert
            key={"primary"}
            variant={"primary"}
            style={{ marginTop: "2em" , padding:'5%'}}
          >
            Booking Successful
          </Alert>
          <Button  style={{
          
          }} variant="primary" onClick={()=>{
            setBooking(!booking);
            props.onHide()
           
          }}>Ok</Button>
        </Modal.Body>
      )}
    </Modal>
  );
}

export default RentCar;
