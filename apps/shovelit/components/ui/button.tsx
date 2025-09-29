import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  ...props 
}, ref) => {
  const baseStyles = [
    'font-semibold',
    'rounded-xl',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'transform',
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'active:scale-95',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:transform-none',
  ];
  
  const variants = {
    primary: [
      'bg-amber-400',
      'text-black',
      'hover:bg-amber-500',
      'focus:ring-amber-500',
      'shadow-lg',
      'hover:shadow-xl',
      'hover:scale-105'
    ],
    secondary: [
      'bg-slate-800',
      'text-amber-400',
      'hover:bg-slate-700',
      'focus:ring-slate-500',
      'shadow-lg',
      'hover:shadow-xl',
      'hover:scale-105',
      'border',
      'border-slate-700'
    ],
    outline: [
      'border-2',
      'border-amber-400',
      'text-amber-400',
      'bg-transparent',
      'hover:bg-amber-400',
      'hover:text-black',
      'focus:ring-amber-500'
    ],
    ghost: [
      'text-amber-400',
      'bg-transparent',
      'hover:bg-amber-400/10',
      'hover:text-amber-300',
      'focus:ring-amber-500'
    ],
    destructive: [
      'bg-red-600',
      'text-white',
      'hover:bg-red-700',
      'focus:ring-red-500',
      'shadow-lg',
      'hover:shadow-xl'
    ]
  };
  
  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        isDisabled && 'hover:scale-100',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && <LoadingSpinner size={size} />}
      {!loading && leftIcon && (
        <span className="flex-shrink-0">{leftIcon}</span>
      )}
      
      <span className={clsx(loading && 'opacity-0')}>
        {children}
      </span>
      
      {!loading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

// Loading Spinner Component
const LoadingSpinner = ({ size }: { size: ButtonProps['size'] }) => {
  const spinnerSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        spinnerSizes[size || 'md']
      )}
      role="status"
      aria-label="Loading"
    />
  );
};

// Button Group Component for multiple buttons
interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
}

export const ButtonGroup = ({ 
  children, 
  className,
  orientation = 'horizontal',
  spacing = 'md'
}: ButtonGroupProps) => {
  const spacings = {
    sm: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
    md: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4',
    lg: orientation === 'horizontal' ? 'space-x-6' : 'space-y-6'
  };

  return (
    <div className={clsx(
      'flex',
      orientation === 'horizontal' ? 'flex-row' : 'flex-col',
      spacings[spacing],
      className
    )}>
      {children}
    </div>
  );
};

// Icon Button Component
interface IconButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'children'> {
  icon: ReactNode;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ 
  icon,
  size = 'md',
  variant = 'ghost',
  className,
  ...props 
}, ref) => {
  const iconSizes = {
    xs: 'w-8 h-8',
    sm: 'w-9 h-9',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14'
  };

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={clsx(
        'rounded-full p-0',
        iconSizes[size],
        className
      )}
      {...props}
    >
      {icon}
    </Button>
  );
});

IconButton.displayName = 'IconButton';

export default Button;