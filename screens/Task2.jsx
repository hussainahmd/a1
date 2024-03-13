import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import CustomHooks from '../components/CustomHooks'

const url1 = 'https://jsonplaceholder.typicode.com/todos/1'
const url2 = 'https://animechan.xyz/api/quotes'
const url3 = 'https://reactnative.dev/movies.json'

export default function Task2({ navigation }) {
    const [data, setData] = useState(null)
    //const {data} = GetApiHook()
    // const fetchDataFromApi2 = () => {

    //     axios.get(url2)
    //         .then(response => {
    //             setData(response.data)
    //             AsyncStorage.setItem('myData', JSON.stringify(response.data))
    //             console.log('api')
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data from API:', error)
    //         })
    // }

    const fetchDataFromApi = async () => {
        try {
            console.log('api top')
            const response = await axios.get(url2)
            const fetchedData = await response.data
            //setData(fetchedData);
            console.log('api bet : ', fetchedData)
            //console.log(fetchedData)
            return fetchedData
            
        } catch (error) {
            console.error('Error fetching data from API:', error)
        }
    }
    
    const fetchDataFromStorage = async (apiData) => {
        try {
            // console.log('store ')
            console.log('storage')
            await AsyncStorage.setItem('myData', JSON.stringify(apiData))
            setData(apiData)
        }
        catch (error) {
            console.error('Error fetching data from AsyncStorage:', error)
        }
    }

    const xz = async () =>{
        console.log('useEffect top')
        const data = await fetchDataFromApi()
        console.log('useEffect data : ', data)
        fetchDataFromStorage(data)
    }

    useEffect(() => {

        xz()
        // (async () => {
        //     console.log('useEffect top')
        //     const data = await fetchDataFromApi()
        //     console.log('useEffect data : ',data)
        //     fetchDataFromStorage(data)
        // })()
        
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
                onPress={() => navigation.navigate('Task')}
            />
        </View>
    )
}

// export default function Task2({ navigation }) {

//     console.log('home')
//     //const {data, myGetApiHook} = CustomHooks()
//     const {data} = CustomHooks()

//     useEffect(() => {
//         //fetchDataFromApi()
//         //myGetApiHook(url2)
//         console.log('useEffect home')
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
//             {console.log('return home')}
//             <Button
//                 title="Check"
//                 onPress={() => navigation.navigate('Task')}
//             />
//         </View>
//     )
// }