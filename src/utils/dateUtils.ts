export const subDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

export const subHours = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() - hours);
  return result;
};

export const subMinutes = (date: Date, minutes: number): Date => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() - minutes);
  return result;
};

export const formatDate = (date: Date): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const isToday = date >= today;
  const isYesterday = date >= yesterday && date < today;
  
  if (isToday) {
    return formatTime(date);
  } else if (isYesterday) {
    return 'Ontem';
  } else {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }).format(date);
  }
};

export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};