import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { saveData } from "../localStorage";
import Alert from "react-bootstrap/Alert";
import { TokenContext } from "../../context/tokenContext";


function AgencyLogin() {
    const [form, setForm] = useState({});

  const {handleToken} = useContext(TokenContext)
   const [error, setError] = useState(false);

   const navigate = useNavigate();
   const handleChange = ({ name, value }) => {
     setForm({
       ...form,
       [name]: value,
     });
   };

   const handleSubmit = (e) => {
     e.preventDefault();

     fetch("https://wild-red-goshawk-tie.cyclic.app/auth/login", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(form),
     })
       .then((res) => res.json())
       .then(async (data) => {
         saveData("token", data.token);
         handleToken(data.token);
         saveData("type", data.name.type);
         saveData("id", data.name._id);
         navigate("/");
       })
       .catch((err) => {
         setError(true);
       });

     setTimeout(() => {
       setError(false);
     }, 2000);
   };

   return (
     <div style={{ backgroundColor: "black", height: "100vh", color: "white" }}>
       <h2 style={{ paddingTop: "2%" }}>Agency Login</h2>

       {error ? (
         <Alert key={"danger"} variant={"danger"}>
           Login Unsuccessful! Try Again.
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
             Login
           </Button>
         </Form>
       </div>
     </div>
   );
}

export default AgencyLogin;
