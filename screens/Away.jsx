import { View, Text, Switch, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function Away({ navigation }) {

    console.log('Away top area')

    const [isEnabled, setIsEnabled] = useState(global.mode)

    const toggleSwitch = () => {
        console.log('Away toggle switch')

        console.log('global.mode before : ', global.mode)
        setIsEnabled((previousState) => !previousState)
        global.mode = !global.mode
        console.log('global.mode after : ', global.mode)        
    }

    useEffect(() => {
        console.log('Away useEffect\n')
        return () => {
            console.log('Away useEffect return\n')
            // console.log('Going Back');
        }
    }, [])

    return (

        <View className={`flex-1 ${!global.mode ? 'bg-[#c3ff83]' : 'bg-[#478db2]'}`}>
            <View className='flex-[.5] items-center justify-center flex-row'>

                <Text className='mr-[50] text-3xl'>Dark Mode</Text>
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

            {console.log('Away return')}

            <View className='flex-[.5] items-center justify-center'>
                <Text className='text-3xl' onPress={() => navigation.navigate('Home')}>Back</Text>
            </View>
        </View>
    )
}