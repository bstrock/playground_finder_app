import {LayersControl, LayerGroup, Polygon, Popup, Marker, Tooltip, GeoJSON} from 'react-leaflet'
import {StreetLayer, SatelliteLayer} from "./StaticLayers/TileLayers";
import React, {Component} from "react";
import apiQuery from "../apiQuery";
import L from "leaflet";
import InfoBox from './ParkPopup/InfoBox'
import 'leaflet/dist/leaflet.css';
import {LinearProgress} from "@mui/material";
import Box from "@mui/material/Box";
import LocationMarker from "./LocationMarker";
import FilterDrawer from "../FilterDrawer/FilterDrawer";

export default class LayerControl extends Component {
    // CLASS PROPERTIES
    state = {data: null}
    params = {}  // stores query parameters passed into constructor
    centroids = []  // holds xy points generated from playground polygons

    keySets = {
        equipment: new Set(),
        amenities: new Set(),
        sports_facilities: new Set()
    }

    markerIconURL = 'https://api.geoapify.com/v1/icon/?type=material&color=%23ff9632&size=medium&icon=nature_people&scaleFactor=1&apiKey=2aa948af6f2d46f6b12acc10827cc689'

    parkIcon = new L.Icon({
        iconUrl: this.markerIconURL,
        iconRetinaUrl: this.markerIconURL,
        iconAnchor: [15, 40],
        popupAnchor: [0, 0]
    })

    pathOptions = {color: 'orange', fillColor: 'orange', fillOpacity: 1}  // playground polygon styles
    json = require('../../data/ep_boundary.json'); // eden prairie border
    boundaryPathOptions = {color: 'black', fillColor: 'white', fillOpacity: 0}  // ensure border polygon isn't filled

    constructor(props) {
        super(props)

        // establish centerpoint for API query
        this.params = {
            latitude: props.latitude,
            longitude: props.longitude,
            radius: props.radius
        }
        this.keyPromoter = props.keyPromoter
        console.log(this.epJSON)
    }

    componentDidMount() {
        // When component mounts, send query to API to get playground data, then set state
        apiQuery(this.params).then((data) =>
            this.setState({data: data})
        )
        console.log(this.state)
    }

    reverseCoordinates(coords) {
        // we take in the playgrounds as polygons, but need to find centerpoints for the markers
        // in order to do that, we need to switch all xys from the API, thanks to Leaflet's lovely
        // implementation of geojson standards (that's a joke)
        let reversed_coords = []
        for (let i = 0; i < coords.length; i++) {
            reversed_coords.push([coords[i][1], coords[i][0]])
        }
        return reversed_coords
    }

    findMeanCenter(coords) {
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

    render() {
        /* The LayerControl is the brain of the map operations.
        All layers and overlays descend from this container. */

        if (this.state.data === null) {
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
                    <GeoJSON data={this.json}
                             pathOptions={this.boundaryPathOptions}/>
                </LayersControl.Overlay>

                {/* DYNAMIC LAYERS - PLAYGROUND POLYGONS */}
                <LayersControl.Overlay checked name={'Playground Outlines'}>
                    <LayerGroup>
                        {
                            // map the data from the API to Polygons and Markers
                            // steps: ingest data, build metadata, reverse coords, generate polys, generate centroids
                            this.state.data.features.map((data) => {
                                // these components will need keys...
                                const polygonKey = data.properties.site_id + '-polygon'
                                const pointKey = data.properties.site_id + '-point'

                                // reverse the coordinates to display them in the correct hemisphere
                                const polygonGeom = this.reverseCoordinates(data.geometry.coordinates)

                                // find location for marker
                                const centroid = this.findMeanCenter(polygonGeom)
                                data.properties.centroid = centroid  // this is necessary!

                                // build the object we'll use to generate the point markers
                                this.centroids.push({'pointKey': pointKey, 'geom': centroid, 'data': data.properties})

                                // then push the polygons
                                return (
                                    <Polygon key={polygonKey}
                                             pathOptions={this.pathOptions}
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
                            this.centroids.map((centroid) => {
                                return (
                                    // generate marker
                                    <Marker key={centroid.pointKey}
                                            icon={this.parkIcon}
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
                <LocationMarker/>
            </LayersControl>
        )
        // that was fun!
    }
}