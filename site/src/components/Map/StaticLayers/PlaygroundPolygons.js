import React from 'react';
import {Polygon} from "react-leaflet";

export default function PlaygroundPolygons(props) {
    return props.data.features.map(
        (feature) => <Polygon pathOptions={{color: 'purple'}} positions={feature.geometry.coordinates}/>
    )
}

