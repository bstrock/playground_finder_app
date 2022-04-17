import {LayersControl, LayerGroup, Polygon, Popup, Marker, GeoJSON, Circle, useMap, useMapEvent} from 'react-leaflet'
import {StreetLayer, SatelliteLayer, OutdoorLayer} from "./StaticLayers/TileLayers"
import React, {useState} from "react"
import InfoBox from './ParkPopup/InfoBox'
import 'leaflet/dist/leaflet.css'
import {ButtonGroup} from "@mui/material"
import Box from "@mui/material/Box"
import FloatingButton from "../FilterDrawer/FloatingButton";
import {useTheme} from "@mui/styles"

// HELPER FUNCTIONS
function reverseCoordinates(coords) {
    // we take in the playgrounds as polygons, but need to find centerpoints for the markers
    // in order to do that, we need to switch all xys from the API, thanks to Leaflet's lovely
    // implementation of geojson standards (that's a joke)
    let reversed_coords = []
    for (let i = 0; i < coords.length; i++) {
        reversed_coords.push([coords[i][1], coords[i][0]])
    }
    return reversed_coords
}

function findMeanCenter(coords) {
    // here we generate our centroids from the playground polygons
    let xx = []
    let yy = []
    for (let i = 0; i < coords.length; i++) {
        xx.push(coords[i][0])
        yy.push(coords[i][1])
    }

    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    return [average(xx), average(yy)]
}

// COMPONENT BODY
export default function LayerControl(props) {

    // props destructuring
    const {
        data,
        initLocation,
        queryLocation,
        radius,
        userClickedLocate,
        setUserClickedLocate,
        toggleDrawer,
        setZoom,
        zoomFunc,
        setLoading,
        parkIcon
    } = props

    // state
    const [showSearchRadius, setShowSearchRadius] = useState(true)

    // hooks
    const map = useMap()
    const theme = useTheme()

    // container
    const centroids = []

    // ep boundary data
    const json = require('../../data/ep_boundary.json'); // eden prairie border

    // path style options
    const pathOptions = {
        color: theme.palette.secondary.dark,
        fillColor: theme.palette.secondary.main,
        fillOpacity: 1,
        weight: 2
    }  // playground polygon styles
    const boundaryPathOptions = {color: '#212121', fillColor: 'white', fillOpacity: 0, weight: 2}  // ensure border polygon isn't filled
    const searchRadiusPathOptions = {color: 'grey', fillColor: 'grey', opacity: .7, fillOpacity: .2, weight: 3}

    const miles_to_meters = (radius) => radius * 1609.34
    const locateUserOnClickFunc = () => {
        const newZoom = zoomFunc()
        setZoom(newZoom)
        map.flyTo([initLocation.latitude, initLocation.longitude], newZoom)
    }

    useMapEvent('zoomend', () => {
        // this map callback shows or hides the search radius based on the current zoom level
        // this allows us to ensure the base layer is visible when the user zooms in enough that the view is contained by the search radius
        const bbox = map.getBounds()
        const searchArea = 3.14 * Math.pow(miles_to_meters(radius), 2)
        const northeast = bbox.getNorthEast()
        const aa = northeast.distanceTo(bbox.getNorthWest())
        const bb = northeast.distanceTo(bbox.getSouthEast())
        const boxArea = aa * bb
        setShowSearchRadius(boxArea > searchArea)
    })

    return (
        /* LAYERS CONTROL MAIN STRUCTURE */
        <>
            <LayersControl position="topright">
                {/* BASE LAYERS - STREET AND SATELLITE VIEWS */}

                <LayersControl.BaseLayer checked name="Outdoors">
                    <OutdoorLayer/>
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Streets">
                    <StreetLayer/>
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="Satellite">
                    <SatelliteLayer/>
                </LayersControl.BaseLayer>

                {/* BASE LAYERS - EDEN PRAIRIE BOUNDARY POLYGON */}
                <LayersControl.Overlay checked name={'EP Boundary'}>
                    <GeoJSON data={json}
                             pathOptions={boundaryPathOptions}/>
                </LayersControl.Overlay>

                {/* DYNAMIC LAYERS - PLAYGROUND POLYGONS */}
                <>
                    {
                        data === null ? null :
                            <>
                                <LayersControl.Overlay checked name={'Playground Outlines'}>
                                    <LayerGroup>
                                        {
                                            // map the data from the API to Polygons and Markers
                                            // steps: ingest data, build metadata, reverse coords, generate polys, generate centroids
                                            data.features.map((d) => {
                                                // these components will need keys...
                                                const polygonKey = d.properties.site_id + '-polygon'
                                                const pointKey = d.properties.site_id + '-point'

                                                // reverse the coordinates to display them in the correct hemisphere
                                                const polygonGeom = reverseCoordinates(d.geometry.coordinates)

                                                // find location for marker
                                                const centroid = findMeanCenter(polygonGeom)
                                                d.properties.centroid = centroid  // this is necessary!

                                                // build the object we'll use to generate the point markers
                                                centroids.push({
                                                    'pointKey': pointKey,
                                                    'geom': centroid,
                                                    'data': d.properties
                                                })

                                                // then push the polygons
                                                return (
                                                    <Polygon key={polygonKey}
                                                             pathOptions={pathOptions}
                                                             positions={polygonGeom}/>
                                                )
                                            })
                                        }
                                    </LayerGroup>
                                </LayersControl.Overlay>
                                <LayersControl.Overlay checked name={'Playground Markers'}>
                                    <LayerGroup>
                                        {
                                            // we generated these centroids while making the polygons, remember?
                                            centroids.map((centroid) => {
                                                    return (
                                                        // generate marker
                                                        <Marker key={centroid.pointKey}
                                                                icon={parkIcon}
                                                                position={centroid.geom}>

                                                            {/* Generate Popup- the InfoBox is a complex object which displays our API attribute data */}
                                                            <Popup>
                                                                <InfoBox data={centroid.data}
                                                                         queryLocation={queryLocation}/>
                                                            </Popup>

                                                        </Marker>
                                                    )
                                                }
                                            )
                                        }
                                    </LayerGroup>
                                </LayersControl.Overlay>
                                <LayersControl.Overlay checked={showSearchRadius} name={'Search Radius'}>
                                    <Circle center={[queryLocation.latitude, queryLocation.longitude]}
                                            radius={miles_to_meters(radius)}
                                            pathOptions={searchRadiusPathOptions}
                                    />

                                </LayersControl.Overlay>
                            </>
                    }
                </>
            </LayersControl>
            <Box sx={{display: 'flex', flexGrow: 1, height: '100%', justifyContent: 'center'}}>
                <Box sx={{display: 'flex', mt: 'auto', mb: 1}}>
                    <ButtonGroup>
                        <FloatingButton clickFunc={toggleDrawer(true)}
                                        which={'filter'}
                                        buttonColor={'primary'}
                        />
                        <FloatingButton clickFunc={
                            () => {
                                setLoading(true)
                                userClickedLocate ? map.locate() : setUserClickedLocate(true)
                            }
                        }
                                        which={'location'}
                                        buttonColor={'secondary'}
                        />
                        <FloatingButton clickFunc={locateUserOnClickFunc}
                                        which={'reset'}
                                        buttonColor={'info'}
                        />
                    </ButtonGroup>
                </Box>
            </Box>
        </>
    )
    // that was fun!
}