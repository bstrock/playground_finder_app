import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useEffect, useState} from "react";
import {useMap} from "react-leaflet";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Popper} from "@mui/material";

export default function ParkList(props) {
    const {data, searchList, setSearchList, setOpenSite, setDrawerOpen, initQueryParams, setQueryParams} = props
    const map = useMap()
    const [selected, setSelected] = useState(null)


    const onChange = (e, value) => value === null ? setSelected(null) : setSelected(value.id)

    useEffect(
        () => {
            if (data !== null && searchList.length === 0) {
                const listContent = []
                for (let i = 0; i < data.features.length; i++) {
                    listContent.push(
                        {
                            label: data.features[i].properties.site_name,
                            id: data.features[i].properties.site_id
                        }
                    )
                }
                if (listContent.length > 0) {
                    listContent.sort((a, b) => a.label.localeCompare(b.label))
                    setSearchList(listContent)
                }
            }
        }, [data, searchList, setSearchList]
    )

    const onClick = () => {
        for (let i = 0; i < data.features.length; i++) {
            if (data.features[i].properties.site_id === selected) {
                setDrawerOpen(false)
                map.closePopup()
                setQueryParams(initQueryParams)
                const selectedPark = data.features[i].properties
                const centroid = selectedPark.centroid
                setOpenSite(selectedPark.site_id)
                map.flyTo([ centroid[0] +.025, centroid[1]], 13)
                break
            }
        }
    }

    const autoCompletePopper = function (props) {
        return (<Popper {...props} style={{ width: 250 }} placement='top-start' />)
    }

    return (
        searchList.length === 0 ? null :
            <Box sx={{display: 'flex', width: '18em', height: '5rem'}}>
                <Autocomplete
                    autoComplete={true}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    id="search-by-name"
                    options={searchList}
                    sx={{justifySelf: 'flex-start', width: '15em', height: '3rem'}}
                    onChange={onChange}
                    componentsProps={autoCompletePopper()}
                    renderInput={(params) => <TextField {...params}
                                                        label="Search for a park..."
                                                        placeholder={'Search for a park...'}
                    />}
                />
                    <Button sx={{justifySelf: 'flex-end', flexShrink: 1, width: '3rem', height: '2.9rem'}}
                            color={'primary'}
                            variant={'contained'}
                            disabled={selected === null}
                            onClick={onClick}
                    >
                        <Typography sx={{fontSize: 18}}>
                        Go!
                        </Typography>
                    </Button>

            </Box>
    )
}