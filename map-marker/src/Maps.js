import React from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

export default function Maps() {
  const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 43.32, lng: 21.90 }}
      onClick={e=>{
        console.log(e.latLng.lat(),e.latLng.lng());
      }}
    >
      <Marker
        position={{ lat: 43.32, lng: 21.95 }}
      />
    </GoogleMap>
  ));
  return (
    <div>
       <MapWithAMarker
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAFP3MnkJZdkGIWdsYpkOQRyEDTgucdQ-Y&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
    </div>
  )
}

// import { Map, GoogleApiWrapper,withScriptjs,withGoogleMap, Marker, InfoWindow } from 'google-maps-react';
// //za ovo moras da ostavis podatke o visa kartici, odnosno moras
// //da kreiras biling acount

// export function Maps(props) {

//   let defaultProps = {
//     center: {lat: 43.32, lng: 21.90 }, 
//     zoom: 12
//   }
//     const mapStyles = {
//         width: '90%',
//         height: '90%',
//       };
      
//     // let aa = navigator.geolocation.getCurrentPosition(function(position) {
//     //     console.log("Latitude is :", position.coords.latitude);
//     //     console.log("Longitude is :", position.coords.longitude);
//     //   })

//       // console.log(map);
   
//     //  let a = google.maps.Geocoder.geocode()
    
//     return (
//         <div>
          
//             <Map
//           google={props.google}
//           zoom={12}
//           style={mapStyles}
//           initialCenter={defaultProps.center}
//         //   center={center}
//         //   options={options}
//           onClick={props.onClick}
//           onClick={(e)=>{
//             console.log(e)
//           }}
//         >  
//         <Marker position={{ lat: 43.32, lng: 21.90 }} />
//         <Marker position={{ lat: 43.32, lng: 21.95 }} />

//         </Map>
    

//         </div>
//     )
// }

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyAFP3MnkJZdkGIWdsYpkOQRyEDTgucdQ-Y'
//   })(Maps);

