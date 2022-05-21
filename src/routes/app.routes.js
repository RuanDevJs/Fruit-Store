import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../Pages/Home";
import Product from "../Pages/Product";

export default function Routes(){
    const { Navigator, Screen } = createNativeStackNavigator();
    return(
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                component={Home}
                name='Home'
            />
            <Screen
                component={Product}
                name='Product'
            />
        </Navigator>
    )
}
