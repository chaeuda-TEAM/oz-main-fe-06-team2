import { useState, useEffect } from 'react';
import { DetailContent } from './components/DetailContent';
import { Images } from './components/Images';
import { Dialog } from '@radix-ui/react-dialog';
import { Contact } from './components/Contact';
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

interface Product {
  product_id: number;
  images: string[];
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
}

interface ProductDetailModalProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal = ({ productId, isOpen, onClose }: ProductDetailModalProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (isOpen && productId) {
        setIsLoading(true);
        try {
          const response = await fetch(`${BASEURL}/api/product/detail/${productId}`);
          if (!response.ok) throw new Error('API 요청 실패');
          const data = await response.json();
          setProduct(data.product);
        } catch (error) {
          console.error('API 요청 에러:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();
  }, [productId, isOpen]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-4xl rounded-lg shadow-xl overflow-hidden">
          {isLoading ? (
            <div className="h-[600px] animate-pulse bg-gray-100" />
          ) : product ? (
            <>
              <Images images={product.images} video={product.video} />
              <DetailContent product={product} />
              <Contact phone_number={product.phone_number} />
            </>
          ) : (
            <div className="h-[600px] flex items-center justify-center">
              정보를 불러오는데 실패했습니다.
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};
