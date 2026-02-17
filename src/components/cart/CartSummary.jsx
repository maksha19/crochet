import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

export const CartSummary = ({ cart }) => {
    const subtotal = cart.total;
    // const shipping = subtotal > 100 ? 0 : 9.99;
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <div className="bg-surface rounded-lg shadow-lg p-6 sticky top-24">
            <h2 className="font-heading text-2xl text-text mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-text-light">
                    <span>Subtotal ({cart.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                {/* <div className="flex justify-between text-text-light">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div> */}
                {/* {subtotal < 100 && subtotal > 0 && (
                    <p className="text-sm text-success">
                        Spend ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                )} */}
                <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-heading text-xl text-text">
                        <span>Total</span>
                        <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <Link to="/checkout">
                <Button className="w-full" disabled={cart.items.length === 0}>
                    Proceed to Checkout
                </Button>
            </Link>

            <Link to="/shop">
                <button className="w-full mt-3 text-primary hover:text-primary-dark transition-colors text-sm font-medium">
                    ← Continue Shopping
                </button>
            </Link>
        </div>
    );
};
