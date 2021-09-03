
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import { CRS } from 'leaflet';

const Map = ({url, bounds}) => {
    return (
      <div>
       <MapContainer
          center={[50,50]}
          zoom={18}
          scrollWheelZoom={true}
          crs={CRS.Simple}
        >
          <ImageOverlay url={url} bounds={bounds}/>
          <Marker position={[50,50]}>
            <Popup>
              Link to another map in this setting
            </Popup>
          </Marker>
          <Marker position={[50,100]}>
            <Popup>
              A character
            </Popup>
          </Marker>
          <Marker position={[95,200]}>
            <Popup>
              Another map
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
}

export default Map;
