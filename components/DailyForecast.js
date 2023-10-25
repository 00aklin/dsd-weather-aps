import { View, Text } from "react-native";
import { SunIcon } from "react-native-heroicons/solid";
import { Umbrella } from "./icons";

export const DailyForecast = (props) => {
  return (
    <View className="py-2">
      <View className="flex-row w-full space-x-2 py-3 px-6 rounded justify-between items-center bg-white/10">
        <View className="flex-col justify-between">
          <Text className="text-white font-bold text-xl">
            {props.temperature}&#176;
          </Text>
          <Text className="text-white">{props.day}</Text>

          <View className="flex-row space-x-2 align-center pt-4">
            <Umbrella height="16" width="16" color="white" />
            <Text className="text-white">{props.chanceOfRain}%</Text>
          </View>
          <Text className="text-gray-200 text-xs">{props.conditionText}</Text>
        </View>

        {props.children}
      </View>
    </View>
  );
};
