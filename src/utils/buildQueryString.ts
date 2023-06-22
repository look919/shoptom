export const buildQueryString = (params: Record<string, string | number | string[]>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => {
        searchParams.append(key, item);
      });
    } else if (value) {
      searchParams.append(key, value.toLocaleString());
    }
  });

  return searchParams.toString();
};
