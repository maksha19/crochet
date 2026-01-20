import { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useCart } from '../../context/CartContext';

export const ProductDetail = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();
    const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    if (!product) return null;

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product, quantity, selectedColor);

        setTimeout(() => {
            setIsAdding(false);
            setQuantity(1);
        }, 600);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={product.name}>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600"%3E%3Crect fill="%23E8D5C4" width="600" height="600"/%3E%3Ctext fill="%238B6F47" font-family="Arial" font-size="32" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ECrochet Item%3C/text%3E%3C/svg%3E';
                            }}
                        />

                    </div>
                    <div className="mt-6">
                        <h4 className="font-heading text-2xl text-primary font-semibold mb-4 !text-black">Detailed Usage & Benefits:</h4>
                        {product.detailedUsageAndBenefits && (
                            <ul className="list-disc list-outside ml-5 mb-6 text-text-light space-y-1">
                                {product.detailedUsageAndBenefits.map((benefit, index) => (
                                    <li key={index}>{benefit}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                {/* Product Details */}
                <div className="flex flex-col">
                    <div className="mb-4">
                        <span className="font-heading text-4xl text-primary font-semibold">
                            ${product.price.toFixed(2)}
                        </span>
                        {product.featured && (
                            <span className="ml-4 bg-accent text-text px-3 py-1 rounded-full text-sm font-medium">
                                Featured
                            </span>
                        )}
                    </div>
                    <h4 className="font-heading text-2xl text-primary font-semibold mb-4 !text-black">Product</h4>

                    <p className="text-text-light mb-6 leading-relaxed">
                        {product.description}
                    </p>
                    <div className="mb-6">
                        <h4 className="font-heading text-2xl text-primary font-semibold mb-4 !text-black">Product Story</h4>
                        {product.caption && (
                            <ul className="list-disc list-outside ml-5 mb-6 text-text-light space-y-1">
                                {product.caption.map((benefit, index) => (
                                    <li key={index}>{benefit}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* Color Selection */}
                    <div className="mb-6">
                        <label className="block text-text font-medium mb-3">Select Color:</label>
                        <div className="flex flex-wrap gap-3">
                            {product.colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 py-2 rounded-lg capitalize transition-all ${selectedColor === color
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-gray-200 text-text hover:bg-gray-300'
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity Selection */}
                    <div className="mb-6">
                        <label className="block text-text font-medium mb-3">Quantity:</label>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>
                            <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div className="mb-6">
                        {product.inStock ? (
                            <p className="text-success flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                In Stock
                            </p>
                        ) : (
                            <p className="text-error">Out of Stock</p>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className={`w-full ${isAdding ? 'animate-bounce-subtle' : ''} ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isAdding ? '✓ Added to Cart!' : 'Add to Cart'}
                    </Button>

                    {/* Category */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-sm text-text-light">
                            Category: <span className="text-text capitalize">{product.category.replace('-', ' ')}</span>
                        </p>
                    </div>
                </div>

            </div>
        </Modal>
    );
};
