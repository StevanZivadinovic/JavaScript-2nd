
import { Map, GoogleApiWrapper,withScriptjs,withGoogleMap, Marker } from 'google-maps-react';
//za ovo moras da ostavis podatke o visa kartici, odnosno moras
//da kreiras biling acount
export function Maps(props) {
    const mapStyles = {
        width: '75%',
        height: '90%',
      };
    return (
        <div>
            <Map
          google={props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{ lat: 43.32 , lng: 21.90}}
        >  
        <Marker position={{ lat: 43.32, lng: 21.90 }} />
        <Marker position={{ lat: 43.32, lng: 21.95 }} />

        </Map>
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAFP3MnkJZdkGIWdsYpkOQRyEDTgucdQ-Y'
  })(Maps);