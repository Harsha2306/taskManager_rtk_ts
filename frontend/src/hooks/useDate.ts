const useDate = (date: string | undefined): string => {
  if (!date) return "";

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfDate = new Date(
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate()
  );

  const diffInDays = Math.floor(
    (startOfDate.getTime() - startOfToday.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Today";
  else if (diffInDays > 7) {
    return dateObj.toDateString(); // Use the Date object
  } else if (diffInDays > 0) {
    return dateObj.toLocaleDateString("en-US", { weekday: "long" });
  } else {
    return dateObj.toDateString(); // Use the Date object
  }
};

export default useDate;
