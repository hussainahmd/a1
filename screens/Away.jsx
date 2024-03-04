import { View, Text, Switch, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export default function Away({ navigation }) {

    const [isEnabled, setIsEnabled] = useState(global.mode)

    const toggleSwitch = () => {

        setIsEnabled((previousState) => !previousState)

        global.mode = !global.mode
    }
    return (

        <View className={`flex-1 bg-[${!global.mode ? '#c3ff83' : '#478db2'}]`}>
            <View className='flex-[.5] items-center justify-center flex-row '>

                <Text className='mr-[50] text-3xl'>Dark Mode {console.log('return test')}</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <TouchableOpacity className='ml-10' onPress={toggleSwitch}>
                    <Text className='text-3xl'>{`${!global.mode ? 'No' : 'Yes'}`}</Text>
                </TouchableOpacity>

            </View>

            <View className='flex-[.5] items-center justify-center'>
                <Text className='text-3xl' onPress={() => navigation.navigate('Home')}>Back</Text>
            </View>
        </View>
    )
}