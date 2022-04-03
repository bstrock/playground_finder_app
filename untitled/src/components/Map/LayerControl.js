import {LayersControl, LayerGroup, Polygon, Popup, Marker, Tooltip, GeoJSON, Circle} from 'react-leaflet'
import {StreetLayer, SatelliteLayer} from "./StaticLayers/TileLayers";
import React, {useEffect, useState} from "react";
import apiQuery from "../apiQuery";
import L from "leaflet";
import InfoBox from './ParkPopup/InfoBox'
import 'leaflet/dist/leaflet.css';
import {LinearProgress} from "@mui/material";
import Box from "@mui/material/Box";
import LocationMarker from "./LocationMarker";

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

export default function LayerControl(props) {

    const centroids = []

    const markerIconURL = 'https://api.geoapify.com/v1/icon/?type=material&color=%23ff9632&size=medium&icon=nature_people&scaleFactor=1&apiKey=2aa948af6f2d46f6b12acc10827cc689'
    const parkIcon = new L.Icon({
        iconUrl: markerIconURL,
        iconRetinaUrl: markerIconURL,
        iconAnchor: [15, 40],
        popupAnchor: [0, 0]
    })

    const pathOptions = {color: 'orange', fillColor: 'orange', fillOpacity: 1}  // playground polygon styles
    const json = require('../../data/ep_boundary.json'); // eden prairie border
    const boundaryPathOptions = {color: 'black', fillColor: 'white', fillOpacity: 0}  // ensure border polygon isn't filled
    const searchRadiusPathOptions = {color: 'grey', fillColor: 'grey', opacity: .7, fillOpacity: .3}

    const miles_to_meters = (radius) => radius * 1609.34

    if (props.data === null) {
        /* here we display a loading bar while the API data is being fetched */
        return (
            <Box sx={{alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <LinearProgress variant={'indeterminate'}/>
            </Box>
        );
    }

    return (
        /* LAYERS CONTROL MAIN STRUCTURE */
        <LayersControl position="topright">
            {/* BASE LAYERS - STREET AND SATELLITE VIEWS */}
            <LayersControl.BaseLayer checked name="Street Map">
                <StreetLayer/>
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Land Map">
                <SatelliteLayer/>
            </LayersControl.BaseLayer>

            {/* BASE LAYERS - EDEN PRAIRIE BOUNDARY POLYGON */}
            <LayersControl.Overlay checked name={'EP Boundary'}>
                <GeoJSON data={json}
                         pathOptions={boundaryPathOptions}/>
            </LayersControl.Overlay>

            {/* DYNAMIC LAYERS - PLAYGROUND POLYGONS */}
            <LayersControl.Overlay checked name={'Playground Outlines'}>
                <LayerGroup>
                    {
                        // map the data from the API to Polygons and Markers
                        // steps: ingest data, build metadata, reverse coords, generate polys, generate centroids
                        props.data.features.map((d) => {
                            // these components will need keys...
                            const polygonKey = d.properties.site_id + '-polygon'
                            const pointKey = d.properties.site_id + '-point'

                            // reverse the coordinates to display them in the correct hemisphere
                            const polygonGeom = reverseCoordinates(d.geometry.coordinates)

                            // find location for marker
                            const centroid = findMeanCenter(polygonGeom)
                            d.properties.centroid = centroid  // this is necessary!

                            // build the object we'll use to generate the point markers
                            centroids.push({'pointKey': pointKey, 'geom': centroid, 'data': d.properties})

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

            {/* DYNAMIC LAYERS - PLAYGROUND MAKERS */}
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
                                        <InfoBox data={centroid.data}/>
                                    </Popup>

                                </Marker>
                            )
                        })
                    }
                </LayerGroup>
            </LayersControl.Overlay>
            <>
                <LayersControl.Overlay checked name={'Filter Radius'}>
                    {// show search radius if not using default search parameter values (ie init state)
                        !props.showSearhRadius ? null :
                            <Circle center={[props.queryLocation.latitude, props.queryLocation.longitude]}
                                    radius={miles_to_meters(props.radius)}
                                    pathOptions={searchRadiusPathOptions}
                            />
                    }
                </LayersControl.Overlay>
            </>
            <LocationMarker/>
        </LayersControl>
    )
    // that was fun!
}