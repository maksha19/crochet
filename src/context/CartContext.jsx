import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('crochetCart');
        return saved ? JSON.parse(saved) : { items: [], total: 0 };
    });

    useEffect(() => {
        localStorage.setItem('crochetCart', JSON.stringify(cart));
    }, [cart]);

    const calculateTotal = (items) => {
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const addToCart = (product, quantity = 1, color = null) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.items.findIndex(
                item => item.id === product.id && item.selectedColor === color
            );

            let newItems;
            if (existingItemIndex > -1) {
                // Update quantity of existing item
                newItems = [...prevCart.items];
                newItems[existingItemIndex].quantity += quantity;
            } else {
                // Add new item
                newItems = [
                    ...prevCart.items,
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity,
                        selectedColor: color || product.colors[0]
                    }
                ];
            }

            return {
                items: newItems,
                total: calculateTotal(newItems)
            };
        });
    };

    const removeFromCart = (productId, color) => {
        setCart(prevCart => {
            const newItems = prevCart.items.filter(
                item => !(item.id === productId && item.selectedColor === color)
            );
            return {
                items: newItems,
                total: calculateTotal(newItems)
            };
        });
    };

    const updateQuantity = (productId, color, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId, color);
            return;
        }

        setCart(prevCart => {
            const newItems = prevCart.items.map(item =>
                item.id === productId && item.selectedColor === color
                    ? { ...item, quantity: newQuantity }
                    : item
            );
            return {
                items: newItems,
                total: calculateTotal(newItems)
            };
        });
    };

    const clearCart = () => {
        setCart({ items: [], total: 0 });
    };

    const getItemCount = () => {
        return cart.items.reduce((sum, item) => sum + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getItemCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
