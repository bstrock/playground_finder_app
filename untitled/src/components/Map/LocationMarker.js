import {useEffect, useMemo, useState} from "react"
import {Marker, Popup, useMap} from "react-leaflet"
import L from 'leaflet'
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import {
    Avatar,
    Card, CardActions,
    CardContent,
    CardHeader,
    Fade,
} from "@mui/material"
import * as React from "react"
import CardMedia from "@mui/material/CardMedia"
import NaturePeopleIcon from "@mui/icons-material/NaturePeople"
import {useTheme} from "@mui/styles"
import UserGuide from "./UserGuide"
import Button from "@mui/material/Button";

export default function LocationMarker(props) {
    // destructure props
    const {
        setQueryLocation,
        userClickedLocate,
        setUserClickedLocate,
        queryLocation,
        markerRef,
        initLocation,
        zoomFunc,
        setZoom
    } = props

    // hooks
    const map = useMap()
    const theme = useTheme()

    const [userClickedReset, setUserClickedReset] = useState(false)

    // get icons
    const userIconURL = `https://api.geoapify.com/v1/icon/?type=material&color=${theme.palette.info.main.replace("#", '%23')}&icon=person&noWhiteCircle&apiKey=2aa948af6f2d46f6b12acc10827cc689`
    const searchIconURL = `https://api.geoapify.com/v1/icon/?type=material&color=${theme.palette.info.main.replace("#", '%23')}&icon=search&apiKey=2aa948af6f2d46f6b12acc10827cc689`
    const userIcon = new L.Icon({
        iconUrl: userIconURL,
        iconRetinaUrl: userIconURL,
        iconAnchor: [15, 40],
        popupAnchor: [0, 0]
    })

    const searchIcon = new L.Icon({
        iconUrl: searchIconURL,
        iconRetinaUrl: searchIconURL,
        iconAnchor: [15, 40],
        popupAnchor: [0, 0]
    })

    const cardHeaderAvatar = (
        <Avatar sx={{bgcolor: theme.palette.primary.main}}>
            <NaturePeopleIcon/>
        </Avatar>
    )

    // callback handling marker placement by user drag action
    // sets query location when marker is moved
    const markerWasMoved = useMemo(
        () => (
            {
                dragend() {
                    const marker = markerRef.current
                    const latLng = marker.getLatLng()
                    setQueryLocation({latitude: latLng.lat, longitude: latLng.lng})
                    setUserClickedLocate(false)

                }
            }
        ),
        [markerRef, setQueryLocation, setUserClickedLocate]
    )

    // location button callback
    useEffect(
        () => {
            // leaflet requires user location to be retrieved after user input
            // let's give them a button to click so that we can find them and move the view accordingly
            if (userClickedLocate) {
                map.locate().on("locationfound", function (e) {
                    let latlng = e.latlng
                    setQueryLocation({latitude: latlng.lat, longitude: latlng.lng})
                    map.flyTo(latlng, 13)
                })
            }
        }, [userClickedLocate, setQueryLocation, map]
    )

    // reset button callback
    useEffect(
        () => {
            if (userClickedReset) {
                setUserClickedReset(false)
                setUserClickedLocate(false)
                map.closePopup()
                const newZoom = zoomFunc()
                setZoom(newZoom)
                map.flyTo([initLocation.latitude, initLocation.longitude], newZoom)
                setQueryLocation(initLocation)
            }
        }, [initLocation, setQueryLocation, userClickedReset, setUserClickedReset, map, zoomFunc, setZoom, setUserClickedLocate]
    )

    return (
        <Marker position={{lat: queryLocation.latitude, lng: queryLocation.longitude}}
                icon={userClickedLocate ? userIcon : searchIcon}
                draggable={true}
                eventHandlers={markerWasMoved}
                ref={markerRef}
                zIndexOffset={500}
        >
            <Popup>
                <Box>
                    <Card sx={{display: 'block', border: 0, borderRadius: 0, boxShadow: 0}}>
                        <CardHeader sx={{borderBottom: 1, borderColor: 'divider', textAlign: 'left', p: 1}}
                                    title={'Eden Prairie Playgrounds'}
                                    titleTypographyProps={{fontSize: '1.2rem', fontWeight: 1000}}
                                    subheader={"Let's find a place to play!"}
                                    subheaderTypographyProps={{fontStyle: 'italic'}}
                                    avatar={cardHeaderAvatar}
                            />
                        <Fade in={true} timeout={700}>

                            <CardContent sx={{
                                p: 1,
                                minHeight: 350,
                            }}>
                                <CardMedia sx={{display: 'block', mb: 1}}
                                           component="img"
                                           height="90em"
                                           image={require("../../images/hero.png")}
                                           alt={'child climbing on playground'}/>
                                <Typography variant={'subtitle2'}>
                                    This app will help you <Box component={"span"} fontWeight='fontWeightBold'>find and explore</Box> all 29 of the amazing public <Box component={"span"} fontWeight='fontWeightBold'>playgrounds</Box> in the community of Eden Prairie, Minnesota.
                                </Typography>
                                <br/>
                                <Typography sx={{textAlign: 'center'}} variant={'subtitle1'} fontWeight={'fontWeightBold'}>
                                    User Guide
                                    <br/>
                                </Typography>

                                <UserGuide/>

                            </CardContent>
                        </Fade>
                        <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                            <Box sx={{textAlign: 'center'}}>
                                {//conditional rendering for reset marker button...only appears when marker is not in start location
                                    (queryLocation.latitude !== initLocation.latitude &&
                                        queryLocation.longitude !== initLocation.longitude) ? (
                                    <Button variant={'outlined'}
                                    onClick={() => setUserClickedReset(true)}
                                    >
                                    Reset Marker
                                    </Button>
                                    ) : null
                                }

                            </Box>
                        </CardActions>
                    </Card>
                </Box>
            </Popup>
        </Marker>
    )
}