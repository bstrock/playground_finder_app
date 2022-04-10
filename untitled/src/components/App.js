import React, {useEffect, useState} from "react";
import '../App.css'
import 'leaflet/dist/leaflet.css'
import '../index.css'
import {MapContainer} from 'react-leaflet'
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
    const [userClickedLocate, setUserClickedLocate] = useState(false)

    const [drawerOpen, setDrawerOpen] = React.useState(false)

    const toggleDrawer = (open) => (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    }


    // load data at app startup and when queryParams changed via filter button
    useEffect(() => {
        apiQuery(queryLocation, queryParams)
            .then((data) => setData(data))
    }, [queryLocation, queryParams])

    // load data at app startup and when queryParams changed via filter button

    return (
        <ThemeProvider theme={theme}>
            <>
                <Navbar initLocation={initLocation}/>
                <MapContainer style={{height: "96vh"}}
                              center={[queryLocation.latitude, queryLocation.longitude]}
                              zoom={11.5}
                              zoomControl={true}
                >
                <LocationMarker setQueryLocation={setQueryLocation}
                                userClickedLocate={userClickedLocate}
                                queryLocation={queryLocation}
                />
                    <LayerControl data={data}
                                  initLocation={initLocation}
                                  queryLocation={queryLocation}
                                  radius={queryParams.radius}
                                  userClickedLocate={userClickedLocate}
                                  setUserClickedLocate={setUserClickedLocate}
                                  drawerOpen={drawerOpen}
                                  toggleDrawer={toggleDrawer}
                    />
                    <FilterDrawer queryParams={queryParams}
                                  initQueryParams={initQueryParams}
                                  setQueryParams={setQueryParams}
                                  drawerOpen={drawerOpen}
                                  toggleDrawer={toggleDrawer}
                    />
                </MapContainer>
            </>
        </ThemeProvider>
    );
}

export default App;
