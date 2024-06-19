import * as Font from 'expo-font';

export const bootstrap = async () => {
    await Font.loadAsync({
        // 'montserrat-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        // 'montserrat-regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        // 'Segoe-UI': require('../assets/fonts/Segoe-UI.ttf')
    })
}