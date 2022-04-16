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
    Fade, Link,
    ListItem,
    ListItemIcon,
} from "@mui/material"
import * as React from "react"
import CardMedia from "@mui/material/CardMedia"
import List from "@mui/material/List"
import NaturePeopleIcon from "@mui/icons-material/NaturePeople"
import {useTheme} from "@mui/styles"
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import LinkIcon from '@mui/icons-material/Link';

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

    const avatars = {
        cardHeader: (
            <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                <NaturePeopleIcon/>
            </Avatar>
        ),
        location: (
            <ListItemIcon sx={{color: theme.palette.secondary.main, minWidth: 32}}>
                <LocationOnIcon/>
            </ListItemIcon>
        ),
        zoomIn: (
            <ListItemIcon sx={{color: theme.palette.primary.dark, minWidth: 32}}>
                <ZoomInMapIcon/>
            </ListItemIcon>
        ),
        zoomOut: (
            <ListItemIcon sx={{color: theme.palette.secondary.dark, minWidth: 32}}>
                <ZoomOutMapIcon/>
            </ListItemIcon>
        ),
        filter: (
        <ListItemIcon sx={{color: theme.palette.secondary.main, minWidth: 32}}>
            <FilterAltIcon/>
        </ListItemIcon>
    ),
        userMarker: (
        <ListItemIcon sx={{color: 'purple', minWidth: 32}}>
            <LocationOnIcon/>
        </ListItemIcon>
    ),
        locateUser: (
            <ListItemIcon sx={{color: theme.palette.secondary.main, minWidth: 32}}>
                <MyLocationIcon/>
            </ListItemIcon>
        ),
        directions: (
            <ListItemIcon sx={{color: theme.palette.primary.dark, minWidth: 32}}>
                <DirectionsWalkIcon/>
            </ListItemIcon>
        ),
        problem: (
            <ListItemIcon sx={{color: 'warning', minWidth: 32}}>
                <ReportProblemIcon/>
            </ListItemIcon>
        ),
        link: (
        <ListItemIcon sx={{color: theme.palette.primary.dark, minWidth: 32}}>
            <LinkIcon/>
        </ListItemIcon>
    ),
    }

    const urlHolder = {
        parkDirectory: 'https://www.edenprairie.org/amenities/parks-trails-recreation/parks/parks-directory',
        parkFinder: 'https://gis.edenprairie.org/ParkFinder/index.html',
        rentFacility: 'https://www.edenprairie.org/amenities/parks-trails-recreation/rent-a-park-facility',
        seeClickFix: 'https://www.edenprairie.org/i-want-to/report/maintenance-issue',
        parksAndRec: 'https://www.edenprairie.org/city-government/departments/parks-and-recreation',
        epMapsGIS: 'https://www.edenprairie.org/community/city-maps-and-gis'
    }


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

    const listItemStyles = {p: 1}

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
                                    avatar={avatars.cardHeader}
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
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography variant={'subtitle1'}>Explore</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <ListItem sx={listItemStyles}>
                                                {avatars.location}
                                                <Typography component={'div'} variant={'caption'}>
                                                    To explore a playground, tap the <Box component={"span"} fontWeight='fontWeightBold'>Map Marker</Box> for an Overview.
                                                </Typography>
                                            </ListItem>
                                            <ListItem sx={listItemStyles}>
                                                {avatars.zoomIn}
                                                <Typography component={'div'} variant={'caption'}>
                                                    In the Overview, tap <Box component={"span"} fontWeight='fontWeightBold'>Zoom In</Box> to highlight the playground's location.
                                                </Typography>
                                            </ListItem>
                                            <ListItem sx={listItemStyles}>
                                                {avatars.zoomOut}
                                                <Typography component={'div'} variant={'caption'}>
                                                    Tap <Box component={"span"} fontWeight='fontWeightBold'>Reset View </Box> to return the map view to its original position.
                                                </Typography>
                                            </ListItem>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography variant={'subtitle1'}>Filter & Search</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <ListItem sx={listItemStyles}>
                                                {avatars.filter}
                                                <Typography component={'div'} variant={'caption'}>
                                                    Use the <Box component={"span"} fontWeight='fontWeightBold'>Filter</Box> button search by distance or attributes, like equipment.
                                                </Typography>
                                            </ListItem>
                                            <ListItem sx={listItemStyles}>
                                                {avatars.locateUser}
                                                <Typography component={'div'} variant={'caption'}>
                                                    Tap the <Box component={"span"} fontWeight='fontWeightBold'>Locate</Box> button to center the map on your location.
                                                </Typography>
                                            </ListItem>
                                            <ListItem sx={listItemStyles}>
                                                {avatars.userMarker}
                                                <Typography component={'div'} variant={'caption'}>
                                                    You can also drag the <Box component={"span"} fontWeight='fontWeightBold'>Location Marker</Box> to the area you'd like to search.
                                                </Typography>
                                            </ListItem>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography variant={'subtitle1'}>Go There!</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <ListItem sx={listItemStyles}>
                                                {avatars.directions}
                                                <Typography component={'div'} variant={'caption'}>
                                                    In the Overview, the <Box component={"span"} fontWeight='fontWeightBold'>Go There!</Box> buttons will direct you to the park using your preferred mode of transit.
                                                </Typography>
                                            </ListItem>
                                            <ListItem sx={listItemStyles}>
                                                {avatars.location}
                                                <Typography component={'div'} variant={'caption'}>
                                                    <Box component={"span"} fontWeight='fontWeightBold'>Directions</Box> always point directly to the playground.  No more driving to the wrong side of the park!
                                                </Typography>
                                            </ListItem>
                                            <ListItem sx={listItemStyles}>
                                                {avatars.problem}
                                                <Typography component={'div'} variant={'caption'}>
                                                    If you find a problem on site, tap <Box component={"span"} fontWeight='fontWeightBold'>Report Problem</Box> to open  EP's SeeClickFix civic reporting tool.
                                                </Typography>
                                            </ListItem>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography variant={'subtitle1'}>Resources</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <Typography component={'div'} variant={'caption'}>
                                                This tool compliments other resources offered by the <Box component={"span"} fontWeight='fontWeightBold'>City of Eden Prairie:</Box>
                                            </Typography>
                                            <ListItem sx={listItemStyles}>
                                                {avatars.link}
                                                <Typography component={'div'} variant={'caption'}>
                                                    The <Link href={urlHolder.parkDirectory}>EP Parks Directory</Link> provides a list of all parks in Eden Prairie.
                                                </Typography>
                                            </ListItem>
                                            <ListItem sx={listItemStyles}>
                                                {avatars.link}
                                                <Typography component={'div'} variant={'caption'}>
                                                    The <Link href={urlHolder.parkFinder}>EP Park Finder</Link> is a moreo comprehensive tool to explore all of the city's outdoor activities.
                                                </Typography>
                                            </ListItem>
                                            <ListItem sx={listItemStyles}>
                                                {avatars.link}
                                                <Typography component={'div'} variant={'caption'}>
                                                    Many parks offer <Link href={urlHolder.rentFacility}>Rental Facilities</Link> available to city residents.
                                                </Typography>
                                            </ListItem>
                                            <ListItem sx={listItemStyles}>
                                                {avatars.link}
                                                <Typography component={'div'} variant={'caption'}>
                                                    Eden Prairie's <Link href={urlHolder.seeClickFix}>SeeClickFix</Link> can be used to report maintenance problems throughout the city.
                                                </Typography>
                                            </ListItem>
                                        </List>
                                        <Typography sx={{fontStyle: 'italic'}} variant={'caption'}>
                                            These sites were used as primary sources in the production of this app.
                                            <br/><br/>
                                            Many thanks to Eden Prairie's wonderful <Link href={urlHolder.parksAndRec}>Parks and Recreation</Link> & <Link href={urlHolder.epMapsGIS}>City Maps and GIS</Link> Departments for making this possible!
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </CardContent>
                        </Fade>
                    </Card>
                </Box>
            </Popup>
        </Marker>
    )
}