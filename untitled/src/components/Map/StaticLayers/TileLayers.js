import {TileLayer} from "react-leaflet"
import React from "react"

function StreetLayer() {
    return (
        <TileLayer
            attribution={'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'}
            url={'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'}
            maxZoom={18}
            id={'mapbox/streets-v11'}
            tileSize={512}
            zoomOffset={-1}
            accessToken={'pk.eyJ1IjoiYnN0cm9jayIsImEiOiJja3cxZnN6MTRhMzBlMnVxcGtvZWtja3RhIn0.2Xs4HMBYwnUQh5wurxmeDA'}/>
    )
}

function SatelliteLayer() {
    return (
        <TileLayer
            attribution={'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'}
            url={'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'}
            id={'esri.world-imagery'}/>
    )
}

export {StreetLayer, SatelliteLayer}