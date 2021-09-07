import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
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
          <span className="text-dark">
            <br />
            <h4 className="text-center"></h4>
            <br />
          </span>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card
            style={{
              backgroundColor: "#9da5a8",
              height: "100%",
            }}
            className="border border-dark"
          >
            <Card.Body>
              <Card.Title>
                <h5>Create a new Setting!</h5>
              </Card.Title>
              <Card.Img
                className="border border-dark"
                variant="top"
                src={
                  "https://images-ext-2.discordapp.net/external/b3gPU7TYZPGiG5uSEIPnpNB5IQEAa74YnjAcuWJlI8Q/https/media.istockphoto.com/photos/quill-pen-inkwell-on-open-scroll-background-for-text-picture-id1132179489?width=791&height=528"
                }
                alt={""}
              />
              <span><br /></span>
              <Button style={{display: 'flex', justifyContent: 'center'}} variant="primary" as={Link} to="/create-setting" fluid>
                Create Setting
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              backgroundColor: "#9da5a8",
              height: "100%",
            }}
            className="border border-dark"
          >
            <Card.Body>
              <Card.Title>
                <h5>Visit an existing Setting!</h5>
              </Card.Title>
              <Card.Img
                className="border border-dark"
                variant="top"
                src={
                  "https://images-ext-2.discordapp.net/external/RRCMC6kGMS0rjIVzpQCv7dSsNXk4U9i33lR5tJafOSM/https/thumbs.dreamstime.com/b/magic-scrolls-books-medieval-library-closeup-169628463.jpg?width=792&height=528"
                }
                alt={""}
              />
              <span><br /></span>
              <Button style={{display: 'flex', justifyContent: 'center'}} variant="primary" as={Link} to="/library" fluid>
                Library
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
        </Col>
      </Row>
    </>
  );
};

export default UserArea;
