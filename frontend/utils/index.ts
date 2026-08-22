export const getInitial = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 1)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export const formatDate = (date: string | Date): string => {
   return new Intl.DateTimeFormat("en-NG", {
    timeZone: "Africa/Lagos",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}