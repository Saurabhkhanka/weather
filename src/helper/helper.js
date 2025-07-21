export const weatherTimeFormator = (sunrise, sunset) => {
  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });

  return {
    sunriseTime: formatTime(sunrise),
    sunsetTime: formatTime(sunset),
    timeInIST: formatTime(Date.now() / 1000)
  };
};
