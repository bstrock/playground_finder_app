import * as React from 'react';
import {Avatar, Card, CardActions, CardContent, CardHeader, Divider} from "@mui/material";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import BasicTable from "./EquipmentTable";
import Box from "@mui/material/Box";

export default function EquipmentCard(props) {

    const avatar = () => {
        return (
            <Avatar sx={{bgcolor: 'green'}}>
                <PlaylistAddCheckIcon />
            </Avatar>)
    }

    console.log('equipment card')
    console.log(props.data)

    return (
        <Card sx={ { display: 'block', minHeight: 300, maxHeight: 500} } variant={'outlined'}>
            <CardContent sx={{ p: 1, backgroundImage: 'linear-gradient(48deg, rgba(210,255,112,1) 0%, rgba(255,255,255,1) 47%, rgba(219,255,191,1) 100%)'}}>

                <CardHeader sx={ {borderBottom: 1, borderColor: 'divider', textAlign: 'center', p: 1} }
                            title={props.data.site_name}
                            titleTypographyProps={ {fontSize: '1.2rem'} }
                            avatar={avatar()} />

                <Box >
                    <Divider />
                    <BasicTable equipment={props.data.equipment} />
                    <Divider />
                </Box>

            </CardContent>
        </Card>
    );
}
