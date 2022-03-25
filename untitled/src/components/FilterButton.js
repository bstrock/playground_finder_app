import { useMemo } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Fab, Tooltip} from "@mui/material";

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
}

export default function SearchButton() {

    // Memoize the minimap so it's not affected by position changes
    const searchButton = useMemo(
        () => (
            <Fab sx={{bgcolor: 'green'}} size={'medium'}>
                <Tooltip title={'Filter Playgrounds'}>
                    <FilterAltIcon sx={ {color: 'white'} } />
                </Tooltip>
            </Fab>
        ),
        [],
    )

    return (
        <div className={'leaflet-bottom leaflet-left'}>
            <div className="leaflet-control leaflet-bar">{searchButton}</div>
        </div>
    )
}
