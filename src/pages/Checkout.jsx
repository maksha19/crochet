import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';

export const Checkout = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
    });

    const subtotal = cart.total;
    // const shipping = subtotal > 100 ? 0 : 9.99;
    const shipping = 0;
    const total = subtotal + shipping;

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Generate order number
        const orderNumber = 'CR-' + Math.random().toString(36).substr(2, 9).toUpperCase();

        // Build WhatsApp message
        let message = `*NEW ORDER - ${orderNumber}*\n\n`;
        message += `*Customer Information:*\n`;
        message += `Name: ${formData.firstName} ${formData.lastName}\n`;
        message += `Email: ${formData.email}\n`;
        message += `Phone: ${formData.phone || 'N/A'}\n`;
        message += `Address: ${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}\n\n`;

        message += `*Order Items:*\n`;
        cart.items.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   - Color: ${item.selectedColor}\n`;
            message += `   - Quantity: ${item.quantity}\n`;
            message += `   - Price: $${item.price.toFixed(2)} each\n`;
            message += `   - Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`;
        });

        message += `*Order Summary:*\n`;
        message += `Subtotal: $${subtotal.toFixed(2)}\n`;
        // message += `Shipping: ${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}\n`;
        message += `*Total: $${total.toFixed(2)}*\n\n`;
        message += `Thank you for your order! 🧶`;

        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = '6583646492'; // Singapore format with country code
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp in new window
        // Open WhatsApp immediately to avoid mobile popup blockers
        window.open(whatsappURL, '_blank');

        setIsSubmitting(false);
        setOrderComplete(true);
        setOrderNumber(orderNumber);
        clearCart();

        // Redirect to home after 5 seconds
        setTimeout(() => {
            navigate('/');
        }, 5000);
    };

    if (cart.items.length === 0 && !orderComplete) {
        navigate('/cart');
        return null;
    }

    if (orderComplete) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center py-16">
                <div className="text-center animate-scale-in">
                    <div className="mb-8">
                        <svg className="w-24 h-24 mx-auto text-success" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h1 className="font-heading text-4xl text-text mb-4">
                        Order Confirmed!
                    </h1>
                    <p className="text-text-light text-lg mb-2">
                        Thank you for your purchase!
                    </p>
                    <p className="text-text-light">
                        Order #{orderNumber}
                    </p>
                    <p className="text-sm text-text-light mt-6">
                        WhatsApp message sent! Redirecting to home page...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="font-heading text-4xl text-text mb-8">Checkout</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-surface rounded-lg shadow-lg p-6">
                            <h2 className="font-heading text-2xl text-text mb-6">
                                Shipping Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-text font-medium mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-text font-medium mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-text font-medium mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-text font-medium mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-text font-medium mb-2">
                                    Address *
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    className="input-field"
                                />
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mb-6">
                                <div>
                                    <label className="block text-text font-medium mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-text font-medium mb-2">
                                        State *
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-text font-medium mb-2">
                                        ZIP Code *
                                    </label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting ? 'Processing...' : 'Place Order'}
                            </Button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface rounded-lg shadow-lg p-6 sticky top-24">
                            <h2 className="font-heading text-2xl text-text mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-3 mb-6">
                                {cart.items.map((item) => (
                                    <div key={`${item.id}-${item.selectedColor}`} className="flex justify-between text-sm">
                                        <span className="text-text-light">
                                            {item.name} × {item.quantity}
                                        </span>
                                        <span className="text-text font-medium">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 pt-4 space-y-2 mb-4">
                                <div className="flex justify-between text-text-light">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                {/* <div className="flex justify-between text-text-light">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                </div> */}
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between font-heading text-xl text-text">
                                    <span>Total</span>
                                    <span className="text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
