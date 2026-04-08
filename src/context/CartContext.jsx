import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('crochetCart');
        const initialCart = saved ? JSON.parse(saved) : { items: [], total: 0 };

        // Normalize existing items to handle data structure changes
        if (initialCart.items && initialCart.items.length > 0) {
            initialCart.items = initialCart.items.map(item => ({
                ...item,
                price: Array.isArray(item.price) ? Number(item.price[0]) : Number(item.price)
            }));
            initialCart.total = initialCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        }

        return initialCart;
    });

    useEffect(() => {
        localStorage.setItem('crochetCart', JSON.stringify(cart));
    }, [cart]);

    const calculateTotal = (items) => {
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const addToCart = (product, quantity = 1, color = null, size = null, price = null, image = null) => {
        setCart(prevCart => {
            const selectedSize = size || (product.size ? product.size[0] : null);
            const selectedPrice = price !== null ? price : (product.price ? (Array.isArray(product.price) ? product.price[0] : product.price) : 0);
            const selectedImage = image || product.image[0];

            const existingItemIndex = prevCart.items.findIndex(
                item => item.id === product.id && item.selectedColor === color && item.selectedSize === selectedSize
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
                        price: selectedPrice,
                        image: selectedImage,
                        quantity,
                        selectedColor: color || product.colors[0],
                        selectedSize
                    }
                ];
            }

            return {
                items: newItems,
                total: calculateTotal(newItems)
            };
        });
    };

    const removeFromCart = (productId, color, size) => {
        setCart(prevCart => {
            const newItems = prevCart.items.filter(
                item => !(item.id === productId && item.selectedColor === color && item.selectedSize === size)
            );
            return {
                items: newItems,
                total: calculateTotal(newItems)
            };
        });
    };

    const updateQuantity = (productId, color, size, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId, color, size);
            return;
        }

        setCart(prevCart => {
            const newItems = prevCart.items.map(item =>
                item.id === productId && item.selectedColor === color && item.selectedSize === size
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
