import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const Header = () => {
    const { getItemCount } = useCart();
    const itemCount = getItemCount();

    return (
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="group">
                        <h1 className="font-heading text-3xl text-primary group-hover:text-primary-dark transition-colors">
                            Cozy Crochet
                        </h1>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex gap-8">
                        <Link
                            to="/"
                            className="text-text hover:text-primary transition-colors font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/shop"
                            className="text-text hover:text-primary transition-colors font-medium"
                        >
                            Shop
                        </Link>
                        <a
                            href="#about"
                            className="text-text hover:text-primary transition-colors font-medium"
                        >
                            About
                        </a>
                    </nav>

                    {/* Cart Icon */}
                    <Link
                        to="/cart"
                        className="relative group"
                    >
                        <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <svg className="w-6 h-6 text-text group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>

                            {/* Cart Badge */}
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-subtle">
                                    {itemCount}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>

                {/* Mobile Navigation */}
                <nav className="md:hidden flex gap-6 mt-4 justify-center">
                    <Link
                        to="/"
                        className="text-text hover:text-primary transition-colors font-medium text-sm"
                    >
                        Home
                    </Link>
                    <Link
                        to="/shop"
                        className="text-text hover:text-primary transition-colors font-medium text-sm"
                    >
                        Shop
                    </Link>
                    <a
                        href="#about"
                        className="text-text hover:text-primary transition-colors font-medium text-sm"
                    >
                        About
                    </a>
                </nav>
            </div>
        </header>
    );
};
