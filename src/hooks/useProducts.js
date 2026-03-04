import { useState, useMemo } from 'react';
import { products, productOrder } from '../data/products';

export const useProducts = () => {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
            const indexA = productOrder.indexOf(a.id);
            const indexB = productOrder.indexOf(b.id);
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });
    }, []);

    const filteredProducts = useMemo(() => {
        return sortedProducts.filter(product => {
            const matchesCategory = filter === 'all' || product.category === filter;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [filter, searchQuery, sortedProducts]);

    const featuredProducts = useMemo(() => {
        return sortedProducts.filter(product => product.featured);
    }, [sortedProducts]);

    return {
        allProducts: sortedProducts,
        filteredProducts,
        featuredProducts,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery
    };
};
