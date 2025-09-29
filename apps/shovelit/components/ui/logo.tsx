import { clsx } from 'clsx';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light' | 'dark';
  showText?: boolean;
  href?: string;
  onClick?: () => void;
}

export const Logo = ({ 
  className,
  size = 'md',
  variant = 'default',
  showText = true,
  href,
  onClick
}: LogoProps) => {
  const sizes = {
    sm: {
      container: 'space-x-2',
      icon: 'w-8 h-8',
      text: 'text-lg',
      iconText: 'text-sm'
    },
    md: {
      container: 'space-x-3',
      icon: 'w-10 h-10',
      text: 'text-2xl',
      iconText: 'text-xl'
    },
    lg: {
      container: 'space-x-4',
      icon: 'w-12 h-12',
      text: 'text-3xl',
      iconText: 'text-2xl'
    }
  };

  const variants = {
    default: {
      iconBg: 'bg-amber-400',
      iconText: 'text-black',
      mainText: 'text-white',
      accentText: 'text-amber-400'
    },
    light: {
      iconBg: 'bg-amber-400',
      iconText: 'text-black',
      mainText: 'text-gray-900',
      accentText: 'text-amber-600'
    },
    dark: {
      iconBg: 'bg-amber-500',
      iconText: 'text-black',
      mainText: 'text-white',
      accentText: 'text-amber-300'
    }
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  const logoContent = (
    <div className={clsx(
      "flex items-center",
      currentSize.container,
      onClick && "cursor-pointer",
      className
    )}>
      <div className={clsx(
        currentSize.icon,
        currentVariant.iconBg,
        "rounded flex items-center justify-center"
      )}>
        <span className={clsx(
          currentVariant.iconText,
          currentSize.iconText,
          "font-black tracking-wider font-system"
        )}>
          S
        </span>
      </div>
      
      {showText && (
        <span className={clsx(
          currentVariant.mainText,
          currentSize.text,
          "font-light font-system"
        )}>
          Shovel
          <span className={clsx(
            currentVariant.accentText,
            "font-medium"
          )}>
            Up!
          </span>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <a 
        href={href}
        className="inline-block transition-opacity hover:opacity-80"
        onClick={onClick}
      >
        {logoContent}
      </a>
    );
  }

  if (onClick) {
    return (
      <button 
        onClick={onClick}
        className="inline-block transition-opacity hover:opacity-80"
      >
        {logoContent}
      </button>
    );
  }

  return logoContent;
};

export default Logo;