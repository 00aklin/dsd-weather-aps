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
} from "../components/icons";

export const API_KEY = "175bd4d52d94408bbab15040232310";

const iconProps = {
  height: "120px",
  width: "120px",
  color: "#f2f1ed",
};

export const weatherImagesDay = {
  "Partly cloudy": <PartlyCloudy {...iconProps} />,
  "Moderate rain": <Rain {...iconProps} />,
  "Patchy rain possible": <Rain {...iconProps} />,
  Sunny: <Sunny {...iconProps} />,
  Clear: <Sunny {...iconProps} />,
  Overcast: <Cloudy {...iconProps} />,
  Cloudy: <Cloudy {...iconProps} />,
  "Light rain": <Rain {...iconProps} />,
  "Moderate rain at times": <RainAndSun {...iconProps} />,
  "Heavy rain": <HeavyRain {...iconProps} />,
  "Heavy rain at times": <HeavyRainAndSun {...iconProps} />,
  "Moderate or heavy freezing rain": <Blizzard {...iconProps} />,
  "Moderate or heavy rain shower": <HeavyRainAndSun {...iconProps} />,
  "Moderate or heavy rain with thunder": <RainThunder {...iconProps} />,
  Mist: <Fog {...iconProps} />,
  other: <Rain {...iconProps} />,
};

export const weatherImagesNight = {
  "Partly cloudy": <PartlyCloudy {...iconProps} />,
  "Moderate rain": <Rain {...iconProps} />,
  "Patchy rain possible": <Rain {...iconProps} />,
  Sunny: <Moon {...iconProps} />,
  Clear: <Moon {...iconProps} />,
  Overcast: <Cloudy {...iconProps} />,
  Cloudy: <Cloudy {...iconProps} />,
  "Light rain": <Rain {...iconProps} />,
  "Moderate rain at times": <RainAndMoon {...iconProps} />,
  "Heavy rain": <HeavyRain {...iconProps} />,
  "Heavy rain at times": <HeavyRainAndMoon {...iconProps} />,
  "Moderate or heavy freezing rain": <Blizzard {...iconProps} />,
  "Moderate or heavy rain shower": <HeavyRainAndMoon {...iconProps} />,
  "Moderate or heavy rain with thunder": <RainThunder {...iconProps} />,
  Mist: <Fog {...iconProps} />,
  other: <Rain {...iconProps} />,
};
