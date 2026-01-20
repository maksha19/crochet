import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products, onQuickView }) => {
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-text-light text-lg">No products found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
                <div
                    key={product.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                >
                    <ProductCard product={product} onQuickView={onQuickView} />
                </div>
            ))}
        </div>
    );
};
