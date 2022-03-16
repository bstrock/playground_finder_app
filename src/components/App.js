import React, {useState, useEffect} from "react";
import '../App.css'
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Title from "./Title";
import LayerControl from "./Map/LayerControl";
import ButtonAppBar from "./NavBar/Navbar";
import axios from 'axios'
import apiQuery from "../apiQuery";
import { render } from "react-dom";
import TodoComponent from "./components/TodoComponent";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import blue from "material-ui/colors/blue";

function App() {

    const theme = createMuiTheme({
      palette: {
        primary: blue,
        type: "light" // Switching the dark mode on is a single property value change.
      }
    });

    const [lat, lon, radius] = [44.855, -93.46, 10]

    return (
      <MuiThemeProvider theme={theme}>

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
        </MuiThemeProvider>

    );
}

/*
<ul>
    {listItems}
</ul>

*/

export default App;
