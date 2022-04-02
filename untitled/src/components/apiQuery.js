import {useEffect} from "react";
import React from 'react';
import axios from 'axios';

async function apiQuery (queryLocation, queryParams) {

    let inParams = {...queryLocation, ...queryParams}

    let outParams = {}
    let wp = {
        latitude: queryLocation.latitude,
        longitude: queryLocation.longitude,
        radius: 10
    }

    console.log(inParams)

    for (const [key, val] of Object.entries(inParams)) {
        if (!Object.is(val, null)) {
            const outKey = key.toLowerCase().replace(/ /g,"_")
            if (typeof val !== 'number') {
                const outVal = val.toLowerCase().replace(/ /g,"_")
                outParams[outKey] = outVal
            } else {
                outParams[outKey] = val
            }
        console.log(outParams)
        }
    }
    console.log(outParams)

    let response = await axios.get(`http://localhost:8001/query`, {params: outParams})
    console.log(response)
    return response.data;
}

export default apiQuery