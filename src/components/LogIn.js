import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect, useLocation } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../context/AuthContext";

const LogIn = () => {
  const location = useLocation();
  const { loading, isAuthenticated, error, signIn } = useContext(AuthContext);
  const defaultValues = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = async (data) => await signIn(data);

  if (isAuthenticated)
    return (
      <Redirect
        to={{
          pathname: location.state ? location.state.next : "/user-area",
          from: location.pathname,
        }}
      />
    );
  if (loading) return <Spinner animation="border" variant="primary" />;
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
    <Row>
      <Col></Col>
      <Col>
        <br />
        
          <Row>{error && <Alert variant="danger">{error}</Alert>}</Row>
          <Row>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>
                {" "}
                <span className="text-light">Email</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <Alert variant="danger">{errors.email.message}</Alert>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>
                {" "}
                <span className="text-light">Password</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <Alert variant="danger">{errors.password.message}</Alert>
              )}
            </Form.Group>
          </Row>
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Col>
      <Col></Col>
    </Row>
    </Form>
  );
};

export default LogIn;
