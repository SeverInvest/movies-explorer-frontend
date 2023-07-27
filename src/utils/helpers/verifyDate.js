export const verifyDate = (dtm) => {
  if (!!dtm) {
    const d = new Date(dtm);
    if (d instanceof Date && !isNaN(d)) {
      return d.toLocaleDateString('ru-RU');
    }
  };
  return dtm;
};
