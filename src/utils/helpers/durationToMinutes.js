export const durationToMinutes = (duration) => {
    if (duration.startsWith("PT")) {
      let hoursBool = false;
      let min = "";
      let hours = 0;
      let hoursIndex;
      let minIndex;
      let result;
      if (duration.includes("H")) {
        hoursBool = true;
        hoursIndex = duration.indexOf("H");
        hours = parseInt(duration.slice(2, hoursIndex), 10);
      }
      if (duration.includes("M")) {
        minIndex = duration.indexOf("M");
        if (hoursBool) {
          min = duration.slice(hoursIndex + 1, minIndex);
        } else {
          min = duration.slice(2, minIndex);
        }
        result = hoursBool ? parseInt(min, 10) + hours * 60 : parseInt(min, 10);
      }
      return result
    }
    return duration;
  }