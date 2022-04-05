import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import {Checkbox} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import EquipmentCheckboxList from "./EquipmentCheckboxList";
import * as React from "react";

export default function AccordionTemplate(props) {

    const checkboxOnClick = (e, setChecked, fullList, setShowCheckbox) => {
        // this function toggles check state for the top-level accordion check boxes, which propagates to children in the same container
        setChecked([])
        // in either case, switch the state of allChecked
        setShowCheckbox(false)
        e.stopPropagation()  // and stop the event from closing the sidebar drawer
    }

    const styles = {
        accordionSummary: {
            height: '1em',
            justifyContent: 'center',
            alignContent: 'center',
            width: 'fixed'
        },
        accordionButtonText: {
            paddingTop: 1,
            paddingBottom: 1,
            width: '9rem'
        },
        checkbox: {
            paddingLeft: '5rem'
        }
    }

    return (
<Accordion expanded={props.expanded === props.panel} onChange={props.handleChange(props.panel)}>
    <AccordionSummary
        style={styles.accordionSummary}
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel2bh-content"
        id="panel2bh-header"
    >
        <Typography style={styles.accordionButtonText}
                    variant={'h6'}>
            {props.title}
        </Typography>
        <>
            {// render checkbox if values are checked in the accordion panel, allow click checkbox to clear state
                <Checkbox sx={{ml: '5rem', flexShrink: 1, opacity: props.showCheckbox}} edge={'start'}
                          size={'medium'}
                          onClick={e => checkboxOnClick(e, props.setChecked, props.fullList, props.setShowCheckbox)}
                          indeterminate={props.checked.length > 0}
                />
            }
        </>
    </AccordionSummary>
    <AccordionDetails>
        <EquipmentCheckboxList data={props.checked}
                               updateFunc={props.updateChecked}
                               fullList={props.fullList}
        />
    </AccordionDetails>
</Accordion>
    )}