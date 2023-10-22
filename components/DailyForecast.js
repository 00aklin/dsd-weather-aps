import { View, Text } from "react-native";
import { SunIcon } from "react-native-heroicons/solid";

export const DailyForecast = (props) => {
  return (
    <View className="flex-col space-x-2 py-3 px-6 rounded justify-center items-center bg-white/10">
      <SunIcon size="32" color="white" />
      <Text className="text-white">{props.day}</Text>
      <Text className="text-white">{props.temperature}&#176;</Text>
    </View>
  );
};
