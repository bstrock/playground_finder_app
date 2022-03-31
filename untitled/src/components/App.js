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
import LayerControlF from "./Map/LayerControlF";
import apiQuery from "./apiQuery";

function App() {
    // here's the entrypoint for our app

    const theme = createTheme({
        palette: {
            primary: green,
            type: "light"
        },
    });

    let initQueryParams = {
        latitude: 44.855,
        longitude: -93.46,
        radius: 10
    }
    // starting position for the map and API query
    //const [lat, lon, radius] = [44.855, -93.46, 10]
    const [queryParams, setQueryParams] = useState(initQueryParams)
    const [data, setData] = useState(null)

    // set params to lat, lon, radius from props
    useEffect(() => {
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
                              zoomControl={true}>
                    <LocationMarker />
                    <FilterDrawer setQueryParams={setQueryParams}/>
                    <LayerControl data={data}/>
                </MapContainer>
            </>
        </ThemeProvider>
    );
}

export default App;
