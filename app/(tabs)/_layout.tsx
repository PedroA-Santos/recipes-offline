import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="receitasSalvas"
        options={{
          title: "Receitas Salvas",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "cloud-offline" : "cloud-offline-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}