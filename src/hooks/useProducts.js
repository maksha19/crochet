import { useState, useMemo } from 'react';
import { products } from '../data/products';

export const useProducts = () => {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = filter === 'all' || product.category === filter;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [filter, searchQuery]);

    const featuredProducts = useMemo(() => {
        return products.filter(product => product.featured);
    }, []);

    return {
        allProducts: products,
        filteredProducts,
        featuredProducts,
        filter,
        setFilter,
        searchQuery,
        setSearchQuery
    };
};
