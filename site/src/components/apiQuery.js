import axios from 'axios'

export default async function apiQuery(queryLocation, queryParams, setLoadingProgress) {
    // unpack parameters
    let inParams = {...queryLocation, ...queryParams}

    let outParams = {}  // container for query string parameter values

    let errorHappened = false
    /* eslint-disable */
    // switch this value for local dev
    const devUrl = 'http://localhost:8001'
    const apiUrl = 'https://eden-prairie-playgrounds.herokuapp.com'

    // inParams represents the state of our checkboxes from the filter drawer
    // we're going to loop through the keys and see which are checked
    // those keys are then appended to outParams
    for (const [key, val] of Object.entries(inParams)) {
        const outKey = key.toLowerCase().replace(/ /g, "_")
        if (typeof val === 'number') {
            outParams[outKey] = val
        } else if (val.length > 0) {
            outParams[outKey] = val.toLowerCase().replace(/ /g, "_")
        }
    }

    // api query happens here
    let response = await axios.get(`${apiUrl}/query`, {
        params: outParams,  // query string parameters
        responseType: 'blob',  // necessary to track loading progress
        onDownloadProgress: (progressEvent) => {  // tracks loading progress as value from 0-100
            let progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setLoadingProgress(progress)
        }
    })
        .catch((error) => {
            console.log(error)
            errorHappened = true
        })

    if (!errorHappened) {
        // read blob data as text to extract json and return
        const fr = new FileReader()
        fr.readAsText(response.data)
        return response.data
    }
}