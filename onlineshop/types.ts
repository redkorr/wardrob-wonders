export type Description = {
  body: string;
  fabric_main: string[];
  fabric_other?: string[];
  fabric_inside?: string[];
};
export type Cloth = {
  item_id?: string;
  product_id?: string;
  sex: string;
  name: string;
  price: string;
  type: string;
  images: string[];
  description: Description;
  color: string;
  size: string;
  stock: number;
};
