import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { loadData } from "../localStorage";

function MyVerticallyCenteredModal(props) {
 
  console.log(props)
  const [form, setForm] = useState({})

  useEffect(() => {
    setForm(props.cardata);
  }, [props.cardata]);

const handleChange = ({ name, value }) => {
  console.log(name, value);

  if (name== "available"){
    setForm({...form, available: !form.available})

  }
else {
  setForm({ ...form, [name]: value });
}

};
  

const handleEdit = (id)=>{
   const token = loadData("token");
 fetch(`https://wild-red-goshawk-tie.cyclic.app/car/${id}`, {
   method: "PATCH",
   headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
   },
   body: JSON.stringify(form),
 })
   .then((res) => res.json())
   .then((data) => {
     props.onHide();

      // setAlert(true);
      // setTimeout(() => {
      //   setAlert(false);
      // }, 1500);
   });
}
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Car</Modal.Title>
      </Modal.Header>
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Vehicle Model</Form.Label>
            <Form.Control
              onChange={(e) => {
                handleChange(e.target);
              }}
              name="vehicleModel"
              type="text"
              value={form.vehicleModel}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Vehicle Number</Form.Label>
            <Form.Control
              onChange={(e) => {
                handleChange(e.target);
              }}
              name="vehicleNumber"
              type="text"
              value={form.vehicleNumber}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Seating Capacity</Form.Label>
            <Form.Control
              onChange={(e) => {
                handleChange(e.target);
              }}
              name="seatingCapacity"
              type="number"
              value={form.seatingCapacity}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Rent Per Day</Form.Label>
            <Form.Control
              onChange={(e) => {
                handleChange(e.target);
              }}
              name="rentPerDay"
              type="number"
              value={form.rentPerDay}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Available</Form.Label>
            <Form.Check
              onChange={(e) => {
                handleChange(e.target);
              }}
              name="available"
              type="switch"
              id="custom-switch"
              checked={form.available ? true : false}
              contentEditable
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={()=>{
            handleEdit(form._id)
          }}>
            Edit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}



export default MyVerticallyCenteredModal