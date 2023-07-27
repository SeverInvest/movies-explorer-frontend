export const buildSlice = (payload) => {
    let tempObj = {};
    if (!!payload && Array.isArray(payload) && payload.length > 0) {
      for (let item in payload) {
        tempObj = {
          ...tempObj, ...{ [payload[item]._id]: payload[item] }
        }
      };
      return tempObj;
    } else {
      return { [payload._id]: payload };
    };
  };