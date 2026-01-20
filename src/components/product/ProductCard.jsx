import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';

export const ProductCard = ({ product, onQuickView }) => {
    const { addToCart } = useCart();
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product, 1, selectedColor);

        // Reset animation after a short delay
        setTimeout(() => setIsAdding(false), 600);
    };

    return (
        <div className="group bg-surface rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
            {/* Product Image */}
            <div className="relative overflow-hidden aspect-square bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23E8D5C4" width="400" height="400"/%3E%3Ctext fill="%238B6F47" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ECrochet Item%3C/text%3E%3C/svg%3E';
                    }}
                />

                {/* Quick View Button */}
                <button
                    onClick={() => onQuickView(product)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <span className="bg-white text-text px-4 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Quick View
                    </span>
                </button>

                {/* Featured Badge */}
                {product.featured && (
                    <div className="absolute top-4 right-4 bg-accent text-text px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4 min-h-[250px]">
                <h3 className="font-heading text-xl text-text mb-2 line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-text-light text-sm mb-3 line-clamp-4">
                    {product.description}
                </p>

                {/* Color Selection */}
                {product.colors.length > 1 && (
                    <div className="mb-3">
                        <p className="text-xs text-text-light mb-2">Color:</p>
                        <div className="flex flex-wrap gap-2">
                            {product.colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-3 py-1 text-xs rounded-full capitalize transition-all ${selectedColor === color
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-200 text-text hover:bg-gray-300'
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {product.colors.length === 1 && (
                    <p className="text-xs text-text-light h-12 mb-2"></p>
                )}
                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between mt-4">
                    <span className="font-heading text-2xl text-primary font-semibold">
                        ${product.price.toFixed(2)}
                    </span>
                    <Button
                        onClick={handleAddToCart}
                        variant="primary"
                        className={`text-sm py-2 px-4 ${isAdding ? 'animate-bounce-subtle' : ''}`}
                    >
                        {isAdding ? '✓ Added!' : 'Add to Cart'}
                    </Button>
                </div>

                {/* Stock Status */}
                {!product.inStock && (
                    <p className="text-error text-sm mt-2">Out of Stock</p>
                )}
            </div>
        </div>
    );
};
