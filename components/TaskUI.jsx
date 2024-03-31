import { View, Text, Button, ScrollView } from 'react-native'
import React, { useEffect } from 'react'

import CustomHooks from './CustomHooks'

export default function TaskUI() {

    const { data, allDataKeys, isStored, storedKey, getAllDataKeys, loadData, deleteDatafromStorage } = CustomHooks()

    useEffect(() => {
        getAllDataKeys()
        // loadData('myData')
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
                        Data keys in storage : {JSON.stringify(allDataKeys)}
                    </Text>
                </View>
                <Button
                    title="Delete data from storage"
                    onPress={() => deleteDatafromStorage('myData')}
                />

                <Button
                    title="Load"
                    onPress={() => loadData('myData')}
                />
            </View>
        </View>
    )
}