import React from 'react'
import axios from 'axios'

export default async function apiQuery (queryLocation, queryParams) {

    let inParams = {...queryLocation, ...queryParams}

    let outParams = {}

    for (const [key, val] of Object.entries(inParams)) {
        const outKey = key.toLowerCase().replace(/ /g,"_")
        if (typeof val === 'number') {
            outParams[outKey] = val
        } else if (val.length > 0) {
            outParams[outKey] = val.toLowerCase().replace(/ /g, "_")
            }
        }

    let response = await axios.get(`http://localhost:8001/query`, {params: outParams})
    return response.data;
}
