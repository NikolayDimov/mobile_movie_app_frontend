import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import { icons } from '@/constants/icons'

const TabIcon = ({ focused, icon, title }: any) => {
    const backgroundColor = focused ? '#AB8BFF' : 'transparent';
    const textColor = focused ? '#151312' : '#A8B5DB';

    return (
        <View style={[styles.tabIconContainer, { backgroundColor }]}>
            <Image source={icon} style={[styles.icon, { tintColor: textColor }]} />
            {focused && <Text style={[styles.tabTitle, { color: '#fff' }]}>{title}</Text>}
        </View>
    );
}

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    borderRadius: 20,
                    height: '100%',
                },
                tabBarStyle: {
                    backgroundColor: "#0F0D23",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 48,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#0F0D23",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home}
                            title="Home"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.search}
                            title="Search"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Saved',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.save}
                            title="Saved"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.person}
                            title="Profile"
                        />
                    ),
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    tabIconContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 20,
        minWidth: 100,
        minHeight: 46,
    },
    icon: {
        width: 24,
        height: 24,
    },
    tabTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default TabsLayout;
