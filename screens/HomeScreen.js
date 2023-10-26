import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";

import { StatusBar } from "expo-status-bar";
import { Wind } from "../components/icons/Wind.";
import { Drop } from "../components/icons/Drop";
import { DailyForecast } from "../components/DailyForecast";
import { fetchForecastDays, fetchSearchLocations } from "../api/weather";
import { useCallback, useEffect, useState } from "react";
import { getWeatherIcon } from "../api/constants";
import { Thermometer } from "../components/icons";
import { debounce } from "lodash";

const imageUriDay =
  "https://images.unsplash.com/photo-1557683304-673a23048d34?auto=format&fit=crop&q=60&w=300&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdyYWRpZW50fGVufDB8MXwwfHx8MA%3D%3D";

const imageUriNight =
  "https://images.unsplash.com/photo-1590272456521-1bbe160a18ce?auto=format&fit=crop&q=80&w=1527&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function HomeScreen() {
  const [loadingData, setLoadingData] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [searchList, setSearchList] = useState([]);
  const [showList, setShowList] = useState(false);

  // Initial forecast data
  useEffect(() => {
    setLoadingData(true);
    fetchForecastDays({ location: "sao-paulo" })
      .then((data) => setWeatherData(data.data))
      .finally(() => setLoadingData(false));
  }, []);

  const handleSelectLocation = useCallback((location) => {
    setShowList(false);
    fetchForecastDays({ location: location?.name }).then((data) =>
      setWeatherData(data.data)
    );
  }, []);

  const toggleShowList = useCallback(() => {
    setShowList((prev) => !prev);
  }, []);

  const { current, location, forecast } = weatherData ?? {};

  const handleSearch = useCallback((search) => {
    fetchSearchLocations({
      search,
    }).then((data) => setSearchList(data.data));
  }, []);

  const handleOnSearchDebounce = useCallback(debounce(handleSearch, 1500), []);

  if (loadingData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading ...</Text>
      </View>
    );
  }
  return (
    <View className="flex flex-1 relative">
      <Image
        blurRadius={current?.is_day ? 10 : 0}
        source={{
          uri: current?.is_day ? imageUriDay : imageUriNight,
        }}
        className="absolute h-full w-full left-0"
      />

      <SafeAreaView className="flex flex-1 z-10 h-full">
        <View className="h-full pt-10">
          <View className="relative z-[100] mx-4 ">
            <TouchableWithoutFeedback
              onPress={() => {
                toggleShowList();
              }}
            >
              <View className="relative py-2">
                <View className="h-10">
                  <View className="flex-row items-center rounded-full bg-white">
                    <TextInput
                      returnKeyType="done"
                      placeholder="Pesquisar região"
                      className="p-3 flex-1"
                      onChangeText={handleOnSearchDebounce}
                      onFocus={() => {
                        setShowList(true);
                      }}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>

            {showList && (
              <View className="absolute flex-col p-2 bg-white/10 rounded-md max-h-32 top-14 w-full z-50">
                {searchList?.length === 0 && (
                  <Text className="text-center p-3 bg-gray-300 rounded-md">
                    Nenhum resultado encontrado
                  </Text>
                )}

                {searchList?.length > 0 && (
                  <ScrollView
                    nestedScrollEnabled={false}
                    contentContainerStyle={{ gap: 12 }}
                  >
                    {searchList?.map((item) => {
                      return (
                        <TouchableOpacity
                          key={item.id}
                          onPress={() => {
                            handleSelectLocation(item);
                          }}
                        >
                          <View className="flex-row space-x-2 p-3 bg-gray-300 rounded-md">
                            <MapPinIcon size="16" color="black" />
                            <Text>
                              {item.name}, {item.country}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                )}
              </View>
            )}
          </View>

          <ScrollView showsHorizontalScrollIndicator={false}>
            <View className="flex-1 justify-center items-center gap-4 py-3">
              <Text className="text-white text-lg">
                {location?.name}, {location?.country}
              </Text>

              {getWeatherIcon(
                current?.condition?.code,
                current?.condition?.is_day
              )}

              <View className="flex-col items-center space-y-2">
                <Text className="text-white text-5xl">
                  {current?.temp_c}&#176;
                </Text>
                <Text className="text-white text-lg tracking-widest">
                  {current?.condition?.text}
                </Text>
              </View>

              {/* Other infos */}
              <View className="flex-row space-x-4 p-3 bg-white/10 rounded">
                <View className="flex-row space-x-2 items-center">
                  <Wind color="white" height="24" width="24" />
                  <Text className="text-white">{current?.wind_kph}km</Text>
                </View>

                <View className="flex-row space-x-2 items-center">
                  <Drop color="white" height="24" width="24" />
                  <Text className="text-white">{current?.humidity}%</Text>
                </View>

                <View className="flex-row space-x-2 items-center">
                  <Thermometer color="white" height="24" width="24" />
                  <Text className="text-white">
                    {current?.feelslike_c}&#176;
                  </Text>
                </View>
              </View>

              <View className="flex flex-col px-6 space-y-4 w-full pt-4">
                <View className="flex-row space-x-2 items-center">
                  <CalendarDaysIcon color="white" />
                  <Text className="text-white">Previsão</Text>
                </View>

                {forecast?.forecastday?.map((item) => {
                  const itemDate = new Date(item.date);
                  const day = itemDate.toLocaleString("pt-br", {
                    weekday: "long",
                    day: "numeric",
                  });

                  return (
                    <DailyForecast
                      key={day}
                      day={day}
                      temperature={item?.day?.avgtemp_c}
                      chanceOfRain={item?.day?.daily_chance_of_rain}
                      conditionText={item?.day?.condition?.text}
                    >
                      {getWeatherIcon(item?.day?.condition?.code, true)}
                    </DailyForecast>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <StatusBar style="light" />
    </View>
  );
}
