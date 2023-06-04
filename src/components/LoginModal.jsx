import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const LoginModal = ({ handleLogin }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://orca-app-ik7qo.ondigitalocean.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      console.log("elma");
      if (response.ok) {
        const data = await response.json();
        const { id_user } = data;
        // successful login
        setEmail("");
        setPassword("");
        setError("");
        handleClose();
        handleLogin(data);
        // console.log("yes" + data.user.id);
        // console.log("yes" + JSON.stringify(data));
      } else if (response.status === 401) {
        setError("Invalid email or password");
      } else {
        // login error
        setError("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setError("Network error");
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <>
      <Button className="me-2" variant="dark" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose} className="mt-5">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column" onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </FloatingLabel>
            {error && <p className="text-danger mt-2">{error}</p>}

            <Button
              className="mx-auto mt-3"
              size="lg"
              variant="dark"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <div className="loader"></div> : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
