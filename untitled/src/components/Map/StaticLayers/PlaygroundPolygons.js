import React from 'react';
import {Polygon} from "react-leaflet";

export default function PlaygroundPolygons(props) {
    console.log(props)
    const polygons = props.data.features.map(
        (feature) => <Polygon pathOptions={{color: 'purple'}} positions={feature.geometry.coordinates}/>
    )
    return polygons
}

