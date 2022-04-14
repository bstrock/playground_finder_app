import React, {useEffect, useState} from "react";
import L from 'leaflet'
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
            primary: {
                main: '#66bb6a',
            },
            secondary: {
                main: '#ffa726',
            },
            common: {
                black: '#1D1D1D'
            }
        },
    })

    const maxSouthWest = L.latLng(45.33, -92.8)
    const maxNorthEast = L.latLng(44.38, -94.12)
    const maxBounds = L.latLngBounds(maxSouthWest, maxNorthEast)

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

    const setInitialMapZoom = () => {
        const viewportWidth = window.innerWidth;
        const SMALL = 320
        const MEDIUM = 1023
        const LARGE = 2559

        let mapZoom
        if (viewportWidth <= SMALL) {
            mapZoom = 11
        } else if (viewportWidth <= MEDIUM) {
            mapZoom = 12
        }  else if (viewportWidth <= LARGE){
            mapZoom = 13
        } else {
            mapZoom = 14
        }
        return mapZoom
    }

    // STATES
    const [queryLocation, setQueryLocation] = useState(initLocation)
    const [queryParams, setQueryParams] = useState(initQueryParams)
    const [data, setData] = useState(null)
    const [userClickedLocate, setUserClickedLocate] = useState(false)
    const [zoom, setZoom] = useState(setInitialMapZoom())
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const toggleDrawer = (open) => (e) => {
        // responds to drawer close events.  button-based drawer behavior (ie, filter buttons) must be closed by setDrawerOpen directly
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    }

    // load data at app startup and when queryParams changed via filter button
    useEffect(() => {
        setLoading(true)
        apiQuery(queryLocation, queryParams)
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [setLoading, queryLocation, queryParams])

    return (
        <ThemeProvider theme={theme}>
            <>
                <Navbar loading={loading}/>
                <MapContainer style={{height: "96vh"}}
                              center={[queryLocation.latitude, queryLocation.longitude]}
                              zoom={zoom}
                              maxBounds={maxBounds}
                              minZoom={10}
                              zoomControl={true}
                >
                <LocationMarker setQueryLocation={setQueryLocation}
                                userClickedLocate={userClickedLocate}
                                queryLocation={queryLocation}
                />
                    <LayerControl data={data}
                                  loading={loading}
                                  initLocation={initLocation}
                                  queryLocation={queryLocation}
                                  radius={queryParams.radius}
                                  userClickedLocate={userClickedLocate}
                                  setUserClickedLocate={setUserClickedLocate}
                                  toggleDrawer={toggleDrawer}
                                  setZoom={setZoom}
                                  zoomFunc={setInitialMapZoom}
                                  setLoading={setLoading}
                    />
                    <FilterDrawer queryParams={queryParams}
                                  initQueryParams={initQueryParams}
                                  setQueryParams={setQueryParams}
                                  drawerOpen={drawerOpen}
                                  setDrawerOpen={setDrawerOpen}
                                  toggleDrawer={toggleDrawer}
                    />
                </MapContainer>
            </>
        </ThemeProvider>
    );
}

export default App;
