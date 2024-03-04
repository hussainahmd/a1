import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

global.mode = false

export default function Home({navigation}) {
    return (
        <View className={`flex-1 ${!global.mode ? 'bg-white' : 'bg-orange-300'}`}>
            <View className='flex-[.5] items-center justify-center bg-slate-400'>
                <Text className='text-3xl'>Home</Text>
            </View>

            <View className='flex-[.5] items-center justify-center bg-slate-200'>
                <TouchableOpacity onPress={() => navigation.navigate('Away')}>
                    <Text className='text-3xl'>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}