export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95';

    const variants = {
        primary: 'bg-primary hover:bg-primary-dark text-white',
        secondary: 'bg-accent hover:bg-accent-light text-text',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
        danger: 'bg-error hover:bg-error/90 text-white'
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
