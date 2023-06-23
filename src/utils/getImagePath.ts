type Image = {
  url: string;
};

export const getImagePath = (image: Image) => `/images/tables/${image.url}`;
