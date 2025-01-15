'use client';

import { Heart } from 'lucide-react';
import { fetchLikeLists } from '@/api/product';
import useAccessToken from '@/hooks/useAccessToken';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MyProduct, Pro_type } from '@/types/product';

const LikeProductsPage = () => {
  const accessToken = useAccessToken();
  const [likedProducts, setLikedProducts] = useState<MyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      const fetchProducts = async () => {
        setIsLoading(true);
        setError('');
        try {
          const response = await fetchLikeLists(accessToken);

          if (response.success) {
            setLikedProducts(response.products);
          } else {
            setError(response.message || 'Failed to fetch liked products.');
          }
        } catch (err) {
          setError('An error occurred while fetching liked products.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProducts();
    }
  }, [accessToken]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const handleCardClick = (productId: string) => {
    router.push(`/product/detail/${productId}`);
  };

  // TODO : 좋아요 토글 버튼 연결

  const formatDate = (dateString: string) => {
    return dateString.slice(0, 10).replace(/-/g, '/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {likedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {likedProducts.map(product => (
            <div
              key={product.product_id}
              onClick={() => handleCardClick(product.product_id)}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={product.images}
                  alt={product.pro_title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-normal flex-grow">{product.pro_title}</h2>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full">
                    <Heart className="w-5 h-5 fill-red-500 stroke-red-500" />
                  </button>
                </div>

                <p className="font-bold">{product.pro_price.toLocaleString()}원</p>

                <div className="flex flex-wrap justify-between text-sm text-gray-600 gap-1">
                  <span>
                    {Pro_type[product.pro_type]} | {product.pro_supply_a}㎡
                  </span>
                  <p className="text-sm text-gray-600">등록일: {formatDate(product.created_at)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">좋아요한 매물이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default LikeProductsPage;
