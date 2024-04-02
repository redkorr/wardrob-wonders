export type Description = {
  body: string;
  fabric_main: string[];
  fabric_other?: string[];
  fabric_inside?: string[];
};
export type Product = {
  product_id?: string;
  sex: string;
  currency: string;
  category: Category;
  type: ProductType;
  description: Description;
  colors: Color[];
};
export type Color = {
  name: string;
  item_id?: string;
  color_name: string;
  color: string;
  sizes: {
    [sizeKey: string]: Size;
  };
  images: string[];
};

export type Category = {
  name: string;
  types: ProductType[];
};

export type ProductType = {
  name: string;
  display_name: string;
};

export type Filters = {
  colors: string[];
  sizes: string[];
  prices: Price;
};

export type Price = {
  min: number;
  max: number;
};

export type Size = {
  stock: number;
  price: number;
};

export type FilterState = {
  colors: {
    [color: string]: boolean;
  };
  sizes: {
    [size: string]: boolean;
  };
  price: Price;
};

export type ShoppingCartState = {
  items: ShoppingCartItem[];
  count: number;
  status: Status;
};
export type ShoppingCartItem = {
  shopping_cart_id?: string;
  product_id?: string;
  currency: string;
  quantity: number;
  category: Category;
  type: ProductType;
  color: Partial<Color>;
};

const statuses = ['LOADING', 'SUCCESS', 'EMPTY'] as const;

export type Status = (typeof statuses)[number];

export type FilterStateWithoutPrice = Omit<FilterState, 'price'>;
