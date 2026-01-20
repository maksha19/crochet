import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductDetail } from '../components/product/ProductDetail';
import { Button } from '../components/common/Button';

export const Home = () => {
    const { featuredProducts } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-accent-light to-background py-20 md:py-32">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-heading text-5xl md:text-7xl text-text mb-6 animate-slide-up">
                        Handcrafted with{' '}
                        <span className="text-gradient">Love</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-text-light mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                        Discover unique crochet creations made with premium yarn and attention to detail
                    </p>
                    <div className="flex gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                        <Link to="/shop">
                            <Button>
                                Shop Now
                            </Button>
                        </Link>
                        <a href="#featured">
                            <Button variant="secondary">
                                View Featured
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section id="featured" className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-4xl text-text mb-4">
                            Featured Products
                        </h2>
                        <p className="text-text-light text-lg">
                            Handpicked favorites from our collection
                        </p>
                    </div>

                    <ProductGrid
                        products={featuredProducts}
                        onQuickView={setSelectedProduct}
                    />

                    <div className="text-center mt-12">
                        <Link to="/shop">
                            <Button variant="outline">
                                View All Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 bg-surface">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="font-heading text-4xl text-text mb-6">
                            About Happy Stitch
                        </h2>
                        <p className="text-text-light text-lg leading-relaxed mb-6">
                            Every piece in our collection is carefully handcrafted with premium quality yarn.
                            We believe in creating items that bring warmth and joy to your home.
                        </p>
                        <p className="text-text-light text-lg leading-relaxed">
                            From cozy blankets to adorable amigurumi, each creation tells a story of
                            craftsmanship and dedication. Thank you for supporting handmade!
                        </p>
                    </div>
                </div>
            </section>

            {/* Product Detail Modal */}
            <ProductDetail
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
};
