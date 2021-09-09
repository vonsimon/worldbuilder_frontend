import { useState, useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
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
  if (loading) return (
    <Row className='justify-content-center align-items-center vh-100'>
      <Spinner animation="border" variant="primary" />
    </Row>
  );
  return settings.map((setting) => (
    <Col md={4} className="mb-4" key={setting._id}>
      <span><br /></span>
      <Card style={{
              backgroundColor: "#9da5a8"
            }}
            className="border border-dark">
        <Card.Body>
          <Card.Title>
            <h2>{setting.title}</h2> <Badge bg="success">{setting.plane}</Badge>
          </Card.Title>
          <Card.Img variant="top" className="border border-dark" src={setting.image} alt={setting.title} />
          <Card.Text>
          <br />
            {setting.description}
          <br />
          </Card.Text>
          <Button style={{display: 'flex', justifyContent: 'center'}} variant="primary" as={Link} to={`/setting/${setting._id}`} fluid>
            More
          </Button>
          </Card.Body>
      </Card>
    </Col>
  ));
};

export default Library;
