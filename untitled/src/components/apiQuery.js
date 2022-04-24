import axios from 'axios'

export default async function apiQuery (queryLocation, queryParams) {

    let inParams = {...queryLocation, ...queryParams}

    let outParams = {}

    let errorHappened = false
    /* eslint-disable */
    const devUrl = 'http://localhost:8001'
    const apiUrl = 'https://eden-prairie-playgrounds.herokuapp.com'

    for (const [key, val] of Object.entries(inParams)) {
        const outKey = key.toLowerCase().replace(/ /g,"_")
        if (typeof val === 'number') {
            outParams[outKey] = val
        } else if (val.length > 0) {
            outParams[outKey] = val.toLowerCase().replace(/ /g, "_")
            }
        }

    let response = await axios.get(`${apiUrl}/query`, {params: outParams})
        .catch((error) => {
            console.log(error)
            errorHappened = true
        })

    if (errorHappened) {
        response = await axios.get(`http://localhost:8001/query`, {params: outParams})
            .catch((error) => {
                console.log('second try')
                console.log(error)
            })
        errorHappened = false
    }

    return response.data
}
