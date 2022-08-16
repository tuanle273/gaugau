import * as React from 'react' 
import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import { Button, Header, Input } from 'react-native-elements'
import styled from 'styled-components'
import { getToken, sendPushNotification, Token } from './services/api'

const Page = styled(View)`
  padding: 40px 30px 0 30px;

`
const Heading = styled(Text)
`
text-align: center;
font-size: 25px;
margin-bottom: 16px;
font-weight: bold;
`
const SummonButton = styled(TouchableOpacity) < {color?:string}>
`
background-color: ${p => p.color || 'pink'};
flex: 48% 0 0;
border-radius: 5px;
text-align: center;
margin-bottom: 10px;
display: flex;
height:150px;
align-items: center;
justify-content: center;
color: white;
`
const SummonButtonText = styled(Text)
`
color: black;
font-size: 15px;
`
const ButtonContainer = styled(View)
`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-between;
`

const GirlScreen : React.FC = () => {
    const [tokenInput, setTokenInput] = React.useState('')
    const [token, setToken] = React.useState<Token | undefined>()
    const getTokenFromId = async (tokenId: string) => {
        const storedToken = await getToken(tokenId)
        setToken(storedToken)
      }
    
    
    return (
        <View>
    <Header centerComponent={{
        text: "Em Ky ♥ ",
        style: { color: "#fff" }
      }}/>  
        <Page>        
        {token ? (
          <View>
            <Heading>Mã số của gấu bạn là {token.id}.</Heading>
            <Heading>Có thể triệu hồi gấu!</Heading>
            <Heading>Mã số của gấu đực là {token.id}.</Heading>
            <Heading>Có thể triệu hồi gấu 👦!</Heading>
            <Button title="Nhập mã số mới!" onPress={() => setToken(undefined)} type="outline" />
          </View>
        ) : (
          <View>
            <Input
              label="Mã số gấu 👦"
              value={tokenInput}
              onChangeText={setTokenInput}
              placeholder="Nhập mã số của gấu đực vào đây"
            />
            <Button title="Xác nhận mã số" onPress={() => getTokenFromId(tokenInput)} />
          </View>
        )}

        <View>
            {token &&
            <View style={{marginTop: 30}}>
            <Heading>Thông báo tới Anh Tuấn</Heading>
            <ButtonContainer>
            <SummonButton color='#50A7FF' onPress={()=>sendPushNotification(token.token, 'Em Yêu Anh 💤', 'Qua gặp em đi 💘')}>
                <SummonButtonText>Em Yêu Anh 😍</SummonButtonText>
            </SummonButton>
            <SummonButton color='#03D29F'onPress={()=>sendPushNotification(token.token, 'Em Thèm Trà Sữa 🧃', 'Anh mua cho Em đi 🛴')}>
                <SummonButtonText>Thèm Trà Sữa 😘</SummonButtonText>
            </SummonButton>
            <SummonButton color='#FF7675' onPress={()=>sendPushNotification(token.token, 'Em Nhớ Anh Quá 👩‍🎨', 'Qua rước em đi chơi 🚀')}>
                <SummonButtonText>Nhớ Anh Quá 🙆‍♀️</SummonButtonText>
            </SummonButton>
            <SummonButton color='#F0DF51' onPress={()=>sendPushNotification(token.token, 'Muốn đấm Anh 🚨', 'Dỗi 💢')}>
                <SummonButtonText>Muốn Đấm Mày 🤛🏼</SummonButtonText>
            </SummonButton>
           
            </ButtonContainer>
        </View> }
            
        </View>
        </Page> 
        </View>
    )
}

export default GirlScreen