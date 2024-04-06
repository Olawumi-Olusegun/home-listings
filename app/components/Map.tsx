"use client";

import React, { FC } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { useCountries } from '../lib/getCountries';
import { icon } from 'leaflet';

type MapProps = {
    locationValue: string;
}

const ICON  = icon({
    iconUrl: "https://w7.pngwing.com/pngs/571/321/png-transparent-google-map-mark-computer-icons-location-symbol-map-location-miscellaneous-angle-heart.png",
    iconSize: [50, 50],
})

const Map: FC<MapProps> = ({locationValue}) => {
    const { getCountryByValue } = useCountries();
    const latLang = getCountryByValue(locationValue)?.latLang;
  return (
        <MapContainer center={latLang ?? [51.505, -0.09]} zoom={8} scrollWheelZoom={false} className='h-[50vh] rounded-lg relative z-0'>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={ICON} position={latLang ?? [51.505, -0.09]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
        </MapContainer>
  )
}

export default Map