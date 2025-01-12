import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { Location, Product } from '@/types/product';
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

interface ProductListProps {
  location: Location;
  onProductClick: (productId: string) => void;
}

export const ProductList = ({ location, onProductClick }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNearbyProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASEURL}/api/product/nearby`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: location.latitude,
            longitude: location.longitude,
          }),
        });

        if (!response.ok) throw new Error('Failed to fetch nearby products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching nearby products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNearbyProducts();
  }, [location]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin">로딩중</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 overflow-auto h-[calc(100vh-200px)]">
      {products.length > 0 ? (
        products.map(product => (
          <ProductCard
            key={product.product_id}
            product={product}
            onClick={() => onProductClick(product.product_id.toString())}
          />
        ))
      ) : (
        <div className="text-center text-gray-500">이 지역에는 매물이 없습니다.</div>
      )}
    </div>
  );
};
