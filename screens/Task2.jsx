import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const url1 = 'https://jsonplaceholder.typicode.com/todos/1'
const url2 = 'https://animechan.xyz/api/quotes'
const url3 = 'https://reactnative.dev/movies.json'


export default function Task2({navigation}) {
    const [data, setData] = useState(null)

    const fetchDataFromApi = async () => {
        try {
            const response = await axios.get(url2)
            const fetchedData = await response.data
            setData(fetchedData)

            await AsyncStorage.setItem('myData', JSON.stringify(fetchedData))
            console.log('api');

        } catch (error) {
            console.error('Error fetching data from API:', error)
        }
        // AsyncStorage.setItem('myData', JSON.stringify(chatdata))
        // setData(chatdata)
    }

    const fetchDataFromStorage = async () => {
        try {
            const storedData = await AsyncStorage.getItem('myData')
            if (storedData) {
                const parsedData = JSON.parse(storedData)
                setData(parsedData)
                console.log('storage');
            }
        } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error)
        }
    }

    useEffect(() => {
        fetchDataFromApi()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {data ? (
                <View>
                    <Text>Data from API:</Text>
                    <Text>{JSON.stringify(data)}</Text>
                </View>
            ) : (
                <Text>No data available</Text>
            )}
            <Button
                title="Refetch Data from API"
                onPress={fetchDataFromApi}
            />
            <Button
                title="Fetch Data from AsyncStorage"
                onPress={fetchDataFromStorage}
            />
            <Button
                title="Check"
                onPress = {()=>navigation.navigate('Task')}
            />
        </View>
    )
}
