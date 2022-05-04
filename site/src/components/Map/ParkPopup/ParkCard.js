import * as React from 'react'
import CardMedia from '@mui/material/CardMedia'
import {
    Avatar,
    Card,
    CardContent,
    CardHeader, Chip,
    Fade, Tooltip,
} from "@mui/material"
import NaturePeopleIcon from "@mui/icons-material/NaturePeople"
import AddressBlock from './AddressBlock'
import {useTheme} from "@mui/styles"
import ParkCardActionBar from "./ParkCardActionBar";
import Box from "@mui/material/Box";
import StairsIcon from '@mui/icons-material/Stairs';
import Icon from "@mdi/react";
import { mdiTowerFire, mdiSlide, mdiLadder } from '@mdi/js';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function ParkCard(props) {

    const {data, distance} = props
    const theme = useTheme()

    const avatar = (
            <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                <NaturePeopleIcon/>
            </Avatar>
        )

    return (
        <Card sx={{display: 'block', height: '26em', border: 0, borderRadius: 0, boxShadow: 0}}>
            <CardHeader sx={{borderBottom: 1, borderColor: 'divider', textAlign: 'left', p: 1}}
                        title={data.site_name}
                        subheader={`${distance} miles away`}
                        subheaderTypographyProps={{fontStyle: 'italic'}}
                        titleTypographyProps={{fontSize: '1.2rem', fontWeight: 1000}}
                        avatar={avatar}
            />
            <Fade in={true} timeout={700}>

                <CardContent sx={{p: 0}}>
                    <CardMedia sx={{display: 'block', mb: 2, ml: 0, mr: 0}}
                               component="img"
                               height="135em"
                               image={require("../../../images/playgrounds/" + data.site_id + ".jpg")}
                               alt={data.site_name + ' photo'}
                    />

                    <AddressBlock street={data.addr_street1}
                                  city={data.addr_city}
                                  state={data.addr_state}
                                  zip={data.addr_zip}
                    />

                    <Box sx={{mt: 1, mb: 1, display: 'flex', justifyContent: 'center'}}>
                        <Tooltip title={'Play Towers'}>
                            <Chip sx={{mr: 1}} color={'primary'} icon={<Icon size={1} path={mdiTowerFire} color={'white'}/>} size='large' label={data.equipment['play_towers']}/>
                        </Tooltip>
                        <Tooltip title={'Slides'}>
                            <Chip sx={{mr: 1}} color={'primary'} icon={<Icon size={1} path={mdiSlide} color={'white'}/>} size='large' label={data.equipment['slides']}/>
                        </Tooltip>
                        <Tooltip title={'Staircases'}>
                            <Chip sx={{mr: 1}} color={'primary'} icon={<StairsIcon color={'white'}/>} size='large' label={data.equipment['staircases']}/>
                        </Tooltip>
                        <Tooltip title={'Climbers'}>
                            <Chip sx={{mr: 1}} color={'primary'} icon={<Icon size={1} path={mdiLadder} color={'white'}/>} size='large' label={data.equipment['climbers']}/>
                        </Tooltip>
                    </Box>

                    <Divider/>
                    <Typography sx={{m:0}} fontStyle={'italic'} variant={'subtitle2'}>
                    Go There!
                    </Typography>
                    <ParkCardActionBar lat={data.centroid[0]}
                                       lon={data.centroid[1]}
                    />

                </CardContent>
            </Fade>
        </Card>
    )
}
