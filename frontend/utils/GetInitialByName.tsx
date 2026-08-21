export default function GetInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 1)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}