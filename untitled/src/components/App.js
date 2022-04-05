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

    // starting values for query parameters
    let initQueryParams = {
        radius: 4,
        equipment: [],
        amenities: [],
        sports_facilities: []
    }

    // STATES
    const [queryLocation, setQueryLocation] = useState(initLocation)
    const [queryParams, setQueryParams] = useState(initQueryParams)
    const [data, setData] = useState(null)
    const [showSearchRadius, setShowSearchRadius] = useState(false)

    // load data at app startup and when queryParams changed via filter button
    useEffect(() => {
        setData(null)
        apiQuery(queryLocation, queryParams)
            .then((data) => setData(data))
    }, [queryLocation, queryParams])

    return (
        <ThemeProvider theme={theme}>
            <>
                <Navbar/>
                <MapContainer style={{height: "94vh"}}
                              center={[queryLocation.latitude, queryLocation.longitude]}
                              zoom={11.5}
                              zoomControl={true}
                >
                    <LocationMarker />
                    <LayerControl data={data}
                                  showSearhRadius={showSearchRadius}
                                  queryLocation={queryLocation}
                                  radius={queryParams.radius}
                    />
                    <FilterDrawer queryParams={queryParams}
                                  initQueryParams={initQueryParams}
                                  setQueryParams={setQueryParams}
                                  setShowSearchRadius={setShowSearchRadius}
                    />
                </MapContainer>
            </>
        </ThemeProvider>
    );
}

export default App;
