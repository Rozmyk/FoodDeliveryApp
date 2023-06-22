
function getTimeDifference(timestamp: { seconds: number, nanoseconds: number }) {
  const currentDate = new Date();
  const commentDate = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

  const diffInMilliseconds = currentDate.getTime() - commentDate.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      if (diffInMinutes === 0) {
        return 'dodane przed chwilą';
      }
      return `dodane ${diffInMinutes} ${diffInMinutes === 1 ? 'minutę' : (diffInMinutes >= 2 && diffInMinutes <= 4) ? 'minuty' : 'minut'} temu`;
    }
    return `dodane ${diffInHours} ${diffInHours === 1 ? 'godzinę' : (diffInHours >= 2 && diffInHours <= 4) ? 'godziny' : 'godzin'} temu`;
  } else if (diffInDays === 1) {
    return 'dodane wczoraj';
  } else if (diffInDays < 31) {
    return `dodane ${diffInDays} ${diffInDays === 1 ? 'dzień' : 'dni'} temu`;
  }

  const diffInMonths =
    (currentDate.getFullYear() - commentDate.getFullYear()) * 12 + (currentDate.getMonth() - commentDate.getMonth());
  return `dodane ${diffInMonths} ${diffInMonths === 1 ? 'miesiąc' : (diffInMonths >= 2 && diffInMonths <= 4) ? 'miesiące' : 'miesięcy'} temu`;
}

export default getTimeDifference;
