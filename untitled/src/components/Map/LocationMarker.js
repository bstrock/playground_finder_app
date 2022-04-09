import {useEffect, useMemo, useRef, useState} from "react";
import {Marker, Popup, useMap} from "react-leaflet";
import L from 'leaflet'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function isMarkerInsidePolygon(latlng, poly) {
    const polyPoints = poly.getLatLngs()
    const x = latlng.lat, y = latlng.lng

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

export default function LocationMarker(props) {

    const map = useMap()

    const markerIcon = 'https://api.geoapify.com/v1/icon/?type=material&color=%23c000ff&icon=person&noWhiteCircle&apiKey=2aa948af6f2d46f6b12acc10827cc689'

    const userIcon = new L.Icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon,
        iconAnchor: [15, 40],
        popupAnchor: [0, 0]
    })

    const {setQueryLocation, userClickedLocate, queryLocation} = props

    const markerRef = useRef(null)

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    const latLng = marker.getLatLng()
                    setQueryLocation({latitude: latLng.lat, longitude: latLng.lng})
                }
            },
        }),
        [setQueryLocation],
    )

    useEffect(() => {
        if (userClickedLocate) {
            const mapStartBBox = map.getBounds()
            const bbPoly = L.polygon(mapStartBBox)

            map.locate().on("locationfound", function (e) {
                let latlng = e.latlng
                // FIX THIS!  1- doesn't work, 2- replace icon for generic marker
                // if (!isMarkerInsidePolygon(latlng, bbPoly)) {
                //     let marker = L.marker(mapStartPosition)
                //     latlng = mapStartPosition
                //     marker.addTo(map);
                // }
                setQueryLocation({latitude: latlng.lat, longitude: latlng.lng})
                map.flyTo(latlng, 13);
            })
        }
    }, [userClickedLocate, setQueryLocation, map])

    return (
        <Marker position={{lat: queryLocation.latitude, lng: queryLocation.longitude}}
                icon={userIcon}
                draggable={true}
                eventHandlers={eventHandlers}
                ref={markerRef}
        >
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