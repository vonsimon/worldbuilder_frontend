import { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

const Library = () => {
  const authToken = localStorage.getItem("token");
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSettings = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_BLOG_API}/settings/user`,
          {
            headers: { authorization: `${authToken}` },
          }
        );
        setSettings(data);
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
    !error && getSettings();
  }, [error, authToken]);

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (loading) return <Spinner animation="border" variant="primary" />;
  return settings.map((setting) => (
    <Col md={4} className="mb-4" key={setting._id}>
      <Card style={{ height: "100%" }}>
        <Card.Body>
          <Card.Title>
            {setting.title} <Badge bg="success">{setting.plane}</Badge>
          </Card.Title>
          <Card.Img variant="top" src={setting.image} alt={setting.title} />
          <Card.Text>
            <h5>Description: {setting.description}</h5>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" as={Link} to={`/setting/${setting._id}`}>
            More
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  ));
};

export default Library;
