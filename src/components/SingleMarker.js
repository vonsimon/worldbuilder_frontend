import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const SingleMarker = () => {
  const { id } = useParams();
  const authToken = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const getMarker = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_BLOG_API}/markers/${id}`,
          {
            headers: { authorization: `${authToken}` },
          }
        );
        setMarker(data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
          setTimeout(() => setError(null), 3000);
          setLoading(false);
        } else {
          setError("Network error");
          setTimeout(() => setError(null), 3000);
          setLoading(false);
        }
      }
    };
    !error && getMarker();
  }, [id, error, authToken]);

  return !loading && marker ? (
    <Row>
       <span>
          <br />
        </span>
      <Row>
        <Col></Col>
        <Col className="col-6">
          <h1 className="text-dark">{marker.title}</h1>
          {marker.type}
          <br />
          <img
            className="border rounded"
            src={marker.image}
            alt={marker.title}
          />
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <span>
          <br />
        </span>
        <Col></Col>
        <Col className="col-6">
          {marker.description}
        </Col>
        <Col></Col>
      </Row>
      <Row>
      <span>
          <br />
        </span>
        <Col></Col>
        <Col className="col-6">
        {marker.background}
        </Col>
        <Col></Col>
      </Row>
      <Row>
      <span>
          <br />
        </span>
        <Col></Col>
        <Col className="col-6">
        {marker.personality}
        </Col>
        <Col></Col>
      </Row>
      <Row>
      <span>
          <br />
        </span>
        <Col></Col>
        <Col className="col-6">
        {marker.canvas}
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <span>
          <br />
        </span>
        <Col></Col>
        <Col className="col-6">
          <Button
            style={{ display: "flex", justifyContent: "center" }}
            variant="primary"
            as={Link}
            to={`/map/${marker.map}`}
            fluid
          >
            Back
          </Button>
        </Col>
        <Col></Col>
        <span>
          <br />
        </span>
      </Row>


    </Row>
  ) : (
    <Row className="justify-content-center align-items-center vh-100">
      <Spinner animation="border" variant="primary" />
    </Row>
  );
};

export default SingleMarker;
