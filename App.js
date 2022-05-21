import { NavigationContainer } from "@react-navigation/native";
import Routes from './src/routes/app.routes';

import { useFonts, Roboto_700Bold, Roboto_500Medium, Roboto_900Black, Roboto_400Regular } from "@expo-google-fonts/roboto"

export default function App() {
  const [loaded] = useFonts({
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_900Black,
    Roboto_400Regular
  });

  if(!loaded) {
      return null
  };

  return (
    <NavigationContainer>
        <Routes />
    </NavigationContainer>
  );
}
