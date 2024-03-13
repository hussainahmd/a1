import React, { useEffect, useState } from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const url = 'https://animechan.xyz/api/quotes'

let isStored = false
let storedKey = ''

export default function Task3({ navigation }) {

    const [data, setData] = useState()
    const [allKeys, setAllKeys] = useState()

    const loadData = async (key) => {
        storedKey = key

        console.log('isStored 1: ', isStored)

        //check if my data already exists in storage
        const storedData = await AsyncStorage.getItem(key)
        //console.log(storedData)

        //if yes, simply set that data
        if (storedData) {
            isStored = true
            console.log('isStored 2: ', isStored)
            const parsedData = JSON.parse(storedData)
            setData(parsedData)
        }

        //if no, get it from api and store in the storage
        else {
            console.log('isStored 3: ', isStored)
            axios.get(url)
                .then(response => {
                    setData(response.data)

                    //storing
                    AsyncStorage.setItem(key, JSON.stringify(response.data))
                    getAllKeys()
                })
                .catch(error => {
                    console.error('Error fetching data from API:', error)
                })
        }
    }

    const deleteDatafromStorage = async (key) => {
        console.log('isStored 4: ', isStored)
        //if you reload without deleting the data, it will load from the storage

        //if the key doesn't exists it simply ignores it
        //delete the stored data, now reload the app, it will load from the api
        let x = await AsyncStorage.getAllKeys()
        
        if(x.includes(key)){
            await AsyncStorage.removeItem(key)
            if(storedKey === key)
                setData(null)
        }
        else{
            console.log('key doesnt exist');
        }
        getAllKeys()
    }

    const getAllKeys = async () => {
        let x = await AsyncStorage.getAllKeys()
        setAllKeys(x)
    }

    useEffect(() => {
        getAllKeys()
        loadData('myData2')
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>

            {data ? (
                <View style={{ flex: .8 }}>
                    <View style={{ flex: .3, backgroundColor: '#c6f2ff', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, color: '#2296f3' }}>
                            {isStored ? 'Data loaded from Local Storage\n' : 'Data loaded from API\n'}
                            stored data key = '{storedKey}'
                        </Text>
                    </View>

                    <ScrollView style={{ flex: .7 }}>
                        <Text>{JSON.stringify(data)}</Text>
                    </ScrollView>
                </View>
            ) : (
                <Text>No data available</Text>
            )}
            <View style={{ flex: .2, backgroundColor: '#c6f2ff', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ backgroundColor: '#ffe644', marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, }}>
                        Data keys in storage : {JSON.stringify(allKeys)}
                    </Text>
                </View>
                <Button
                    title="Delete data from storage"
                    onPress={() => deleteDatafromStorage('myData2')}
                />
            </View>
        </View>
    )
}
