import {useEffect, useState} from "react";
import {Marker, Popup, useMap} from "react-leaflet";
import L from 'leaflet'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function isMarkerInsidePolygon(marker, poly) {
    const polyPoints = poly.getLatLngs()
    const x = marker.getLatLng().lat, y = marker.getLatLng().lng

    let inside = false
    for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
        const xi = polyPoints[i].lat, yi = polyPoints[i].lng
        const xj = polyPoints[j].lat, yj = polyPoints[j].lng

        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
        if (intersect) inside = !inside
    }

    return inside
}

export default function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    const markerIcon = 'https://api.geoapify.com/v1/icon/?type=material&color=%23c000ff&icon=person&noWhiteCircle&apiKey=2aa948af6f2d46f6b12acc10827cc689'

    const userIcon = new L.Icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon,
        iconAnchor: [15, 40],
        popupAnchor: [0, 0]
    })


    useEffect(() => {
        const mapStartPosition = map.getCenter()
        const mapStartBBox = map.getBounds()
        const bbPoly = L.polygon(mapStartBBox)

        map.locate().on("locationfound", function (e) {
            let marker = L.marker(e.latlng)
            let latlng = e.latlng
            let box = e.bounds.toBBoxString().split(",")
            if (!isMarkerInsidePolygon(marker, bbPoly)) {
                marker = L.marker(mapStartPosition)
                latlng = mapStartPosition
                box = mapStartBBox
            }
            setPosition(latlng);
            map.flyTo(latlng, 13);
            marker.addTo(map);
            setBbox(box);
        });
    }, [map]);

    return position === null ? null : (
        <Marker position={position} icon={userIcon}>
            <Popup>
                <Box>
                    <Typography align={'center'} variant={'subtitle1'}>
                        Here you are!
                    </Typography>
                    <Typography align={'center'} variant={'subtitle2'}>
                        Click on a Pin to explore a nearby playground, or use the Filter button to search nearby!
                    </Typography>
                </Box>
            </Popup>
        </Marker>
    );
}