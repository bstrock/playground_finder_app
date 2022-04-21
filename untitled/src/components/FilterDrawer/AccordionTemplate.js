import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Typography from "@mui/material/Typography"
import {Checkbox} from "@mui/material"
import AccordionDetails from "@mui/material/AccordionDetails"
import EquipmentCheckboxList from "./EquipmentCheckboxList"
import * as React from "react"

export default function AccordionTemplate(props) {

    const {
        expanded,
        panel,
        title,
        showCheckbox,
        setChecked,
        fullList,
        setShowCheckbox,
        updateChecked,
        checked,
        handleChange
    } = props

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
            width: 'fixed',
        },
        accordionButtonText: {
            pt: 1,
            pb: 1,
            mt: 1
        },
        checkbox: {
            paddingLeft: '5rem'
        }
    }

    return (
<Accordion expanded={expanded === panel} onChange={handleChange(panel)}>

    <AccordionSummary
        style={styles.accordionSummary}
        expandIcon={<ExpandMoreIcon/>}
        aria-controls="panel2bh-content"
        id="panel2bh-header"
    >
        <Typography sx={{display: 'flex', alignSelf: 'center'}} style={styles.accordionButtonText}
                    variant={'h6'}>
            {title}
        </Typography>
        <>
            {// render checkbox if values are checked in the accordion panel, allow click checkbox to clear state
                <Checkbox sx={{ml: '5rem', flexShrink: 1, opacity: showCheckbox}} edge={'start'}
                          size={'medium'}
                          onClick={e => checkboxOnClick(e, setChecked, fullList, setShowCheckbox)}
                          indeterminate={checked.length > 0}
                />
            }
        </>
    </AccordionSummary>
    <AccordionDetails>
        <EquipmentCheckboxList checked={checked}
                               updateFunc={updateChecked}
                               fullList={fullList}
        />
    </AccordionDetails>
</Accordion>
    )}