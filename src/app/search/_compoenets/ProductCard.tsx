import Image from 'next/image';

interface ProductCardProps {
  product: {
    product_id: number;
    images: string;
    video: string | null;
    pro_title: string;
    pro_price: number;
    management_cost: number;
    pro_supply_a: number;
    pro_site_a: number;
    pro_heat: string;
    pro_type: string;
    pro_floor: number;
    description: string;
    sale: boolean;
    pro_rooms: number;
    pro_bathrooms: number;
    pro_construction_year: number;
    add_new: string;
    add_old: string;
    username: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
  };
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div onClick={onClick} className="cursor-pointer border overflow-hidden">
      <div className="relative h-48">
        <Image
          src={product.images}
          alt={product.pro_title}
          fill
          className="object-cover"
          priority={false}
        />
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
