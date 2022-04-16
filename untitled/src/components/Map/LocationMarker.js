import {useEffect, useMemo, useRef} from "react"
import {Marker, Popup, useMap} from "react-leaflet"
import L from 'leaflet'
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Fade,
} from "@mui/material"
import * as React from "react"
import CardMedia from "@mui/material/CardMedia"
import NaturePeopleIcon from "@mui/icons-material/NaturePeople"
import {useTheme} from "@mui/styles"
import UserGuide from "./UserGuide"

export default function LocationMarker(props) {
    // destructure props
    const {setQueryLocation, userClickedLocate, queryLocation} = props

    // hooks
    const map = useMap()
    const markerRef = useRef(null)
    const theme = useTheme()

    // get icons
    const markerIcon = 'https://api.geoapify.com/v1/icon/?type=material&color=%23c000ff&icon=person&noWhiteCircle&apiKey=2aa948af6f2d46f6b12acc10827cc689'
    const userIcon = new L.Icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon,
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
                    if (marker != null) {
                        const latLng = marker.getLatLng()
                        setQueryLocation({latitude: latLng.lat, longitude: latLng.lng})
                    }
                },
            }
        ),
        [setQueryLocation]
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
                    map.flyTo(latlng, 13);
                })
            }
        }, [userClickedLocate, setQueryLocation, map]
    )

    return (
        <Marker position={{lat: queryLocation.latitude, lng: queryLocation.longitude}}
                icon={userIcon}
                draggable={true}
                eventHandlers={markerWasMoved}
                ref={markerRef}
        >
            <Popup>
                <Box>
                    <Card sx={{display: 'block', border: 1, borderRadius: 2}} variant={'outlined'}>
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
                                backgroundImage: 'linear-gradient(48deg, rgba(210,255,112,1) 0%, rgba(255,255,255,1) 47%, rgba(219,255,191,1) 100%)'
                            }}>
                                <CardMedia sx={{display: 'block', mb: 1}}
                                           component="img"
                                           height="90em"
                                           image={require("../../images/hero.png")}
                                           alt={'child climbing on playground'}/>
                                <Typography variant={'subtitle2'}>
                                    This app will help you <Box component={"span"} fontWeight='fontWeightBold'>find and explore</Box> all 28 of the amazing public <Box component={"span"} fontWeight='fontWeightBold'>playgrounds</Box> in the community of Eden Prairie, Minnesota.
                                </Typography>
                                <br/>
                                <Typography variant={'subtitle1'} fontWeight={'fontWeightBold'}>
                                    User Guide
                                    <br/>
                                </Typography>

                                <UserGuide/>

                            </CardContent>
                        </Fade>
                    </Card>
                </Box>
            </Popup>
        </Marker>
    )
}