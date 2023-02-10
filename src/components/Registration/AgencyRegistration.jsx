import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { saveData } from "../localStorage";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../context/tokenContext";

function AgencyRegistration() {

  const [form, setForm] = useState({});
  const [signup, setSignup] = useState(false);
const {handleToken} = useContext(TokenContext)
  const navigate = useNavigate();
  const handleChange = ({ name, value }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignup(true);
    await sleep(500);
    fetch("https://wild-red-goshawk-tie.cyclic.app/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,

        email: form.email,

        password: form.password,

        type: "agency",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        saveData("token", data.token);
        handleToken(data.token);
        saveData("type", data.newUser.type);
        saveData("id", data.newUser._id);
        navigate("/");
      });
  };
  return (
    <div style={{ backgroundColor: "black", height: "100vh", color: "white" }}>
      <h2 style={{ paddingTop: "2%" }}>Agency Registration</h2>
      {signup ? (
        <Alert key={"primary"} variant={"primary"}>
          SignUp Successful
        </Alert>
      ) : (
        ""
      )}
      <div style={{ width: "60%", margin: "auto" }}>
        <Form
          style={{
            margin: "auto",

            textAlign: "left",
            border: "1px solid black",
            padding: "50px",
            borderRadius: "20px",
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => {
                handleChange(e.target);
              }}
              name="name"
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => {
                handleChange(e.target);
              }}
              name="email"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={(e) => {
                handleChange(e.target);
              }}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AgencyRegistration;
