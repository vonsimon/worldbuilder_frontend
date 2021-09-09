import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import { CRS } from "leaflet";
import CreateMarker from "./CreateMarker";

const CustomMap = ({
  url,
  bounds,
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
      <MapContainer
        center={[50, 50]}
        zoom={10}
        scrollWheelZoom={true}
        crs={CRS.Simple}
      >
        <ImageOverlay url={url} bounds={bounds} />
        {marker.map((marker) => (
          <Marker
            key={marker._id}
            position={[marker.coords[0], marker.coords[1]]}
          >
            <Popup>
              {marker.title}
              {marker.description}
              <img src={marker.image}/>
            </Popup>
          </Marker>
        ))}
        <CreateMarker
          onSubmit={onSubmit}
          markerType={markerType}
          setMarkerType={setMarkerType}
          currentSelection={currentSelection}
          setCurrentSelection={setCurrentSelection}
          showCanvas={showCanvas}
          setShowCanvas={setShowCanvas}
        />
      </MapContainer>
    </div>
  );
};

export default CustomMap;
