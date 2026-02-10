import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className="border rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-white cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)} // Navigate to ProductDetail
    >
      <div className="h-64 w-full flex items-center justify-center bg-gray-50 p-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
        <p className="mt-2 text-indigo-600 font-bold text-lg">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
