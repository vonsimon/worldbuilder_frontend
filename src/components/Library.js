import { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Setting from "./Setting.js";
import SingleSetting from "./SingleSetting.js";

const Library = () => {
  const [singleSetting, setSingleSetting] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSinglesetting = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${process.env.REACT_APP_BLOG_API}`);
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
  }, [error]);

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (loading) return <Spinner animation="border" variant="primary" />;
  return settings.map((setting) => (
    <Col md={4} className="mb-4" key={setting.id}>
      <Card style={{ height: "100%" }}>
        <Card.Body>
          <Card.Title>
            {setting.name} <Badge bg="success">{setting.type[0]}</Badge>
          </Card.Title>
          <img
            onError={(event) => {
              event.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png";
              event.target.width = "50";
            }}
            src={`https://projectsetting.org/images/normal-sprite/${setting.name.english.toLowerCase()}.gif`}
            alt=""
          />
          <Card.Text>
          <h5>Description: {setting.description}</h5>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" as={Link} to={`/setting/${setting.id}`}>
            Show Stats
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  ));
};

export default Library;
