export function cn(...classes) {
  return classes
    .flatMap((item) => (typeof item === "string" ? item.split(" ") : []))
    .filter(Boolean)
    .join(" ");
}
