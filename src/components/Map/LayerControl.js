import {LayersControl, LayerGroup, Polygon, CircleMarker} from 'react-leaflet'
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

reverse_coords(coords) {
    console.log(coords)
    let reversed_coords = []
    for (let i = 0; i < coords.length; i++) {
        reversed_coords.push([coords[i][1], coords[i][0]])
    }
    console.log(reversed_coords)
    return reversed_coords    }

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
                             const geom = this.reverse_coords(data.geometry.coordinates)
                             const polygon_key = data.properties.site_id + '-polygon'
                            // todo: change geojson to polygon
                            // todo: transfer centroid inference
                            // todo: transfer marker
                            return (
                                <Polygon key={polygon_key}
                                         pathOptions={ {fillColor: 'orange'} }
                                         positions={geom} />
                            )
                        })
                    }
                </LayerGroup>
            </LayersControl.Overlay>
        </LayersControl>
    )
}}