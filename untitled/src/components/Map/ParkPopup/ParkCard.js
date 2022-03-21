import * as React from 'react';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import {Avatar, Card, CardActions, CardContent, CardHeader, Divider, Tooltip} from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import IconButton from '@mui/material/IconButton'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

export default function ParkCard(props) {

    const avatar = () => {
        return (
            <Avatar sx={{bgcolor: 'green'}}>
            <NaturePeopleIcon />
        </Avatar>)
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const onClickUrl = (url) => {
        return () => openInNewTab(url)
    }

    const [lat, lon] = props.data.centroid
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=`

    console.log('info box')
    console.log(props.data)

    return (
        <Card sx={ { display: 'block', minHeight: 300, maxHeight: 500} } variant={'outlined'}>
            <CardContent sx={ { p: 1, backgroundImage: 'linear-gradient(48deg, rgba(210,255,112,1) 0%, rgba(255,255,255,1) 47%, rgba(219,255,191,1) 100%)'} }>

                <CardHeader sx={ {borderBottom: 1, borderColor: 'divider', textAlign: 'center', p: 1} }
                            title={props.data.site_name}
                            titleTypographyProps={{fontSize: '1.2rem'}}
                            avatar={avatar()}/>

                <CardMedia sx={ {display: 'block', mb: 2} }
                           component="img"
                           height="80%"
                           image={require ("../../../images/playgrounds/" + props.data.site_id + ".jpg")}
                           alt={props.data.site_name + ' photo'}/>

                <Typography align={'center'} variant={'subtitle1'}>
                    {props.data.addr_street1}
                </Typography>
                <Typography align={'center'} variant={'subtitle2'}>
                    {`${props.data.addr_city}, ${props.data.addr_state} ${props.data.addr_zip}`}
                </Typography>

                <Divider />

                <CardActions sx={ {align: 'center', justifyContent: 'center'} }>
                    <Tooltip title="Walk There!">
                        <IconButton sx={ {color: 'black'} }
                                    size={'large'}
                                    onClick={onClickUrl(url + 'walking')}>
                            <DirectionsWalkIcon color={'primary'} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Bike There!">
                        <IconButton sx={ {color: 'black'} }
                                    size={'large'}
                                    onClick={onClickUrl(url + 'bicycling')}>
                            <DirectionsBikeIcon color={'primary'} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Bus There!">
                        <IconButton sx={ {color: 'black'} }
                                    size={'large'}
                                    onClick={onClickUrl(url + 'transit')}>
                            <DirectionsBusIcon color={'primary'} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Drive There!">
                        <IconButton sx={ {color: 'black'} }
                                    size={'large'}
                                    onClick={onClickUrl(url + 'driving')}>
                            <DirectionsCarIcon color={'primary'} />
                        </IconButton>
                    </Tooltip>

                </CardActions>
                <Divider />
            </CardContent>
        </Card>
    );
}
