import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { Button } from '../components/common/Button';

export const Cart = () => {
    const { cart } = useCart();

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4">
                <h1 className="font-heading text-4xl text-text mb-8">Shopping Cart</h1>

                {cart.items.length === 0 ? (
                    // Empty Cart State
                    <div className="text-center py-16">
                        <div className="mb-8">
                            <svg className="w-24 h-24 mx-auto text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h2 className="font-heading text-2xl text-text mb-4">Your cart is empty</h2>
                        <p className="text-text-light mb-8">
                            Start adding some beautiful handcrafted items!
                        </p>
                        <Link to="/shop">
                            <Button>
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    // Cart with Items
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-surface rounded-lg shadow-lg p-6">
                                <h2 className="font-heading text-2xl text-text mb-6">
                                    Cart Items ({cart.items.length})
                                </h2>
                                <div className="space-y-4">
                                    {cart.items.map((item) => (
                                        <CartItem key={`${item.id}-${item.selectedColor}`} item={item} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Cart Summary */}
                        <div className="lg:col-span-1">
                            <CartSummary cart={cart} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
