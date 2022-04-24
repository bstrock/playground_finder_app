import {ButtonGroup, CardActions, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ZoomInMapIcon from "@mui/icons-material/ZoomInMap";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import * as React from "react";
import {useMap} from "react-leaflet";
import {useTheme} from "@mui/styles";

export default function ParkCardActionBar(props) {
    const map = useMap()
    const theme = useTheme()

    const {lat, lon} = props

    const styles = {
        button: {
            mr: 1,
            ml: 1,
            mb: 0,
            mt: 0
        }
    }

    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=`
    const fixURL = `https://seeclickfix.com/web_portal/HMhVHR4G4NEv79TUV8nhnP27/report/location?lat=${lat}&lng=${lon}`

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const onClickUrl = (url) => {
        return () => openInNewTab(url)
    }

    return (
        <CardActions sx={{align: 'center', justifyContent: 'center'}}>
            <ButtonGroup sx={{}} size={'medium'}>
                <Tooltip title={'Zoom to Site'}>
                    <IconButton styles={styles.button}
                                sx={{color: theme.palette.info.main}}
                                size={'medium'}
                                onClick={() => {
                                    map.closePopup()
                                    map.flyTo([lat, lon], 18)
                                }}
                    >
                        <ZoomInMapIcon/>
                    </IconButton>
                </Tooltip>
                <ButtonGroup variant={'contained'} size={'medium'}>

                    <Tooltip title="Walk There!">
                        <IconButton styles={styles.button}
                                    sx={{color: theme.palette.primary.dark}}
                                    size={'medium'}
                                    onClick={onClickUrl(directionsUrl + 'walking')}>
                            <DirectionsWalkIcon/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Bike There!">
                        <IconButton styles={styles.button}
                                    sx={{color: theme.palette.primary.dark}}
                                    size={'medium'}
                                    onClick={onClickUrl(directionsUrl + 'bicycling')}>
                            <DirectionsBikeIcon/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Bus There!">
                        <IconButton styles={styles.button}
                                    sx={{color: theme.palette.primary.dark}}
                                    size={'medium'}
                                    onClick={onClickUrl(directionsUrl + 'transit')}>
                            <DirectionsBusIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Drive There!">
                        <IconButton styles={styles.button}
                                    sx={{color: theme.palette.primary.dark}}
                                    size={'medium'}
                                    onClick={onClickUrl(directionsUrl + 'driving')}>
                            <DirectionsCarIcon/>
                        </IconButton>
                    </Tooltip>
                </ButtonGroup>
                <Tooltip title={'Report Issue'}>
                    <IconButton sx={{color: theme.palette.warning.main}}
                                size={'small'}
                                onClick={onClickUrl(fixURL)}>
                        <ReportProblemIcon/>
                    </IconButton>
                </Tooltip>
            </ButtonGroup>
        </CardActions>
    )
}