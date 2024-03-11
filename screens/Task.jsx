import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import DATA from '../data/chatdata'

import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Chats() {
    const [data, setData] = useState(DATA)

    const fetchDataFromStorage = async () => {
        try {
            const storedData = await AsyncStorage.getItem('myData')
            AsyncStorage.removeItem('my-key')
            const x = await AsyncStorage.getAllKeys()
            console.log(x)
            console.log();
            if (storedData) {
                const parsedData = JSON.parse(storedData)
                setData(parsedData)
                console.log('storage')
            }
        } catch (error) {
            console.error('Error fetching data from AsyncStorage:', error)
        }
    }

    useEffect(() => {
        fetchDataFromStorage()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View className='flex-[1]'>
                <Text>Data from data:</Text>
                <Text>{JSON.stringify(data)}</Text>
            </View>

        </View>
    )
}