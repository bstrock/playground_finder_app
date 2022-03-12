import {LayersControl, LayerGroup, GeoJSON, CircleMarker} from 'react-leaflet'
import {StreetLayer, SatelliteLayer} from "./TileLayers";
import PlaygroundPolygons from "./PlaygroundPolygons";
import React, {Component, useEffect, useState} from "react";
import apiQuery from "../../apiQuery";

export default class LayerControl extends Component {

state = {data: null}
params = {}

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

render() {
    if (this.state.data === null) {
        return null
    }
        return (
        <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="mapbox/streets">
                <StreetLayer/>
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="esri/world-imagery">
                <SatelliteLayer/>
            </LayersControl.BaseLayer>

            <LayersControl.Overlay checked name={'Playgrounds'}>
                <LayerGroup>
                    {
                        this.state.data.features.map((data) => {
                             const geojson = data.geometry
                             const playground_name = data.name
                            return (
                                <GeoJSON key={playground_name} data={geojson}/>
                            )
                        })
                    }
                </LayerGroup>
            </LayersControl.Overlay>
        </LayersControl>
    )
}}