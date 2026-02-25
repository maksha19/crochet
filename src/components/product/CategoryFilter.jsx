import { categories } from '../../data/products';

export const CategoryFilter = ({ activeFilter, onFilterChange }) => {
    return (
        <div className="mb-8">
            {/* Mobile: Dropdown */}
            <div className="md:hidden flex justify-center">
                <select
                    value={activeFilter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="w-full max-w-xs px-4 py-3 rounded-xl border-2 border-primary/30 bg-white text-text font-medium shadow-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                    }}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Desktop: Pill Buttons */}
            <div className="hidden md:flex flex-wrap gap-3 justify-center">
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
        </div>
    );
};
