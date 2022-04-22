import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Typography from "@mui/material/Typography"
import AccordionDetails from "@mui/material/AccordionDetails"
import List from "@mui/material/List"
import {Link, ListItem, ListItemIcon} from "@mui/material"
import Box from "@mui/material/Box"
import * as React from "react"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap"
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import MyLocationIcon from "@mui/icons-material/MyLocation"
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk"
import ReportProblemIcon from "@mui/icons-material/ReportProblem"
import {useTheme} from "@mui/styles"
import {useState} from "react"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import LayersIcon from '@mui/icons-material/Layers'
import HouseSidingIcon from '@mui/icons-material/HouseSiding'

export default function UserGuide() {

    const theme = useTheme()

    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const avatars = {
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
            <ListItemIcon sx={{color: theme.palette.info, minWidth: 32}}>
                <ZoomOutMapIcon/>
            </ListItemIcon>
        ),
        filter: (

            <ListItemIcon sx={{color: theme.palette.primary.main, minWidth: 32}}>
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
            <ListItemIcon sx={{color: '#BCBE14', minWidth: 32}}>
                <ReportProblemIcon/>
            </ListItemIcon>
        ),
        directoryLink: (
            <ListItemIcon sx={{color: theme.palette.primary.dark, minWidth: 32}}>
                <FormatListBulletedIcon/>
            </ListItemIcon>
        ),
        parkFinderLink: (
            <ListItemIcon sx={{color: theme.palette.secondary.main, minWidth: 32}}>
                <LayersIcon/>
            </ListItemIcon>
        ),
        rentalLink: (
            <ListItemIcon sx={{color: theme.palette.info, minWidth: 32}}>
                <HouseSidingIcon/>
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

    const listItemStyles = {p: 1}

    const styles = {
        accordionSummary: {
            height: '1em',
            justifyContent: 'center',
            alignContent: 'center',
            width: 'fixed'
        }
    }

    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary styles={styles.accordionSummary}
                                  expandIcon={<ExpandMoreIcon/>}
                                  id="panel1a-header"
                >
                    <Typography variant={'subtitle1'}>Explore</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <ListItem sx={listItemStyles}>
                            {avatars.location}
                            <Typography component={'div'} variant={'body2'}>
                                To explore a playground, tap the <Box component={"span"} fontWeight='fontWeightBold'>Map
                                Marker</Box> for an Overview.
                            </Typography>
                        </ListItem>
                        <ListItem sx={listItemStyles}>
                            {avatars.zoomIn}
                            <Typography component={'div'} variant={'body2'}>
                                In the Overview, tap <Box component={"span"} fontWeight='fontWeightBold'>Zoom
                                In</Box> to highlight the playground's location.
                            </Typography>
                        </ListItem>
                        <ListItem sx={listItemStyles}>
                            {avatars.zoomOut}
                            <Typography component={'div'} variant={'body2'}>
                                Tap <Box component={"span"} fontWeight='fontWeightBold'>Reset View </Box> to return the
                                map view to its original position.
                            </Typography>
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    id="panel2a-header"
                >
                    <Typography variant={'subtitle1'}>Filter & Search</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <ListItem sx={listItemStyles}>
                            {avatars.filter}
                            <Typography component={'div'} variant={'body2'}>
                                Use the <Box component={"span"} fontWeight='fontWeightBold'>Filter</Box> button search
                                by distance or attributes, like equipment.
                            </Typography>
                        </ListItem>
                        <ListItem sx={listItemStyles}>
                            {avatars.locateUser}
                            <Typography component={'div'} variant={'body2'}>
                                Tap the <Box component={"span"} fontWeight='fontWeightBold'>Locate</Box> button to
                                center the map on your location.
                            </Typography>
                        </ListItem>
                        <ListItem sx={listItemStyles}>
                            {avatars.userMarker}
                            <Typography component={'div'} variant={'body2'}>
                                You can also drag the <Box component={"span"} fontWeight='fontWeightBold'>Location
                                Marker</Box> to the area you'd like to search.
                            </Typography>
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    id="panel3a-header"
                >
                    <Typography variant={'subtitle1'}>Go There!</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <ListItem sx={listItemStyles}>
                            {avatars.directions}
                            <Typography component={'div'} variant={'body2'}>
                                In the Overview, the <Box component={"span"} fontWeight='fontWeightBold'>Go
                                There!</Box> buttons will direct you to the park using your preferred mode of transit.
                            </Typography>
                        </ListItem>
                        <ListItem sx={listItemStyles}>
                            {avatars.location}
                            <Typography component={'div'} variant={'body2'}>
                                <Box component={"span"} fontWeight='fontWeightBold'>Directions</Box> always point
                                directly to the playground. No more driving to the wrong side of the park!
                            </Typography>
                        </ListItem>
                        <ListItem sx={listItemStyles}>
                            {avatars.problem}
                            <Typography component={'div'} variant={'body2'}>
                                If you find a problem on site, tap <Box component={"span"} fontWeight='fontWeightBold'>Report
                                Problem</Box> to open EP's SeeClickFix civic reporting tool.
                            </Typography>
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    id="panel4a-header"
                >
                    <Typography variant={'subtitle1'}>Resources</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <Typography component={'div'} variant={'body2'}>
                            This tool compliments other resources offered by the <Box component={"span"}
                                                                                      fontWeight='fontWeightBold'>City
                            of Eden Prairie:</Box>
                        </Typography>
                        <ListItem sx={listItemStyles}>
                            {avatars.directoryLink}
                            <Typography component={'div'} variant={'body2'}>
                                <Link href={urlHolder.parkDirectory}>EP Parks Directory</Link>
                            </Typography>
                        </ListItem>
                        <ListItem sx={listItemStyles}>
                            {avatars.parkFinderLink}
                            <Typography component={'div'} variant={'body2'}>
                                <Link href={urlHolder.parkFinder}>EP Park Finder</Link>
                            </Typography>
                        </ListItem>
                        <ListItem sx={listItemStyles}>
                            {avatars.rentalLink}
                            <Typography component={'div'} variant={'body2'}>
                                <Link href={urlHolder.rentFacility}>Rental Facilities in EP Parks</Link>
                            </Typography>
                        </ListItem>
                        <ListItem sx={listItemStyles}>
                            {avatars.problem}
                            <Typography component={'div'} variant={'body2'}>
                                <Link href={urlHolder.seeClickFix}>SeeClickFix Home</Link>
                            </Typography>
                        </ListItem>
                    </List>
                    <Typography sx={{fontStyle: 'italic'}} variant={'body2'}>
                        These sites were used as primary sources in the production of this app.
                        <br/><br/>
                        Many thanks to Eden Prairie's wonderful <Link href={urlHolder.parksAndRec}>Parks and
                        Recreation</Link> & <Link href={urlHolder.epMapsGIS}>City Maps and GIS</Link> Departments for
                        making this possible!
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    )

}