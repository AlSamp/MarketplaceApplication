import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import Market from './Market';
import CompanyList from './CompanyList';
import MakePost from './MakePost';
//import Profile from './Profile';

const Tab = createMaterialBottomTabNavigator();

const TabBar = () => {
    return (
        <Tab.Navigator
            initialRouteName="Market" a
            activeColor="#FF7043"
            barStyle={{ backgroundColor: "#4DB6AC" }}
        >
            <Tab.Screen name="Profile" component={CompanyList}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Icon name={'person-circle-outline'} size={30} color={color} />
                    ),
                }} />
            <Tab.Screen name="Messages" component={CompanyList} archive
                options={{
                    tabBarLabel: 'Messages',
                    tabBarIcon: ({ color }) => (
                        <Icon name={'mail-outline'} size={30} color={color} />
                    ),
                }} />

            <Tab.Screen name="Market" component={Market} // needs changing
                options={{
                    tabBarLabel: 'Market',
                    tabBarIcon: ({ color }) => (
                        <Icon name={'cart-outline'} size={30} color={color} />
                    ),
                }} />

            <Tab.Screen name="Make Post" component={MakePost}
                options={{
                    tabBarLabel: 'Make Post',
                    tabBarIcon: ({ color }) => (
                        <Icon name={'push-outline'} size={30} color={color} />
                    ),
                }} />

        </Tab.Navigator>
    )
}

export default TabBar;
