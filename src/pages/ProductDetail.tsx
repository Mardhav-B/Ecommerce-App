import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "@/services/product.service";
import type { Product } from "@/types/product";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      productService.getById(id)
        .then((data) => setProduct(data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!product) return <p className="p-6 text-center">Product not found</p>;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 grid md:grid-cols-2 gap-10">
      <img
        src={product.image}
        alt={product.title}
        className="w-full object-contain"
      />
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="mt-4 text-gray-600">{product.description}</p>
        <p className="mt-6 text-2xl font-semibold text-indigo-600">
          ${product.price}
        </p>
      </div>
    </div>
  );
}
