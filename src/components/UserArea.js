import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { SettingContext } from "../context/SettingContext";

const UserArea = () => {
  return (
    <>
      <Row className="justify-content-center">
        <Col md={3}>
          <span className="text-light">
            <h1>User area Hi</h1>
          </span>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={5} className="btn btn-primary btn-block">
          <Button
            variant="primary"
            className="btn btn-primary btn-block"
            as={Link}
            to="/create-setting"
          >
            Create Setting
          </Button>
        </Col>
        <Col md={2}></Col>
        <Col md={5} className="btn btn-primary btn-block">
          <Button variant="primary" as={Link} to="/library">
            Library
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default UserArea;
