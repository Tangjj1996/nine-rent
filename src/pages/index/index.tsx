import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.111222')
  })

  return (
    <View className='index'>
      <Text>Hello world~~~</Text>
    </View>
  )
}
