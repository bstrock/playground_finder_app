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
    let initQueryParams = {
        latitude: 44.855,
        longitude: -93.46,
        radius: 10
    }

    // STATES
    const [queryParams, setQueryParams] = useState(initQueryParams)
    const [data, setData] = useState(null)

    // load data at app startup and when queryParams changed via filter button
    useEffect(() => {
        console.log(queryParams)
        apiQuery(queryParams)
            .then((data) => setData(data))
    }, [queryParams])

    return (
        <ThemeProvider theme={theme}>
            <>
                <Navbar />
                <MapContainer style={{height: "94vh"}}
                              center={[queryParams.latitude, queryParams.longitude]}
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
