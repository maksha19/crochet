import { useCart } from '../../context/CartContext';

export const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="flex gap-4 py-4 border-b border-gray-200 animate-slide-up">
            {/* Product Image */}
            <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
                onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23E8D5C4" width="100" height="100"/%3E%3C/svg%3E';
                }}
            />

            {/* Product Info */}
            <div className="flex-1">
                <h3 className="font-heading text-lg text-text mb-1">{item.name}</h3>
                <p className="text-sm text-text-light capitalize mb-2">
                    Color: {item.selectedColor}
                </p>
                <p className="font-semibold text-primary">
                    ${item.price.toFixed(2)}
                </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col items-end justify-between">
                <button
                    onClick={() => removeFromCart(item.id, item.selectedColor)}
                    className="text-text-light hover:text-error transition-colors"
                    title="Remove item"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>

                <p className="font-heading text-lg text-text">
                    ${(item.price * item.quantity).toFixed(2)}
                </p>
            </div>
        </div>
    );
};
