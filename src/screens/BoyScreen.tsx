import * as React from 'react' 
import { View, Text } from 'react-native'
import * as Notifications from 'expo-notifications'
import { Button, Header } from 'react-native-elements'
import {Heading, Page} from './components'
import { submitToken, Token } from './services/api'


async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.getPermissionsAsync()
    if (status !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      if (status !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
    }
  
    const token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)
    return token
  }
  

const BoyScreen : React.FC = () => {
    const [token, setToken] = React.useState<Token | undefined>()
    React.useEffect(() => {
        // registerForPushNotificationsAsync().then(token => setExpoPushToken(token))
    
        const subA = Notifications.addNotificationReceivedListener(notification => {
          console.log(notification)
        })
    
        const subB = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response)
        })
    
        return () => {
          Notifications.removeNotificationSubscription(subA)
          Notifications.removeNotificationSubscription(subB)
        }
      }, [])
      
    return (
        <View>
            <Header centerComponent={{
        text: "Anh Tuan",
        style: { color: "#fff" }
      }}/> 
      <Page>
      <Heading>
          {token ? `Mã số của bạn là ${token.id}.` : 'Bạn chưa có mã số. Bấm để lấy mã!'}
        </Heading>
        <Button
          title="Bấm để lấy mã số"
          onPress={async () => {
            const pushToken = await registerForPushNotificationsAsync()
            if (pushToken) {
              const storedToken = await submitToken(pushToken)
              setToken(storedToken)
            }
        }}/>
        </Page>
        </View>
    )
}

export default BoyScreen