export const getSlug = (title: string): string => {
  return title
    .split(" ")
    .map((s) =>
      s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
    )
    .join("-");
};
