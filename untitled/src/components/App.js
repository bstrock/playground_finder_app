import React from "react";
import '../App.css'
import '../index.css'
import {MapContainer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import LayerControl from "./Map/LayerControl";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import green from "@mui/material/colors/green";
import Navbar from "./NavBar/Navbar";
import LocationMarker from "./Map/LocationMarker";
import FilterDrawer from "./FilterDrawer/FilterDrawer";
import LayerControlF from "./Map/LayerControlF";

function App() {
    // here's the entrypoint for our app

    const theme = createTheme({
        palette: {
            primary: green,
            type: "light"
        },
    });

    // starting position for the map and API query
    const [lat, lon, radius] = [44.855, -93.46, 10]

    return (
        <ThemeProvider theme={theme}>
            <>
                <Navbar />
                <MapContainer style={{height: "94vh"}}
                              center={[lat, lon]}
                              zoom={11.5}
                              zoomControl={true}>
                    <LocationMarker />
                    <FilterDrawer />
                    <LayerControlF latitude={lat}
                                  longitude={lon}
                                  radius={radius}/>
                </MapContainer>
            </>
        </ThemeProvider>
    );
}

export default App;
