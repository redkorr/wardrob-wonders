import { addShoppingCartItem } from '@/features/shoppingCartSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ChevronDown, ChevronUp, Shirt, ShoppingCart, Truck, Undo2 } from 'lucide-react';
import { Dispatch, useState } from 'react';
import { toast } from 'sonner';

import { Color, Product, ShoppingCartItem } from 'types';

interface ProductInfoParams {
  product: Product | undefined;
  setDetailsInfoState: Dispatch<React.SetStateAction<number>>;
  color: Color | undefined;
  selectColor: (arg0: string) => void;
}

const ProductInfo = ({ setDetailsInfoState, color, selectColor, product }: ProductInfoParams) => {
  const [selectedSize, setSelectedSize] = useState<string>(Object.keys(color?.sizes || {})[0]);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();
  const scrollToDetails = (index: number) => {
    const element = document.getElementById('DetailsInfoHeader');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setDetailsInfoState(index);
    }
  };

  const createShoppingCartItem = (): ShoppingCartItem | undefined => {
    if (!product || !color) return;
    const shoppingCartId = product.product_id?.concat(
      '',
      color.color_name.toLowerCase().concat('', selectedSize.toLowerCase())
    );
    const shoppingCartItem: ShoppingCartItem = {
      shopping_cart_id: shoppingCartId,
      product_id: product.product_id,
      currency: product.currency,
      type: product.type,
      category: product.category,
      quantity: 1,
      color: {
        color_name: color.color_name,
        color: color.color,
        name: color.name,
        images: [color.images[0]],
        sizes: {
          [selectedSize]: {
            price: color.sizes[selectedSize].price,
            stock: color.sizes[selectedSize].stock
          }
        }
      }
    };
    return shoppingCartItem;
  };

  return (
    <>
      {color && (
        <div className="w-3/4 p-6 mt-6 mx-auto">
          <h1 className="text-3xl mb-10">{color.name}</h1>
          <h2 className="text-2xl mb-10">
            {color.sizes && color.sizes[selectedSize].price}&nbsp;
            {product?.currency}
          </h2>
          <div className="flex gap-2 mb-10">
            {product?.colors.map((color) => (
              <button
                style={
                  color.color_name === 'Multicolor'
                    ? { backgroundImage: `url(${color.color})`, backgroundSize: 'cover' }
                    : { backgroundColor: `${color.color}` }
                }
                className="h-12 w-12 rounded-full relative"
                onClick={() => selectColor(color.color_name)}
                key={color.color_name}
              >
                <div className="w-11 h-11 z-0 absolute top-[2px] right-[2px] border-2 border-white rounded-full "></div>
                <img
                  src="/fabric.png"
                  className="opacity-30 rounded-full"
                />
              </button>
            ))}
          </div>
          <button
            className="flex justify-between items-center text-base border border-slate-800 w-full py-2 px-3 mb-6"
            onClick={() => setIsActive(!isActive)}
          >
            <p>{color.sizes && selectedSize}</p> {isActive ? <ChevronUp /> : <ChevronDown />}
          </button>
          <div className="relative -top-6">
            {isActive && (
              <div className="flex flex-col z-10 absolute top-1 left-0 w-full bg-white mt-2 border px-2">
                {product &&
                  Object.keys(color.sizes).map((size) => (
                    <button
                      className="p-2 border-b text-left flex gap-2"
                      style={color.sizes[size].stock > 0 ? {} : { color: 'grey' }}
                      disabled={color.sizes[size].stock <= 0}
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setIsActive(!isActive);
                      }}
                    >
                      {size}
                      {color.sizes[size].stock <= 0 && <p>(Out of Stock)</p>}
                    </button>
                  ))}
              </div>
            )}
          </div>
          <button
            className="flex py-2 px-3 mb-10 border border-blue-500 bg-blue-900 text-white w-full hover:bg-blue-800 transition duration-200 ease-in-out"
            onClick={() => {
              const shoppingCartItem = createShoppingCartItem();
              if (shoppingCartItem) {
                dispatch(addShoppingCartItem(shoppingCartItem));
                toast.success('The product has been added to card.');
              }
            }}
          >
            <ShoppingCart className="absolute" />
            <p className="m-auto">Add to cart</p>
          </button>
          <div className="flex justify-center flex-wrap gap-4">
            <button
              className="flex items-center gap-3 m-3 text-lg hover:text-slate-600 transition duration-200 ease-in-out"
              onClick={() => scrollToDetails(0)}
            >
              <Shirt />
              Product details
            </button>
            <button
              className="flex items-center gap-3 m-3 text-lg hover:text-slate-600 transition duration-200 ease-in-out"
              onClick={() => scrollToDetails(1)}
            >
              <Truck />
              Shipping in up to 30 days
            </button>
            <button
              className="flex items-center gap-3 m-3 text-lg hover:text-slate-600 transition duration-200 ease-in-out"
              onClick={() => scrollToDetails(2)}
            >
              <Undo2 />
              30 days to return
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfo;
