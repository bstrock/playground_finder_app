import * as React from 'react'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import {Avatar, ButtonGroup, Card, CardActions, CardContent, CardHeader, Divider, Fade, Tooltip} from "@mui/material"
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import IconButton from '@mui/material/IconButton'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import NaturePeopleIcon from "@mui/icons-material/NaturePeople"
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus'
import Box from "@mui/material/Box";
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import {useMap} from "react-leaflet";

export default function ParkCard(props) {

    const {data} = props

    const map = useMap()

    const avatar = () => {
        return (
            <Avatar sx={{bgcolor: 'green'}}>
                <NaturePeopleIcon/>
            </Avatar>)
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const onClickUrl = (url) => {
        return () => openInNewTab(url)
    }

    const [lat, lon] = data.centroid
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=`

    console.log('info box')
    console.log(data)

    return (
        <Card sx={{display: 'block', height: '22em', border: 1, borderRadius: 2}} variant={'outlined'}>
            <CardHeader sx={{borderBottom: 1, borderColor: 'divider', textAlign: 'center', p: 1}}
                        title={data.site_name}
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
                    <Box>
                        <Box sx={{display: 'flex', width: '30rem', justifyContent: 'flex-start'}}>
                            <Typography align={'left'} variant={'subtitle1'}>

                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'flex-start', ml: 6}}>
                            <Typography display={'block'} align={'left'} variant={'subtitle2'}>
                                {`${data.addr_street1}`}
                                <br/>
                                {`${data.addr_city}, ${data.addr_state} ${data.addr_zip}`}
                            </Typography>
                            <IconButton sx={{ml: 1, display: 'flex', color: 'black', justifySelf: 'flex-end'}}
                                        size={'medium'}
                                        onClick={() => {
                                            map.closePopup()
                                            map.flyTo([lat, lon], 18)
                                        }}
                            >
                                <ZoomInMapIcon color={'primary'}/>
                            </IconButton>
                        </Box>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>


                    </Box>
                    <CardActions sx={{align: 'center', justifyContent: 'center'}}>
                        <ButtonGroup variant={'contained'} size={'large'}>
                            <Tooltip title="Walk There!">
                                <IconButton sx={{color: 'black'}}
                                            size={'large'}
                                            onClick={onClickUrl(url + 'walking')}>
                                    <DirectionsWalkIcon color={'primary'}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Bike There!">
                                <IconButton sx={{color: 'black'}}
                                            size={'large'}
                                            onClick={onClickUrl(url + 'bicycling')}>
                                    <DirectionsBikeIcon color={'primary'}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Bus There!">
                                <IconButton sx={{color: 'black'}}
                                            size={'large'}
                                            onClick={onClickUrl(url + 'transit')}>
                                    <DirectionsBusIcon color={'primary'}/>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Drive There!">
                                <IconButton sx={{color: 'black'}}
                                            size={'large'}
                                            onClick={onClickUrl(url + 'driving')}>
                                    <DirectionsCarIcon color={'primary'}/>
                                </IconButton>
                            </Tooltip>
                        </ButtonGroup>

                    </CardActions>
                    <Divider/>
                </CardContent>
            </Fade>

        </Card>
    );
}
