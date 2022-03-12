import {useEffect} from "react";
import React from 'react';
import axios from 'axios';

async function apiQuery (params) {
    let response = await axios.get(`http://localhost:8001/query`, {params})
    console.log(response)
    return response.data;
}

export default apiQuery