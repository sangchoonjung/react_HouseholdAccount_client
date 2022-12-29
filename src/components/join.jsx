import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

function Join({ accountAPI }) {
  const [info, setInfo] = useState({
    email: "",
    password: "",
    name: "",
    gender: "",
  });
  const navi = useNavigate();

  const submitHandler = async (evt) => {
    evt.preventDefault();
    const response = accountAPI
      .register(info.email, info.password, info.name, info.gender)
      .then((received) => {
        console.log(received, "응답");
        if (received.result) {
          navi("/login");
        } else {
          alert("아이디가 이미 있습니다.");
        }
      });
  };

  return (
    <div style={{ width: "50rem" }}>
      <Form className="mt-3" onSubmit={submitHandler}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(evt) =>
                setInfo((current) => {
                  return { ...current, email: evt.target.value };
                })
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(evt) =>
                setInfo((current) => {
                  return { ...current, password: evt.target.value };
                })
              }
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Hong GilDong"
            onChange={(evt) =>
              setInfo((current) => {
                return { ...current, name: evt.target.value };
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            placeholder="M or W"
            onChange={(evt) =>
              setInfo((current) => {
                return { ...current, gender: evt.target.value };
              })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Join;
