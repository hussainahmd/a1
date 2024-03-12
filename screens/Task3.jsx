import React, { useEffect, useState } from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const url = 'https://animechan.xyz/api/quotes'

let isStored = false

export default function Task3({ navigation }) {

    const [data, setData] = useState()

    const loadData = async (key) => {

        //check if my data already exists in storage
        const storedData = await AsyncStorage.getItem(key)
        //console.log(storedData)

        //if yes, simply set that data
        if (storedData) {
            isStored = true
            const parsedData = JSON.parse(storedData)
            setData(parsedData)
        }

        //if no, get it from api and store in the storage
        else {
            axios.get(url)
                .then(response => {
                    setData(response.data)

                    //storing
                    AsyncStorage.setItem(key, JSON.stringify(response.data))
                })
                .catch(error => {
                    console.error('Error fetching data from API:', error)
                })
        }
    }

    const deleteDatafromStorage = (key) => {
        //if you reload without deleting the data, it will load from the storage

        //if the key doesn't exists it simply ignores it
        //delete the stored data, now reload the app, it will load from the api
        AsyncStorage.removeItem(key)
    }

    useEffect(() => {
        loadData('myData')
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {data ? (
                <View style={{ flex: .8 }}>
                    <View style={{ flex: .3, backgroundColor: '#c6f2ff', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, color: '#2296f3' }}>
                            {isStored ? 'Data from Local Storage' : 'Data from API'}
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
                <Button
                    title="Delete data from storage"
                    onPress={() => deleteDatafromStorage('myData')}
                />
            </View>
        </View>
    )
}

// export default function Task3({ navigation }) {

//     const {data, myGetApiHook} = CustomHooks()

//     useEffect(() => {
//         myGetApiHook(url2)
//     }, [])

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             {data ? (
//                 <View>
//                     <Text>Data from API:</Text>
//                     <Text>{JSON.stringify(data)}</Text>
//                 </View>
//             ) : (
//                 <Text>No data available</Text>
//             )}
//             <Button
//                 title="Check"
//                 onPress={() => navigation.navigate('Task')}
//             />
//         </View>
//     )
// }