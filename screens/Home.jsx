import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'

global.mode = false

export default function Home({navigation}) {

    console.log('Home top area')

    const [mode, setMode] = useState(false)

    useEffect(() => {
        console.log('Home useEffect top')

        const unsubscribe = navigation.addListener('focus', () => {
            setMode((previousState) => !previousState)
            console.log('Home useEffect middle, global.mode : ', global.mode)
            // console.log('We are Back')
        })
        return unsubscribe
    }, [navigation])

    return (

        <View className={`flex-1 ${!global.mode ? 'bg-[#c3ff83]' : 'bg-[#478db2]'}`}>
            <View className='flex-[.5] items-center justify-center'>
                <Text className='text-3xl'>Home</Text>
            </View>

            {console.log('Home return')}

            <View className='flex-[.5] items-center justify-center'>
                <TouchableOpacity onPress={() => navigation.navigate('Away')}>
                    <Text className='text-3xl'>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}