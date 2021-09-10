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
  const [markerType, setMarkerType] = useState("Landmark");
  const [currentSelection, setCurrentSelection] = useState(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [map, setMap] = useState({});

  const onSubmit = async (data) => {
    try {
      const { data: newMarker } = await axios.post(
        `${process.env.REACT_APP_BLOG_API}/markers`,
        {
          type: markerType,
          coords: [currentSelection.lat, currentSelection.lng],
          map: id,
          ...data,
        },
        { headers: { authorization: `${authToken}` } }
      );
      setMap((prev) => ({ ...prev, marker: [...prev.marker, newMarker] }));
      setCurrentSelection(null)
      setShowCanvas(false)
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
        setTimeout(() => setError(null), 3000);
      } else {
        setError(error.message);
        setTimeout(() => setError(null), 3000);
      }
    }
  };

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
        setMap((prev) => ({ ...data, ...prev }));
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
    return  () => setMap({})
  }, [id, error, authToken]);

  if (error) return <Alert variant="danger">{error}</Alert>;
  return !loading && map.image ? (
    <Row>
      <CustomMap
        mapId={id}
        url={map.image}
        bounds={map.bounds}
        marker={map.marker}
        setting={map.setting}
        onSubmit={onSubmit}
        markerType={markerType}
        setMarkerType={setMarkerType}
        currentSelection={currentSelection}
        setCurrentSelection={setCurrentSelection}
        showCanvas={showCanvas}
        setShowCanvas={setShowCanvas}
      />
    </Row>
  ) : (
      <Row className='justify-content-center align-items-center vh-100'>
        <Spinner animation="border" variant="primary" />
      </Row>
  );
};

export default SingleMap;
