import React, {useState, useEffect} from "react";
import '../App.css'
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Title from "./Title";
import LayerControl from "./Map/LayerControl";
import ButtonAppBar from "./NavBar/Navbar";
import axios from 'axios'
import apiQuery from "../apiQuery";

function App() {

    const [lat, lon, radius] = [44.855, -93.46, 10]
    const equipment = [
        'diggers',
        'ladders',
        'toddler_swings',
        'standard_swings',
        'accessible_swings',
        'tire_swings',
        'seesaws',
        'climbers',
        'spinners',
        'bridges',
        'tunnels',
        'slides',
        'thematic',
        'ropes',
        'fire_poles',
        'staircases',
        'musical',
        'play_towers',
        'telephones',
        'binoculars',
        'tactile'
    ];

    const listItems = equipment.map((eq) =>
        <li>{eq}</li>
    );

    return (
        <>
            <Title/>
            <MapContainer style={{height: "100vh"}}
                          center={[lat, lon]}
                          zoom={12.5}
                          zoomControl={false}>

                <LayerControl latitude={lat}
                              longitude={lon}
                              radius={radius}
                />

            </MapContainer>

        </>
    );
}

/*
<ul>
    {listItems}
</ul>

*/

export default App;
