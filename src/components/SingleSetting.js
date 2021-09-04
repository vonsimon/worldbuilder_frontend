import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import axios from "axios";

const SingleSetting = () => {
  const { id } = useParams();
  const [setting, setSetting] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSetting = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_BLOG_API}/${id}`
        );
        setSetting(data);
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
    !error && getSetting();
  }, [id, error]);

  if (error) return <Alert variant="danger">{error}</Alert>;

  return !loading && setting.name ? (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>
            <h3>
              {setting.name.english}
              <> </>
              <Badge bg="success">{setting.type[0]}</Badge>
            </h3>
          </Card.Title>
          <div className="cover-box">
            <div className="cover-overlay">
              <img
                onError={(event) => {
                  event.target.src =
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png";
                  event.target.width = "50";
                }}
                src={""}
                alt=""
              />
              <Card.Text>
                <h5>Description: {setting.description}</h5>
              </Card.Text>
            </div>
          </div>
          <Row className="mt-5"></Row>
        </Card.Body>
      </Card>
    </Col>
  ) : (
    <Spinner animation="border" variant="primary" />
  );
};

export default SingleSetting;