import React from "react";
import '../App.css'
import '../index.css'
import {MapContainer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import LayerControl from "./Map/LayerControl";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import green from "@mui/material/colors/green";
import Navbar from "./NavBar/Navbar";
import SearchButton from "./FilterButton";
import LocationMarker from "./Map/LocationMarker";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import L from "leaflet";
import FilterDrawer from "./FilterDrawer";

function App() {

    const theme = createTheme({
        palette: {
            primary: green,
            type: "light" // Switching the dark mode on is a single property value change.
        },
    });

    const [lat, lon, radius] = [44.855, -93.46, 10]

    return (
        <ThemeProvider theme={theme}>
            <>
                <Navbar/>

                <MapContainer style={{height: "90vh"}}
                              center={[lat, lon]}
                              zoom={11.5}
                              zoomControl={true}>
                    <LocationMarker />
                    <FilterDrawer />
                    <LayerControl latitude={lat}
                                  longitude={lon}
                                  radius={radius}
                    />
                </MapContainer>

            </>
        </ThemeProvider>

    );
}

/*
<ul>
    {listItems}
</ul>

*/

export default App;
