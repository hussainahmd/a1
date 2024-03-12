import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Chats() {
    const [data, setData] = useState(null)

    const fetchDataFromStorage = async () => {
        try {
            const storedData = await AsyncStorage.getItem('myData')
            //AsyncStorage.removeItem('myData2')
            const x = await AsyncStorage.getAllKeys()
            console.log(x)
            console.log();
            if (storedData) {
                const parsedData = JSON.parse(storedData)
                setData(parsedData)
                console.log('storage')
                console.log(parsedData[0]);
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