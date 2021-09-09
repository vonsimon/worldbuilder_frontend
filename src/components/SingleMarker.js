import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios'
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
  const [marker, setMarker] = useState(null)

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
          <div>{marker.title} {marker.type}</div>
          <Button as={Link} to={`/map/${marker.map}`}>Go to map</Button>
    </Row>
  ): (
    <Row className='justify-content-center align-items-center vh-100'>
      <Spinner animation="border" variant="primary" />
    </Row>
  )
};

export default SingleMarker;
