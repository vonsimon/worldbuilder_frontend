import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import { CRS } from "leaflet";

const CustomMap = ({ url, bounds }) => {
  return (
    <div>
      <MapContainer
        center={[50, 50]}
        zoom={10}
        scrollWheelZoom={true}
        crs={CRS.Simple}
        onClick={(e)=>console.log(e)}
      >
        <ImageOverlay url={url} bounds={bounds} />
      </MapContainer>
    </div>
  );
};

export default CustomMap;
