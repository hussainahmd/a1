import { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const url = 'https://animechan.xyz/api/quotes'
let isStored = false
let storedKey = ''

export default function CustomHooks() {

    const [data, setData] = useState(null)
    const [allDataKeys, setAllDataKeys] = useState()


    const fetchDataFromApi = async () => {
        try {
            const response = await axios.get(url)
            const fetchedData = await response.data
            return fetchedData

        } catch (error) {
            console.error('Error fetching data from API:', error)
        }
    }

    const fetchDataFromStorage = async (key) => {
        try {
            const data = await AsyncStorage.getItem(key)
            return JSON.parse(data)
        }
        catch (error) {
            console.error('Error fetching data from AsyncStorage:', error)
        }
    }

    const storeDataInStorage = async (key, apiData) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(apiData))
        }
        catch (error) {
            console.error('Error storing data in AsyncStorage:', error)
        }
    }

    const loadData = async (key) => {

        storedKey = key
        const storedData = await fetchDataFromStorage(key)
        if (storedData) {
            isStored = true
            setData(storedData)
        }
        else {
            isStored = false
            const fetchedData = await fetchDataFromApi()
            setData(fetchedData)
            storeDataInStorage(key, fetchedData)
            getAllDataKeys()
        }
    }

    const getAllDataKeys = async () => {
        let x = await AsyncStorage.getAllKeys()
        setAllDataKeys(x)
    }

    const deleteDatafromStorage = async (key) => {

        let x = await AsyncStorage.getAllKeys()

        if (x.includes(key)) {
            await AsyncStorage.removeItem(key)
            if (storedKey === key)
                setData(null)
        }
        else {
            console.log('key doesnt exist')
        }
        getAllDataKeys()
    }

    return { data, allDataKeys, isStored, storedKey, loadData, deleteDatafromStorage, getAllDataKeys }
}

//     useEffect(() => {
//         (async () => {})()
//     }, [])