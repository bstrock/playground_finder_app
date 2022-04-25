import React, {useEffect, useRef, useState} from "react";
import L from 'leaflet'
import '../App.css'
import 'leaflet/dist/leaflet.css'
import '../index.css'
import {MapContainer} from 'react-leaflet'
import LayerControl from "./Map/LayerControl";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import Navbar from "./NavBar/Navbar";
import LocationMarker from "./Map/LocationMarker";
import FilterDrawer from "./FilterDrawer/FilterDrawer";
import apiQuery from "./apiQuery";

function App() {
    // here's the entrypoint for our app

    const font = "'Signika', san-serif;"

    const theme = createTheme({
        palette: {
            primary: {
                main: '#66bb6a',
                dark: '#387002',
                light: '#99d066',
                contrastText: '#fff'
            },
            secondary: {
                main: '#ffab00',
                dark: '#c17900',
                light: '#f9a825'
            },
            info: {
                main: '#d273f3'
            },
            common: {
                black: '#1D1D1D'
            }
        },
        typography: {
            fontFamily: font,
        }
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
        } else if (viewportWidth <= LARGE) {
            mapZoom = 13
        } else {
            mapZoom = 14
        }
        return mapZoom
    }

    // STATES
    const [queryLocation, setQueryLocation] = useState(initLocation)  // point being queried
    const [queryParams, setQueryParams] = useState(initQueryParams)  // selected parameters from filter menu
    const [data, setData] = useState(null)  // data retrieved from API
    const [userClickedLocate, setUserClickedLocate] = useState(false)  // if the user has clicked the locate button

    const [zoom, setZoom] = useState(setInitialMapZoom())  // leaflet zoom level (responsive)
    const [drawerOpen, setDrawerOpen] = useState(false)  // control drawer state
    const [loading, setLoading] = useState(false)  // whether not loading is currently occuring (triggers progress indicator)
    const [numberOfResults, setNumberOfResults] = useState(null)
    const [distValue, setDistValue] = useState(4)
    const [showFabs, setShowFabs] = useState(true)

    // DRAWER OPEN/CLOSE CALLBACK
    const toggleDrawer = (open) => (e) => {
        // responds to drawer close events.  button-based drawer behavior (ie, filter buttons) must be closed by setDrawerOpen directly
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    }

    const markerRef = useRef(null)
    const [showSearchRadius, setShowSearchRadius] = useState(true)

    // DATA LOADING FROM API
    useEffect(() => {
        // unfortunately this very short codeblock requires a great deal of commenting.
        const marker = markerRef.current
        // for some reason, leaflet decided to start firing clicks when dragend is triggered on a moveable marker
        // this would cause the user location popup to open every time the marker was moved- no bueno.
        // to fix this, we have to intercept the setState hook emanating from the LocationMarker component
        // (setQueryLocation) and then remove the click handler from the marker.
        // This works, but disables the popup permanently.
        // Thus, we capture the event handler before removing it, allow the event to fire without being handled or
        // causing a failure, then restore the event handler.

        let e  // catches event
        if (marker != null) {
            // Naturally these two steps need to fall under a null check against the marker, so that the markerRef
            // doesn't crash the site on load (since the marker doesn't exist yet).
            e = marker._events.click  // capture event handler
            marker._events.click = []  // kill event handler
        } else {
            e = null  // first time loading
        }
        setLoading(true)
        apiQuery(queryLocation, queryParams)
            .then((data) => {
                setData(data)
                setLoading(false)
                if (e !== null) {
                    // given that the marker exists, the event handler is re-attached after the api data has been loaded
                    marker._events.click = e  // take your dirty event handler back, go on, take it
                }
            })
    }, [setLoading, setData, queryLocation, queryParams])

    useEffect(
        () => {
            if (data !== null) {
                setNumberOfResults(data.features.length)
            }
        }, [data, setNumberOfResults]
    )

    return (
        <ThemeProvider theme={theme}>
            <>
                <Navbar loading={loading} numberOfResults={numberOfResults}/>
                <MapContainer style={{height: "96vh"}}
                              center={[queryLocation.latitude, queryLocation.longitude]}
                              zoom={zoom}
                              maxBounds={maxBounds}
                              minZoom={10}
                              zoomControl={true}
                              tap={false}  // this fixes the safari double-click issue
                >
                    <LocationMarker setQueryLocation={setQueryLocation}
                                    userClickedLocate={userClickedLocate}
                                    setUserClickedLocate={setUserClickedLocate}
                                    queryLocation={queryLocation}
                                    markerRef={markerRef}
                                    initLocation={initLocation}
                                    setZoom={setZoom}
                                    zoomFunc={setInitialMapZoom}
                    />
                    <LayerControl data={data}
                                  loading={loading}
                                  initLocation={initLocation}
                                  queryLocation={queryLocation}
                                  radius={distValue}
                                  userClickedLocate={userClickedLocate}
                                  setUserClickedLocate={setUserClickedLocate}
                                  toggleDrawer={toggleDrawer}
                                  setZoom={setZoom}
                                  zoomFunc={setInitialMapZoom}
                                  setLoading={setLoading}
                                  showSearchRadius={showSearchRadius}
                                  setShowSearchRadius={setShowSearchRadius}
                                  showFabs={showFabs}
                                  setShowFabs={setShowFabs}
                    />
                    <FilterDrawer queryParams={queryParams}
                                  initQueryParams={initQueryParams}
                                  setQueryParams={setQueryParams}
                                  drawerOpen={drawerOpen}
                                  setDrawerOpen={setDrawerOpen}
                                  toggleDrawer={toggleDrawer}
                                  setShowSearchRadius={setShowSearchRadius}
                                  distValue={distValue}
                                  setDistValue={setDistValue}
                    />
                </MapContainer>
            </>
        </ThemeProvider>
    )
}

export default App
