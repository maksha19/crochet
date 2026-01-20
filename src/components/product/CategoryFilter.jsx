import { categories } from '../../data/products';

export const CategoryFilter = ({ activeFilter, onFilterChange }) => {
    return (
        <div className="flex flex-wrap gap-3 justify-center mb-8">
            {categories.map(category => (
                <button
                    key={category.id}
                    onClick={() => onFilterChange(category.id)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${activeFilter === category.id
                            ? 'bg-primary text-white shadow-lg'
                            : 'bg-gray-200 text-text hover:bg-gray-300'
                        }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};
