import React from 'react'
import { Marker, Popup, MapContainer, TileLayer } from 'react-leaflet'
import { Icon } from "leaflet"
import useSwr from "swr"
import "../App.css"


const fetcher = (...args) => fetch(...args).then(response => response.json());

const icon = new Icon({
  iconUrl: "/icon.png",
  iconSize: [25, 25]
});

export default function App() {
  const url =
    "http://localhost:5000/api/data";
  const { data, error } = useSwr(url, fetcher);
  const personas = data && !error ? data.slice(0, 10) : [];
  const [posicionPersona, setPosicionPersona] = React.useState(null);

  return (
    <MapContainer center={[2.934699791631093, -75.28107500798133]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {personas.map(ubicacion => (
        <Marker
          key={ubicacion._id}
          position={[ubicacion.latitude, ubicacion.longitude]}
          icon={icon}
          eventHandlers={{click: () => { setPosicionPersona(ubicacion);}, }}
        />
      ))}
      {posicionPersona && (
        <Popup
          position={[
            posicionPersona.latitude,
            posicionPersona.longitude
          ]}
          handleClick={() => {
            setPosicionPersona(null);
          }}
        >
          <div>
            <h2>{posicionPersona.nombre}</h2>
          </div>
        </Popup>
      )}
    </MapContainer>
  );
}

