import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(label, value) {

    const words = label.split("_");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }
    label = words.join(" ");
    return {label, value}
}

export default function AssetTable(props) {
    console.log(props)

    const headers = {
        equipment: ['Equipment', 'Quantity'],
        amenities: ['Available Amenities', ''],
        sports_facilities: ['Nearby Sports Facilities', '']
    }

    const rows = []

    for (let key in props.data) {
        if (props.data[key] > 0) {
            let row = createData(key, props.data[key])
            rows.push(row)
        }
    }
    rows.sort((a, b) => b.value - a.value)

    let alpha_sort = {}

    for (let i = 0; i < rows.length; i++) {
        let value = String(rows[i].value)
        let keys = Object.keys(alpha_sort)
        console.log(keys)
        if (!keys.includes(value)) {
            alpha_sort[value] = [rows[i]]
            console.log('added key')
        } else if (keys.includes(value)) {
            alpha_sort[value].push(rows[i])
            console.log('pushed key')
        }
    }
    console.log(alpha_sort)
    let alpha_keys = Object.keys(alpha_sort)

    for (let i = 0; i < alpha_keys.length; i++) {
        let key = alpha_keys[i]
        let vals = alpha_sort[key]
        alpha_sort[key] = vals.sort((a, b) => a.label.localeCompare(b.label))
    }
    console.log(alpha_sort)
    alpha_keys.reverse()
    console.log(alpha_keys)
    let alpha_sorted_rows = []


    for (let i = 0; i < alpha_keys.length; i++) {
        let rows = alpha_sort[alpha_keys[i]]
        for (let j = 0; j < rows.length; j++) {
            alpha_sorted_rows.push(rows[j])
        }
        }

    console.log(alpha_sorted_rows)

    return (
        <>
        <TableContainer style={ {maxHeight: 300} } component={Paper}>

            <Table sx={ { minWidth: 50 } } stickyHeader aria-label="simple table">

                <TableHead>
                    <TableRow >
                        <TableCell sx={ {fontWeight: 800, backgroundColor: '#157719', color: 'white'} }>
                            {headers[props.whichOne][0]}
                        </TableCell>
                        <TableCell align="center"  sx={ {fontWeight: 800, backgroundColor: '#157719', color: 'white'} }>
                            {headers[props.whichOne][1]}
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {alpha_sorted_rows.map((row) => (
                        <TableRow
                            key={row.label}
                            sx={{ '&:last-child td, &:last-child th': { border: 0} }}>
                            <TableCell sx={{p: 2, width: '4%'}}>
                                {row.label}
                            </TableCell>
                            <TableCell sx={{p: 2, width: '1%'}} align="center">
                                {row.value}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>

        </TableContainer>
        </>
    );
}