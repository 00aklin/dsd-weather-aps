import {
  Cloudy,
  HeavyRain,
  HeavyRainAndSun,
  PartlyCloudy,
  Rain,
  Sunny,
  RainAndSun,
  Blizzard,
  Fog,
  RainThunder,
  Moon,
  HeavyRainAndMoon,
  RainAndMoon,
  PartlyCloudyNight,
} from "../components/icons";

export const API_KEY = "175bd4d52d94408bbab15040232310";

const iconProps = {
  height: "80px",
  width: "80px",
  color: "#f2f1ed",
};

// check codes in https://www.weatherapi.com/docs/weather_conditions.json

export const weatherImagesDay = {
  1003: <PartlyCloudy {...iconProps} />,
  1189: <Rain {...iconProps} />,
  1063: <Rain {...iconProps} />,
  1000: <Sunny {...iconProps} />,
  1009: <Cloudy {...iconProps} />,
  1006: <Cloudy {...iconProps} />,
  1183: <Rain {...iconProps} />,
  1186: <RainAndSun {...iconProps} />,
  1195: <HeavyRain {...iconProps} />,
  1192: <HeavyRainAndSun {...iconProps} />,
  1201: <Blizzard {...iconProps} />,
  1243: <HeavyRainAndSun {...iconProps} />,
  1276: <RainThunder {...iconProps} />,
  1030: <Fog {...iconProps} />,
  other: <Rain {...iconProps} />,
};

export const weatherImagesNight = {
  1003: <PartlyCloudyNight {...iconProps} />,
  1189: <Rain {...iconProps} />,
  1063: <Rain {...iconProps} />,
  1000: <Moon {...iconProps} />,
  1009: <Cloudy {...iconProps} />,
  1006: <Cloudy {...iconProps} />,
  1183: <Rain {...iconProps} />,
  1186: <RainAndMoon {...iconProps} />,
  1195: <HeavyRain {...iconProps} />,
  1192: <HeavyRainAndMoon {...iconProps} />,
  1201: <Blizzard {...iconProps} />,
  1243: <HeavyRainAndMoon {...iconProps} />,
  1276: <RainThunder {...iconProps} />,
  1030: <Fog {...iconProps} />,
  other: <Rain {...iconProps} />,
};

export const getWeatherIcon = (code, isDay) => {
  return isDay
    ? weatherImagesDay[code] ?? weatherImagesDay["other"]
    : weatherImagesNight[code] ?? weatherImagesDay["other"];
};
