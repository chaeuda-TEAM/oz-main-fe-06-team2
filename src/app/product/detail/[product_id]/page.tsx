'use client';

import { useState, useEffect } from 'react';
import { DetailContent } from './components/DetailContent';
import { Images } from './components/Images';
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

export default function ProductDetailPage({ params }: { params: { product_id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASEURL}/api/product/detail/${params.product_id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        console.log(data.product);
        setProduct(data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.product_id]);

  return (
    <div>
      <div>
        {isLoading ? (
          <div className="h-[600px] animate-pulse bg-gray-100" />
        ) : product ? (
          <div className="p-6">
            <Images images={product.images} video={product.video} />
            <DetailContent product={product} />
            <Contact phone_number={product.phone_number} />
          </div>
        ) : (
          <div>정보를 불러오는데 실패했습니다.</div>
        )}
      </div>
    </div>
  );
}
