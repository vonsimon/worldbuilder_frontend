import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import CustomMap from "./CustomMap";

const SingleMap = () => {
  const { id } = useParams();
  const authToken = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [map, setMap] = useState({});

  useEffect(() => {
    const getMap = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.REACT_APP_BLOG_API}/map/${id}`,
          {
            headers: { authorization: `${authToken}` },
          }
        );
        setMap(prev => ({...data, ...prev}));
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
    !error && getMap();
  }, [id, error, authToken]);

  
  if (error) return <Alert variant="danger">{error}</Alert>;
  return !loading &&  map.image ? 
  (
    <Row>
     <CustomMap url={map.image} bounds={map.bounds} />
    </Row>
  ): <Spinner animation="border" variant="primary" />
};

export default SingleMap;
