import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'

import CustomHooks from '../components/CustomHooks'

export default function Task2({ navigation }) {

    const {data, loadData} =  CustomHooks()

    useEffect(() => {
        loadData()

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
                title="Load"
                onPress={loadData}
            />
            
            <Button
                title="Go"
                onPress={() => navigation.navigate('Task')}
            />
        </View>
    )
}