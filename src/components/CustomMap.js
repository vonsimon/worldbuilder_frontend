import { useState } from "react";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import { CRS } from "leaflet";

const CreateMarker = () => {
  const [currentSelection, setCurrentSelection] = useState(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [markerType, setMarkerType] = useState("Landmark");
  const map = useMapEvents({
    click: ({ latlng }) => {
      setCurrentSelection(latlng);
      setShowCanvas(true);
    },
  });

  return (
    currentSelection && (
      <>
        <Marker
          position={[currentSelection.lat, currentSelection.lng]}
        ></Marker>
        <Offcanvas
          show={showCanvas}
          onHide={() => {
            setShowCanvas(false);
            setCurrentSelection(null);
          }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Create a marker</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form.Group className="mb-3" controlId="plane">
              <Form.Label>Plane:</Form.Label>
              <Form.Control as="select" value={markerType} onChange={e=>setMarkerType(e.target.value)}>
                {["Map", "Landmark", "Character"].map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Form.Control>
            </Form.Group>
            {/* Form */}
            <Form>
            </Form>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
  );
};

const CustomMap = ({ url, bounds }) => {
  return (
    <div>
      <MapContainer
        center={[50, 50]}
        zoom={10}
        scrollWheelZoom={true}
        crs={CRS.Simple}
      >
        <ImageOverlay url={url} bounds={bounds} />
        <CreateMarker />
      </MapContainer>
    </div>
  );
};

export default CustomMap;
