export const verifyDuration = (duration) => {
    if (!!duration && duration.toString().startsWith("PT")) {
      return duration.replace("PT", "").replace("H", "ч. ").replace("M", "м. ").slice(0, -3);
    }
    return duration;
  }