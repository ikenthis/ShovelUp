// components/ui/LoadingSpinner.tsx
'use client';

import { cn } from '@/utils/cn';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'amber' | 'white' | 'construction';
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner = ({ 
  size = 'md',
  variant = 'default',
  className,
  text,
  fullScreen = false
}: LoadingSpinnerProps) => {
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const variants = {
    default: 'border-gray-300 border-t-gray-900',
    amber: 'border-amber-200 border-t-amber-400',
    white: 'border-white/30 border-t-white',
    construction: 'border-amber-300 border-t-amber-600'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const spinner = (
    <div className={cn(
      "animate-spin rounded-full border-2",
      sizes[size],
      variants[variant],
      className
    )} />
  );

  const content = (
    <div className="flex flex-col items-center space-y-3">
      {spinner}
      {text && (
        <p className={cn(
          "text-gray-600 font-medium",
          textSizes[size]
        )}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 shadow-2xl">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

// Skeleton loaders for different components
export const SkeletonLoader = ({ 
  className,
  variant = 'default' 
}: { 
  className?: string; 
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button';
}) => {
  const variants = {
    default: 'h-4 bg-gray-300 rounded',
    card: 'h-48 bg-gray-300 rounded-xl',
    text: 'h-4 bg-gray-300 rounded',
    avatar: 'w-12 h-12 bg-gray-300 rounded-full',
    button: 'h-10 bg-gray-300 rounded-lg'
  };

  return (
    <div className={cn(
      "animate-pulse",
      variants[variant],
      className
    )} />
  );
};

// Construction-themed spinner
export const ConstructionSpinner = ({ 
  size = 'md',
  className 
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={cn("relative", sizes[size], className)}>
      {/* Hard hat */}
      <div className="absolute inset-0 animate-spin">
        <div className="w-full h-full bg-amber-400 rounded-full relative">
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-amber-600 rounded-full" />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-amber-600 rounded-b-full" />
        </div>
      </div>
      
      {/* Construction tools rotating around */}
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-slate-600 rounded-full" />
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-slate-600 rounded-full" />
        <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-1 h-1 bg-slate-600 rounded-full" />
        <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-1 h-1 bg-slate-600 rounded-full" />
      </div>
    </div>
  );
};

// Pulsing dots loader
export const PulsingDots = ({ 
  className,
  dotCount = 3 
}: { 
  className?: string; 
  dotCount?: number;
}) => (
  <div className={cn("flex space-x-1", className)}>
    {Array.from({ length: dotCount }).map((_, i) => (
      <div
        key={i}
        className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"
        style={{ 
          animationDelay: `${i * 200}ms`,
          animationDuration: '1s'
        }}
      />
    ))}
  </div>
);

// Progress bar loader
interface ProgressLoaderProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'construction';
}

export const ProgressLoader = ({ 
  progress,
  className,
  showPercentage = true,
  variant = 'default'
}: ProgressLoaderProps) => {
  const variants = {
    default: {
      bg: 'bg-gray-200',
      fill: 'bg-amber-400'
    },
    construction: {
      bg: 'bg-slate-800',
      fill: 'bg-gradient-to-r from-amber-400 to-amber-600'
    }
  };

  const currentVariant = variants[variant];

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full h-3 rounded-full overflow-hidden", currentVariant.bg)}>
        <div 
          className={cn(
            "h-full transition-all duration-500 ease-out rounded-full",
            currentVariant.fill
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showPercentage && (
        <p className="text-sm text-gray-600 text-center mt-2">
          {Math.round(progress)}%
        </p>
      )}
    </div>
  );
};

// Bouncing balls loader
export const BouncingBalls = ({ className }: { className?: string }) => (
  <div className={cn("flex space-x-1", className)}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-3 h-3 bg-amber-400 rounded-full animate-bounce"
        style={{ 
          animationDelay: `${i * 0.1}s`,
          animationDuration: '0.6s'
        }}
      />
    ))}
  </div>
);

// Spinning bars loader
export const SpinningBars = ({ 
  className,
  size = 'md' 
}: { 
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={cn("animate-spin", sizes[size], className)}>
      <div className="grid grid-cols-2 gap-0.5 w-full h-full">
        <div className="bg-amber-400 rounded-sm"></div>
        <div className="bg-amber-300 rounded-sm"></div>
        <div className="bg-amber-300 rounded-sm"></div>
        <div className="bg-amber-200 rounded-sm"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;