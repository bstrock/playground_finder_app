import {LayersControl, LayerGroup, Polygon, CircleMarker, Marker} from 'react-leaflet'
import {StreetLayer, SatelliteLayer} from "./TileLayers";
import React, {Component} from "react";
import apiQuery from "../../apiQuery";
import L from "leaflet";
import Popup from './Popup'

export default class LayerControl extends Component {
state = {data: null}
params = {}
centroids = []

markerIcon = 'https://api.geoapify.com/v1/icon/?type=material&color=%23ff9632&size=medium&icon=nature_people&scaleFactor=1&apiKey=2aa948af6f2d46f6b12acc10827cc689'

parkIcon = new L.Icon({
    iconUrl: this.markerIcon,
    iconRetinaUrl: this.markerIcon,
    iconAnchor: [15, 40]
})

constructor(props) {
    super(props)

    this.params = {
        latitude: props.latitude,
        longitude: props.longitude,
        radius: props.radius
    }
}

componentDidMount() {
    apiQuery(this.params).then((data) =>
        this.setState({data: data})
    )
    console.log(this.state)
}

reverseCoordinates(coords) {
    let reversed_coords = []
    for (let i = 0; i < coords.length; i++) {
        reversed_coords.push([coords[i][1], coords[i][0]])
    }
    return reversed_coords
}

findMeanCenter(coords) {
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
    if (this.state.data === null) {
        return null
    }
        return (
        <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Street Map">
                <StreetLayer/>
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Land Map">
                <SatelliteLayer />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay checked name={'Playground Outlines'}>
                <LayerGroup>
                    {
                        this.state.data.features.map((data) => {
                            const polygonKey = data.properties.site_id + '-polygon'
                            const polygonGeom = this.reverseCoordinates(data.geometry.coordinates)
                            console.log(data)
                            const centroid = this.findMeanCenter(polygonGeom)
                            const pointKey = data.properties.site_id + '-point'
                            this.centroids.push({'pointKey': pointKey, 'geom': centroid, 'data': data.properties})

                            const pathOptions = {color: 'orange', fillColor: 'orange', fillOpacity: 1}
                            return (
                                <Polygon key={polygonKey}
                                         pathOptions={pathOptions}
                                         positions={polygonGeom} />
                            )
                        })
                    }
                </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name={'Playground Markers'}>
                <LayerGroup>
                    {
                        this.centroids.map((centroid) => {
                            return (
                                <Marker key={centroid.pointKey}
                                        icon={this.parkIcon}
                                        position={centroid.geom}>

                                    <Popup key={centroid.pointKey.replace('-point', '-popup')}
                                           data={centroid.data} />

                                </Marker>
                            )
                        })
                    }
                </LayerGroup>

            </LayersControl.Overlay>

        </LayersControl>
    )
}}