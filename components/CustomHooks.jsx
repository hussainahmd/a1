import { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CustomHooks() {

    const [data, setData] = useState()

    const myGetApiHook = (url) => {
        axios.get(url)
            .then(response => {
                setData(response.data)
                AsyncStorage.setItem('myData', JSON.stringify(response.data))
            })
            .catch(error => {
                console.error('Error fetching data from API:', error)
            })
    }

    return {data, myGetApiHook}
}