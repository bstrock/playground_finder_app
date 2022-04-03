import React from 'react'
import axios from 'axios'

export default async function apiQuery (queryLocation, queryParams) {

    let inParams = {...queryLocation, ...queryParams}

    let outParams = {}

    for (const [key, val] of Object.entries(inParams)) {
        if (!Object.is(val, null)) {
            const outKey = key.toLowerCase().replace(/ /g,"_")
            if (typeof val !== 'number') {
                outParams[outKey] = val.toLowerCase().replace(/ /g, "_")
            } else {
                outParams[outKey] = val
            }
        }
    }

    let response = await axios.get(`http://localhost:8001/query`, {params: outParams})
    return response.data;
}
