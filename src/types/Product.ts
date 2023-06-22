export type Review = {
  title: string;
  body: string;
  rating: number;
};

export type Product = {
  id: string;
  name: string;
  producer: string;
  price: number;
  description: string;
  images: {
    url: string;
  }[];
  features: {
    name: string;
  }[];
  dimensions: {
    name: string;
    value: string;
  }[];
  colors: {
    name: string;
    hex: string;
  }[];
  reviews: Review[];
};

export type DashboardProduct = Omit<Product, 'features' | 'colors' | 'reviews'>;

export type CartProduct = {
  details: Pick<Product, 'id' | 'name' | 'price' | 'producer' | 'images'>;
  quantity: number;
  size: string;
  color: string;
};
