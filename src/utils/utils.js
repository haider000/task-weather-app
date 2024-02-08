import clearAnimation from "../assets/clear.json";
import cloudsAnimation from "../assets/clouds.json";
import drizzleAnimation from "../assets/drizzle.json";
import humidityAnimation from "../assets/humidity.json";
import mistAnimation from "../assets/mist.json";
import rainAnimation from "../assets/rain.json";
import snowAnimation from "../assets/snow.json";
import windAnimation from "../assets/wind.json";
import defaultAnimation from "../assets/loading.json";

export const getAnimationByName = (weatherName) => {
  const nameToAnimationMap = {
    Clouds: cloudsAnimation,
    Clear: clearAnimation,
    Rain: rainAnimation,
    Drizzle: drizzleAnimation,
    Mist: mistAnimation,
    Snow: snowAnimation,
    Humidity: humidityAnimation,
    Wind: windAnimation,
  };

  return {
    isClickToPauseDisabled: true,
    options: {
      loop: true,
      autoplay: true,
      animationData: nameToAnimationMap[weatherName] || defaultAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    },
  };
};

export const getDayName = (day) => {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}