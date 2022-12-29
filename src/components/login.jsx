import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

function Login({ accountAPI, setLogon }) {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    accountAPI
      .auth(email.current.value, password.current.value)
      .then((received) => {
        if (received.result) {
          setLogon(email.current.value);
          localStorage.setItem("token", received.message);
          navigate("/");
        }
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="mt-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={email}
            style={{ width: "30rem" }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={password}
            style={{ width: "30rem" }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Link to="/join">
        <Button variant="primary" type="button" className="mt-2">
          Join
        </Button>
      </Link>
    </>
  );
}

export default Login;
