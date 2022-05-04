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
                main: '#66bb6a', dark: '#387002', light: '#99d066', contrastText: '#fff'
            }, secondary: {
                main: '#ffab00', dark: '#c17900', light: '#f9a825'
            }, info: {
                main: '#d273f3'
            }, common: {
                black: '#1D1D1D'
            }
        }, typography: {
            fontFamily: font,
        }
    })

    // SET BOUNDS
    const maxSouthWest = L.latLng(45.33, -92.8)
    const maxNorthEast = L.latLng(44.38, -94.12)
    const maxBounds = L.latLngBounds(maxSouthWest, maxNorthEast)

    // starting position for the map and API query
    let initLocation = {
        latitude: 44.855, longitude: -93.46,
    }

    // starting values for query parameters
    let initQueryParams = {
        radius: 4, equipment: [], amenities: [], sports_facilities: []
    }

    const setInitialMapZoom = () => {
        // this function uses the device width to set map zoom level
        // also called when view is reset via button
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
    const [allData, setAllData] = useState(null)  // stored upon first api query call
    const [userClickedLocate, setUserClickedLocate] = useState(false)  // if the user has clicked the locate button
    const [zoom, setZoom] = useState(setInitialMapZoom())  // leaflet zoom level (responsive)
    const [drawerOpen, setDrawerOpen] = useState(false)  // control drawer state
    const [loading, setLoading] = useState(false)  // whether not loading is currently occuring (triggers progress indicator)
    const [numberOfResults, setNumberOfResults] = useState(null)  // shown in navbar
    const [distValue, setDistValue] = useState(4)  // value of distance slider
    const [showFabs, setShowFabs] = useState(true)  // whether to show floating buttons
    const [openSite, setOpenSite] = useState(null)  // used to open popup when using list search
    const [showSearchRadius, setShowSearchRadius] = useState(true)  // show or hide radius on map based on view zoom level
    const [loadingProgress, setLoadingProgress] = useState(0)  // used to inform progress loading bar
    const [searchList, setSearchList] = useState([])  // generated list of parks for search component

    // DRAWER OPEN/CLOSE CALLBACK
    const toggleDrawer = (open) => (e) => {
        // responds to drawer close events.  button-based drawer behavior (ie, filter buttons) must be closed by setDrawerOpen directly
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    }

    const markerRef = useRef(null)

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
        apiQuery(queryLocation, queryParams, setLoadingProgress)
            .then((data) => {
                const fr = new FileReader()
                fr.onload = (e) => {
                    setData(JSON.parse(e.target.result))
                }
                fr.readAsText(data)
                setLoading(false)
                setLoadingProgress(0)
                if (e !== null) {
                    // given that the marker exists, the event handler is re-attached after the api data has been loaded
                    marker._events.click = e  // take your dirty event handler back, go on, take it
                }
            })
    }, [setLoading, setData, queryLocation, queryParams, setLoadingProgress])

    // effect to set number of shown filter results
    useEffect(() => {
        if (data !== null) {
            setNumberOfResults(data.features.length)
        }
    }, [data, setNumberOfResults])

    // effect to capture all results on first load, in order to populate seearch list
    useEffect(() => {
        if (allData == null) {
            setAllData(data)
        }
    }, [setAllData, allData, data])

    // everybody gets all the props in this app

    return (
        <ThemeProvider theme={theme}>
            <>
                <Navbar loading={loading} numberOfResults={numberOfResults} loadingProgress={loadingProgress}/>
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
                                    setLoadingProgress={setLoadingProgress}
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
                                  setLoadingProgress={setLoadingProgress}
                                  openSite={openSite}
                                  setOpenSite={setOpenSite}
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
                                  allData={allData}
                                  searchList={searchList}
                                  setSearchList={setSearchList}
                                  setOpenSite={setOpenSite}
                    />
                </MapContainer>
            </>
        </ThemeProvider>
    )
}

export default App
