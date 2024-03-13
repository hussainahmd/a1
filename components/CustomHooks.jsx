import { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const url = 'https://animechan.xyz/api/quotes'

export default function CustomHooks() {

    const [data, setData] = useState(null)

    const fetchDataFromApi = async () => {
        try {
            const response = await axios.get(url)
            const fetchedData = await response.data
            return fetchedData

        } catch (error) {
            console.error('Error fetching data from API:', error)
        }
    }

    const fetchDataFromStorage = async () => {
        try {
            const data = await AsyncStorage.getItem('myData')
            return JSON.parse(data)
        }
        catch (error) {
            console.error('Error fetching data from AsyncStorage:', error)
        }
    }

    const storeDataInStorage = async (apiData) => {
        try {
            await AsyncStorage.setItem('myData', JSON.stringify(apiData))
        }
        catch (error) {
            console.error('Error storing data in AsyncStorage:', error)
        }
    }

    const loadData = async () => {

        const storedData = await fetchDataFromStorage()
        if (storedData) {
            setData(storedData)
        }
        else {
            const fetchedData = await fetchDataFromApi()
            setData(fetchedData)
            storeDataInStorage(fetchedData)
        }
    }

    return { data, loadData }
}

// export default function useContacts() {
//     const [contacts, setContacts] = useState([])

//     useEffect(() => {
//         (async () => {})()
//     }, [])

    
//     return contacts
// }