import React, {useEffect, useState} from "react";
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
import apiQuery from "./apiQuery";

function App() {
    // here's the entrypoint for our app

    const theme = createTheme({
        palette: {
            primary: green,
            type: "light"
        },
    });

    // starting position for the map and API query
    let initLocation = {
        latitude: 44.855,
        longitude: -93.46,
    }

    let initQueryParams = {
        radius: 10,
        equipment: null,
        amenities: null,
        sports_facilities: null
    }

    // STATES
    const [queryLocation, setQueryLocation] = useState(initLocation)
    const [queryParams, setQueryParams] = useState(initQueryParams)
    const [data, setData] = useState(null)

    // load data at app startup and when queryParams changed via filter button
    useEffect(() => {
        console.log(queryLocation)
        apiQuery(queryLocation, queryParams)
            .then((data) => setData(data))
    }, [queryParams])

    return (
        <ThemeProvider theme={theme}>
            <>
                <Navbar />
                <MapContainer style={{height: "94vh"}}
                              center={[queryLocation.latitude, queryLocation.longitude]}
                              zoom={11.5}
                              zoomControl={true}
                >
                    <LocationMarker />
                    <FilterDrawer setQueryParams={setQueryParams}/>
                    <LayerControl data={data}/>
                </MapContainer>
            </>
        </ThemeProvider>
    );
}

export default App;
