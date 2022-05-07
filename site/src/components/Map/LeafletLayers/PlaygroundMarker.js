import {Marker, Popup, Tooltip, useMap} from "react-leaflet";
import Typography from "@mui/material/Typography";
import InfoBox from "../ParkPopup/InfoBox";
import React, {useEffect, useRef, useState} from "react";
import L from "leaflet";
import {useTheme} from "@mui/styles";

export default function PlaygroundMarker (props) {
    const {pointKey, geom, siteName, data, queryLocation, openSite, setOpenSite} = props
    const [refReady, setRefReady] = useState(false)
    let markerRef = useRef()
    const theme=useTheme()

    const markerURLBase = `https://api.geoapify.com/v1/icon/?type=material&color=${theme.palette.secondary.main.replace("#", '%23')}&size=medium&icon=nature_people`
    const apiKey = '&apiKey=2aa948af6f2d46f6b12acc10827cc689'

    const parkIcon = new L.Icon({
        iconUrl: `${markerURLBase}${apiKey}`,
        iconRetinaUrl: `${markerURLBase}&ScaleFactor=2${apiKey}`,
        iconAnchor: [15, 40],
        popupAnchor: [0, 0]
    })
    const map = useMap()

    useEffect(() => {
        if (refReady && data.site_id === openSite) {
            markerRef.openOn(map)
        }
    }, [map, openSite, markerRef, refReady, data.site_id]);

    return (
        <Marker key={pointKey + '-marker'}
            icon={parkIcon}
            position={geom}
            alt={siteName}
    >
        <Tooltip>
            <Typography>
                {siteName}
            </Typography>
        </Tooltip>
        {/* Generate Popup- the InfoBox is a complex object which displays our API attribute data */}
        <Popup ref={(r) => {
            markerRef = r
            setRefReady(true)
        }}
               eventHandlers={
                   {
                       onclose: () => setOpenSite(null)
                   }
               }
        >
            <InfoBox data={data}
                     queryLocation={queryLocation}/>
        </Popup>

    </Marker>
    )
}