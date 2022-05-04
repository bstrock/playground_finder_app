import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useTheme} from "@mui/styles";

function createData(label, value) {
    const words = label.split("_")
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substring(1)
    }
    label = words.join(" ")
    return {label, value}
}

export default function AssetTable(props) {
    const {data, whichOne} = props

    console.log(whichOne)

    const theme = useTheme()

    const headers = {
        equipment: ['Equipment', 'Quantity'],
        amenities: ['Available Amenities', ''],
        sports_facilities: ['Nearby Sports Facilities', '']
    }

    const rows = []

    for (let key in data) {
        if (data[key] > 0) {
            let row = createData(key, data[key])
            rows.push(row)
        }
    }
    rows.sort((a, b) => b.value - a.value)

    let alpha_sort = {}

    for (let i = 0; i < rows.length; i++) {
        let value = String(rows[i].value)
        let keys = Object.keys(alpha_sort)

        if (!keys.includes(value)) {
            alpha_sort[value] = [rows[i]]
        } else if (keys.includes(value)) {
            alpha_sort[value].push(rows[i])
        }
    }

    let alpha_keys = Object.keys(alpha_sort)

    for (let i = 0; i < alpha_keys.length; i++) {
        let key = alpha_keys[i]
        let vals = alpha_sort[key]
        alpha_sort[key] = vals.sort((a, b) => a.label.localeCompare(b.label))
    }
    alpha_keys.reverse()
    let alpha_sorted_rows = []

    for (let i = 0; i < alpha_keys.length; i++) {
        let rows = alpha_sort[alpha_keys[i]]
        for (let j = 0; j < rows.length; j++) {
            alpha_sorted_rows.push(rows[j])
        }
    }

    return (
        <>
        <TableContainer style={{maxHeight: 300}}>

            <Table sx={{minWidth: 50}} stickyHeader>

                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight: 800, backgroundColor: theme.palette.primary.dark, color: 'white'}}>
                            {headers[whichOne][0]}
                        </TableCell>
                        <TableCell align="center"
                                   sx={{fontWeight: 800, backgroundColor: theme.palette.primary.dark, color: 'white'}}>
                            {headers[whichOne][1]}
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {alpha_sorted_rows.map((row) => (<TableRow
                        key={row.label}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        <TableCell sx={{p: 2, width: '4%'}}>
                            {row.label}
                        </TableCell>
                        <TableCell sx={{p: 2, width: '1%'}} align="center">
                            {whichOne === 'equipment' ? row.value : ''}
                        </TableCell>
                    </TableRow>))}
                </TableBody>

            </Table>

        </TableContainer>
    </>
    )
}