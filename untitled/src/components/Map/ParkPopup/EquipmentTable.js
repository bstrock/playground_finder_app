import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import slides from "../../../images/icons/slide.svg";
import towers from "../../../images/icons/towers.svg";
import climbers from "../../../images/icons/climbers.svg";
import swings from "../../../images/icons/swings.svg";
import { ReactComponent as Slides } from "../../../images/icons/slide.svg"

import {Icon} from "@mui/material";

function createData(label, value) {

    const words = label.split("_");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }
    label = words.join(" ");
    return {label, value}
}

export default function BasicTable(props) {
    console.log(props)

    const rows = []

    for (let key in props.equipment) {
        if (props.equipment[key] > 0) {
            let row = createData(key, props.equipment[key])
            rows.push(row)
        }
    }
    console.log(rows)

    return (
        <>
        <TableContainer style={ {maxHeight: 300} } component={Paper}>
            <Table sx={ { minWidth: 50 } } stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Equipment</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
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