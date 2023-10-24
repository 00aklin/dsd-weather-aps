import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";

import { StatusBar } from "expo-status-bar";
import { Wind } from "../components/icons/Wind.";
import { Drop } from "../components/icons/Drop";
import { DailyForecast } from "../components/DailyForecast";
import { fetchForecastDays } from "../api/weather";
import { useEffect, useState } from "react";
import { weatherImagesDay, weatherImagesNight } from "../api/constants";

const imageUri =
  "https://images.unsplash.com/photo-1557683304-673a23048d34?auto=format&fit=crop&q=60&w=300&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdyYWRpZW50fGVufDB8MXwwfHx8MA%3D%3D";

export function HomeScreen() {
  const [loadingData, setLoadingData] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  // useEffect(() => {
  //   setLoadingData(true);
  //   fetchForecastDays()
  //     .then((data) => setWeatherData(data))
  //     .finally(() => setLoadingData(false));
  // }, []);

  const { current, location } = weatherData;

  if (loadingData) {
    return (
      <View className="flex-1">
        <Text>Loading ...</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 relative bg-black">
      <Image
        blurRadius={10}
        source={{
          uri: imageUri,
        }}
        className="absolute h-full w-full left-0"
      />

      <SafeAreaView className="flex flex-1 z-10">
        <TouchableWithoutFeedback>
          <View className="mx-4 h-10">
            <View className="flex-row items-center rounded-full bg-white">
              <TextInput
                returnKeyType="done"
                placeholder="search"
                className="p-3 flex-1"
              />

              <TouchableOpacity className="p-3 rounded-full">
                <MagnifyingGlassIcon size="16" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View className="flex-1 justify-between items-center space-y-4 py-3">
          <Text className="text-white text-lg">
            {location?.name}, {location?.country}
          </Text>

          {current?.is_day === 1
            ? weatherImagesDay[current?.condition?.text] ??
              weatherImagesDay["other"]
            : weatherImagesNight[current?.condition?.text] ??
              weatherImagesDay["other"]}

          <View className="flex-col items-center space-y-2">
            <Text className="text-white text-5xl">{current?.temp_c}&#176;</Text>
            <Text className="text-white text-lg tracking-widest">
              {current?.condition?.text}
            </Text>
          </View>

          {/* Other infos */}
          <View className="flex-row space-x-4 p-3 bg-white/10 rounded">
            <View className="flex-row space-x-2 items-center">
              <Wind color="white" height="24" width="24" />
              <Text className="text-white">22kmh</Text>
            </View>

            <View className="flex-row space-x-2 items-center">
              <Drop color="white" height="24" width="24" />
              <Text className="text-white">22kmh</Text>
            </View>
          </View>

          <View className="h-32">
            <ScrollView
              horizontal
              contentContainerStyle={{
                paddingHorizontal: 15,
                gap: 15,
              }}
              showsHorizontalScrollIndicator={false}
            >
              <DailyForecast day="monday" temperature="23" />
              <DailyForecast day="monday" temperature="24" />
              <DailyForecast day="monday" temperature="25" />
              <DailyForecast day="monday" temperature="25" />
              <DailyForecast day="monday" temperature="25" />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>

      <StatusBar style="light" />
    </View>
  );
}
