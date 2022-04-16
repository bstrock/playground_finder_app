import * as React from 'react'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import {
    Avatar,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Fade,
    Tooltip
} from "@mui/material"
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import IconButton from '@mui/material/IconButton'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import NaturePeopleIcon from "@mui/icons-material/NaturePeople"
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import Box from "@mui/material/Box"
import {useMap} from "react-leaflet"
import {useTheme} from "@mui/styles"
import LocationOnIcon from '@mui/icons-material/LocationOn'

export default function ParkCard(props) {

    const {data, distance} = props

    const map = useMap()
    const theme = useTheme()

    const avatar = () => {
        return (<Avatar sx={{bgcolor: theme.palette.primary.main}}>
            <NaturePeopleIcon/>
        </Avatar>)
    }
    const styles = {
        button: {
            mr: 1,
            ml: 1,
            mb: 0,
            mt: 0
        }
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const onClickUrl = (url) => {
        return () => openInNewTab(url)
    }

    const [lat, lon] = data.centroid

    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=`
    const fixURL = `https://seeclickfix.com/web_portal/HMhVHR4G4NEv79TUV8nhnP27/report/location?lat=${lat}&lng=${lon}`

    console.log('info box')
    console.log(data)

    return (
        <Card sx={{display: 'block', height: '22em', border: 1, borderRadius: 2}} variant={'outlined'}>
            <CardHeader sx={{borderBottom: 1, borderColor: 'divider', textAlign: 'left', p: 1}}
                        title={data.site_name}
                        subheader={`${distance} miles away`}
                        subheaderTypographyProps={{fontStyle: 'italic'}}
                        titleTypographyProps={{fontSize: '1.2rem', fontWeight: 1000}}
                        avatar={avatar()}/>
            <Fade in={true} timeout={700}>

                <CardContent sx={{
                    p: 1,
                    minHeight: 350,
                    backgroundImage: 'linear-gradient(48deg, rgba(210,255,112,1) 0%, rgba(255,255,255,1) 47%, rgba(219,255,191,1) 100%)'
                }}>

                    <CardMedia sx={{display: 'block', mb: 2}}
                               component="img"
                               height="135em"
                               image={require("../../../images/playgrounds/" + data.site_id + ".jpg")}
                               alt={data.site_name + ' photo'}/>

                        <Box sx={{display: 'flex', justifyContent: 'left', ml: 2, flexGrow: 1}}>
                            <IconButton sx={{ml: 1, mr: 1, p:0, color: theme.palette.common.black}}
                                        size={'medium'}
                                        onClick={() => {
                                            map.closePopup()
                                            map.flyTo([lat, lon], 18)
                                        }}
                            >
                                <LocationOnIcon sx={{display: 'flex', alignSelf: 'left', m: 1}} color={'primary'}/>
                            </IconButton>
                            <Typography display={'flex'} align={'left'} variant={'subtitle2'}>
                                {`${data.addr_street1}`}
                                <br/>
                                {`${data.addr_city}, ${data.addr_state} ${data.addr_zip}`}
                                <br/>
                            </Typography>
                        </Box>
                        <CardActions sx={{align: 'center', justifyContent: 'center'}}>
                            <ButtonGroup variant={'contained'} size={'medium'} sx={{bgcolor: 'primary.light'}}>
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
                                <Tooltip title={'Report Issue'}>
                                    <IconButton sx={{color: theme.palette.primary.dark}}
                                                size={'small'}
                                                onClick={onClickUrl(fixURL)}>
                                        <ReportProblemIcon />
                                    </IconButton>
                                </Tooltip>
                            </ButtonGroup>
                    </CardActions>
                    <Divider/>
                </CardContent>
            </Fade>

        </Card>
    )
}
