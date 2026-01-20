import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductGrid } from '../components/product/ProductGrid';
import { CategoryFilter } from '../components/product/CategoryFilter';
import { ProductDetail } from '../components/product/ProductDetail';

export const Shop = () => {
    const { filteredProducts, filter, setFilter } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="font-heading text-5xl text-text mb-4 animate-slide-up">
                        Our Collection
                    </h1>
                    <p className="text-text-light text-lg animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                        Browse our handcrafted crochet items
                    </p>
                </div>

                {/* Category Filter */}
                <CategoryFilter activeFilter={filter} onFilterChange={setFilter} />

                {/* Product Count */}
                <div className="mb-6">
                    <p className="text-text-light text-center">
                        Showing <span className="font-semibold text-text">{filteredProducts.length}</span> products
                    </p>
                </div>

                {/* Product Grid */}
                <ProductGrid
                    products={filteredProducts}
                    onQuickView={setSelectedProduct}
                />
            </div>

            {/* Product Detail Modal */}
            <ProductDetail
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
};
