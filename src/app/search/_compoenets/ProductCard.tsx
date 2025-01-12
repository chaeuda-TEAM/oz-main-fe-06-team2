import { Product } from '@/types/product';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div onClick={onClick} className="cursor-pointer border overflow-hidden">
      <div className="relative h-48">
        <Image src={product.images[0]} alt={product.pro_title} fill className="object-cover" />
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold">{product.pro_price.toLocaleString()}원</h3>
        <p className="text-sm mt-1">{product.add_new}</p>
        <div>
          <p className="text-sm mt-1">
            {product.pro_type} | {product.pro_supply_a}㎡
          </p>
          <p className="text-sm mt-1">{product.created_at}</p>
        </div>
      </div>
    </div>
  );
};
