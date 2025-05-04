/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatDate = (
  date: string | Date,
  locale = "en-US",
  options?: Intl.DateTimeFormatOptions
): string => {
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      ...options,
    }).format(dateObj);
  } catch (e:any) {
    console.error("Invalid date passed to formatDate:", date, e);
    return "";
  }
};
