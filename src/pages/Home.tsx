import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { productService } from "@/services/product.service";
import type { Product } from "../types/product";
import ProductCard from "@/components/product/ProductCard";

export default function Home() {
  const navigate = useNavigate(); 
  const [products, setProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    productService.getAll().then((data) => {
      const firstSix = data.slice(0, 6);
      setProducts(firstSix);
      setLoading(false);

      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % firstSix.length;
        setCurrentImageIndex(index);
      }, 3000);

      return () => clearInterval(interval);
    });
  }, []);

  const heroProduct = products[currentImageIndex];

  return (
    <main>
      {}
      <section className="relative bg-gradient-to-b from-indigo-50 via-white to-white py-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-4">
          {}
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
              Discover products <br /> that fit your style
            </h1>
            <p className="mt-6 text-gray-600 max-w-md mx-auto md:mx-0 text-lg sm:text-xl">
              Explore our curated collection of modern essentials and timeless classics.
            </p>

            {}
            <Button
              onClick={() => navigate("/products")}
              className="mt-8 px-8 py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg"
            >
              Shop Now
            </Button>
          </div>

          {}
          <div className="flex justify-center md:justify-end">
            <div className="h-96 w-96 rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden shadow-2xl border border-gray-100">
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : products.length > 0 ? (
                <img
                  src={heroProduct.image}
                  alt={heroProduct.title}
                  className="h-full w-full object-contain transition-all duration-700"
                />
              ) : (
                <p className="text-gray-500">No products</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-3xl sm:text-4xl font-bold text-gray-900 text-center md:text-left">
          Featured Products
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
