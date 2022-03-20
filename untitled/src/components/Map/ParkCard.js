import * as React from 'react';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import {Avatar, Card, CardActions, CardContent, CardHeader, Divider} from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import IconButton from '@mui/material/IconButton'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
export default function ParkCard(props) {

    const avatar = () => {
        return (
            <Avatar sx={{bgcolor: 'green'}}>
            <NaturePeopleIcon />
        </Avatar>)
    }

    const center = [null, null]

    const directions = {
        walk: `https://www.google.com/maps/dir/Current+Location/${center.lat},${center.lon}`,
        bike: `https://www.google.com/maps/dir/Current+Location/${center.lat},${center.lon}`,
        drive: `https://www.google.com/maps/dir/Current+Location/${center.lat},${center.lon}`
    }

    console.log('info box')
    console.log(props.data)

    return (
        <Card sx={ { display: 'block'} } variant={'outlined'}>
            <CardContent sx={{ p: 1, backgroundImage: 'linear-gradient(48deg, rgba(210,255,112,1) 0%, rgba(255,255,255,1) 47%, rgba(219,255,191,1) 100%)'}}>

                <CardHeader sx={ {borderBottom: 1, borderColor: 'divider', textAlign: 'center', p: 1} }
                            title={props.data.site_name}
                            titleTypographyProps={{fontSize: '1.2rem'}}
                            avatar={avatar()}/>

                <CardMedia sx={ {display: 'block', mb: 2} }
                           component="img"
                           height="80%"
                           image={require ("../../images/" + props.data.site_id + ".jpg")}
                           alt={props.data.site_name + ' photo'}/>

                <Typography align={'center'} variant={'h6'}>
                    {props.data.addr_street1}
                </Typography>
                <Typography align={'center'} variant={'subtitle1'}>
                    {`${props.data.addr_city}, ${props.data.addr_state} ${props.data.addr_zip}`}
                </Typography>

                <Divider />

                <CardActions sx={ {align: 'center', justifyContent: 'center'} }>

                    <IconButton sx={ {color: 'black'} }
                                size={'large'}
                                href={directions.walk}>
                        <DirectionsWalkIcon />
                    </IconButton>

                    <IconButton sx={ {color: 'black'} }
                                size={'large'}
                                href={directions.bike}>
                        <DirectionsBikeIcon />
                    </IconButton>

                    <IconButton sx={ {color: 'black'} }
                                size={'large'}
                                href={directions.drive}>
                        <DirectionsCarIcon />
                    </IconButton>

                </CardActions>
                <Divider />
            </CardContent>
        </Card>
    );
}
