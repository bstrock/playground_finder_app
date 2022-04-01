import { useMemo } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {Fab, Tooltip} from "@mui/material";

export default function FilterButton(props) {

    const searchButton = useMemo(
        () => (
            <Fab sx={{bgcolor: 'green'}}
                 size={'medium'}
                 onClick={props.clickFunc}
            >
                <Tooltip title={'Filter Playgrounds'}>
                    <FilterAltIcon sx={{color: 'white'}} />
                </Tooltip>
            </Fab>
        )
    )

    return (
        <div className={'leaflet-bottom leaflet-left'}>
            <div className="leaflet-control leaflet-bar">{searchButton}</div>
        </div>
    )
}
