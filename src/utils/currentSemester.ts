export const currentSemester = (data: any) => {
  let currentMonth = new Date().getMonth() + 1;
  for (var i = 0; i < data.length; i++) {
    if (currentMonth <= 4 && data.season === 'SPRING') return data[i];
    else if (currentMonth <= 8 && data.season === 'SUMMER') return data[i];
    return data[i];
  }
};
