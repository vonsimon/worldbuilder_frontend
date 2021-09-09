import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import { CRS } from "leaflet";
import {Link} from 'react-router-dom'
import CreateMarker from "./CreateMarker";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";


const CustomMap = ({
  mapId,
  url,
  bounds,
  setting,
  marker,
  onSubmit,
  markerType,
  setMarkerType,
  currentSelection,
  setCurrentSelection,
  showCanvas,
  setShowCanvas,
}) => {
  return (
    <div>
      <br />
      <MapContainer
        center={[100, 100]}
        zoom={0}
        scrollWheelZoom={true}
        crs={CRS.Simple}
      >
        <ImageOverlay url={url} bounds={bounds} />
        {marker && marker.map((marker) => (
          <Marker
            key={marker._id}
            position={[marker.coords[0], marker.coords[1]]}
          >
          <Popup>
            <Card style={{
            backgroundColor: "#9da5a8",
            height: "100%",
            }}
            className="border border-dark">
            <Card.Body style={{width: "18rem"}}>
            <Card.Title>
            {marker.title} <Badge bg="success">{marker.plane}</Badge>
            </Card.Title>
            <Card.Img variant="top" className="border border-dark" src={marker.image} alt={marker.title} />
            <Card.Text>
            <h5>{marker.description}</h5>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button as={Link} to={marker.type === 'Map' ? `/map/${marker.nestedMap}` :`/marker/${marker._id}`}>More</Button>
            </Card.Footer>
            </Card>
            </Popup>
          </Marker>
        ))}
        {marker && <CreateMarker
          mapId={mapId}
          onSubmit={onSubmit}
          markerType={markerType}
          setting={setting}
          setMarkerType={setMarkerType}
          currentSelection={currentSelection}
          setCurrentSelection={setCurrentSelection}
          showCanvas={showCanvas}
          setShowCanvas={setShowCanvas}
        />}
      </MapContainer>
      <br />
    </div>
  );
};

export default CustomMap;
