import * as React from 'react';
import {Avatar, Card, CardContent, CardHeader, Divider, Fade} from "@mui/material";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AssetTable from "./AssetTable";
import Box from "@mui/material/Box";
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import {useTheme} from "@mui/styles";

export default function EquipmentCard(props) {

    const {data, whichOne, distance} = props
    const theme = useTheme()
    const avatar = (whichOne) => {

        const avatarStore = {
            'equipment': <PlaylistAddCheckIcon/>,
            'amenities': <FamilyRestroomIcon/>,
            'sports_facilities': <SportsGymnasticsIcon/>
        }

        return (
            <Avatar sx={{bgcolor: theme.palette.primary.main}}>
                {avatarStore[whichOne]}
            </Avatar>
        )
    }

    console.log('equipment card')
    console.log(data)

    return (
        <Card sx={{display: 'block', height: '26em', border: 0, borderRadius: 0, boxShadow: 0}}>
            <CardHeader sx={{borderBottom: 1, borderColor: 'divider', textAlign: 'left', p: 1}}
                        title={data.site_name}
                        titleTypographyProps={{fontSize: '1.2rem', fontWeight: 1000}}
                        subheader={`${distance} miles away`}
                        subheaderTypographyProps={{fontStyle: 'italic'}}
                        avatar={avatar(whichOne)}/>
            <Fade in={true} timeout={700}>

                <CardContent sx={{
                    minHeight: 350,
                    maxHeight: 389,
                    p: 1,
                    pb: 0,
                }}>

                    <Box>
                        <Divider/>
                        <AssetTable data={data[whichOne]} whichOne={whichOne}/>
                        <Divider/>
                    </Box>

                </CardContent>
            </Fade>

        </Card>
    );
}
