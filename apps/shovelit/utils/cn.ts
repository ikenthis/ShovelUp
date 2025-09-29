// utils/cn.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 * @param inputs - Class values to combine
 * @returns Merged class string with Tailwind conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Conditionally applies classes based on variants
 * @param base - Base classes always applied
 * @param variants - Object with variant conditions and classes
 * @param className - Additional classes to merge
 */
export function cva(
  base: ClassValue,
  variants: Record<string, Record<string, ClassValue>>,
  className?: ClassValue
) {
  return (props: Record<string, any>) => {
    const variantClasses = Object.keys(variants).reduce((acc, key) => {
      const variant = props[key];
      if (variant && variants[key][variant]) {
        acc.push(variants[key][variant]);
      }
      return acc;
    }, [] as ClassValue[]);

    return cn(base, ...variantClasses, className, props.className);
  };
}

/**
 * Creates a style variant function for consistent component styling
 * @param config - Configuration object with base, variants, and defaults
 */
export function createVariants<
  T extends Record<string, Record<string, ClassValue>>,
>(config: {
  base?: ClassValue;
  variants?: T;
  compoundVariants?: Array<{
    conditions: Partial<{ [K in keyof T]: keyof T[K] }>;
    className: ClassValue;
  }>;
  defaultVariants?: Partial<{ [K in keyof T]: keyof T[K] }>;
}) {
  return (
    props: Partial<{ [K in keyof T]: keyof T[K] }> & { className?: ClassValue }
  ) => {
    const {
      base,
      variants = {},
      compoundVariants = [],
      defaultVariants = {},
    } = config;

    // Merge props with defaults
    const mergedProps = { ...defaultVariants, ...props };

    // Get variant classes
    const variantClasses = Object.entries(variants).map(([key, variantObj]) => {
      const variantObjTyped = variantObj as Record<string, ClassValue>;
      const value = mergedProps[key as keyof typeof mergedProps];
      return value ? variantObjTyped[value as string] : undefined;
    });

    // Get compound variant classes
    const compoundClasses = compoundVariants
      .filter(({ conditions }) =>
        Object.entries(conditions).every(
          ([key, value]) =>
            mergedProps[key as keyof typeof mergedProps] === value
        )
      )
      .map(({ className }) => className);

    return cn(base, ...variantClasses, ...compoundClasses, props.className);
  };
}

/**
 * Utility for handling conditional classes with better readability
 */
export function conditionalClass(
  condition: boolean | undefined | null,
  trueClass: ClassValue,
  falseClass?: ClassValue
) {
  return condition ? trueClass : falseClass;
}

/**
 * Utility for focus ring classes
 */
export function focusRing(
  variant: "default" | "error" | "success" = "default"
) {
  const variants = {
    default:
      "focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900",
    error:
      "focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-900",
    success:
      "focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900",
  };

  return variants[variant];
}

/**
 * Utility for consistent hover transitions
 */
export function hoverTransition(classes?: ClassValue) {
  return cn("transition-all duration-200 ease-in-out", classes);
}

/**
 * Utility for responsive text sizes
 */
export function responsiveText(
  mobile: string,
  tablet?: string,
  desktop?: string,
  xl?: string
) {
  return cn(
    mobile,
    tablet && `md:${tablet}`,
    desktop && `lg:${desktop}`,
    xl && `xl:${xl}`
  );
}

/**
 * Utility for consistent shadow classes
 */
export function shadowVariant(
  variant: "sm" | "md" | "lg" | "xl" | "glow" = "md"
) {
  const variants = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    glow: "shadow-2xl shadow-amber-400/20",
  };

  return variants[variant];
}

/**
 * Utility for animation classes with reduced motion support
 */
export function animation(animationClass: ClassValue) {
  return cn(
    animationClass,
    "motion-reduce:animate-none motion-reduce:transition-none"
  );
}

/**
 * Utility for consistent spacing
 */
export function spacing(
  type: "padding" | "margin",
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
) {
  const prefix = type === "padding" ? "p" : "m";
  const sizes = {
    xs: "2",
    sm: "4",
    md: "6",
    lg: "8",
    xl: "12",
    "2xl": "16",
  };

  return `${prefix}-${sizes[size]}`;
}

/**
 * Utility for consistent border radius
 */
export function radius(size: "sm" | "md" | "lg" | "xl" | "full" = "md") {
  const sizes = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  return sizes[size];
}

/**
 * Utility for construction-themed classes
 */
export function constructionTheme(
  variant: "warning" | "caution" | "success" | "info"
) {
  const variants = {
    warning: "bg-amber-400 text-black border-l-4 border-amber-600",
    caution: "bg-red-500 text-white border-l-4 border-red-700",
    success: "bg-green-500 text-white border-l-4 border-green-700",
    info: "bg-blue-500 text-white border-l-4 border-blue-700",
  };

  return variants[variant];
}

/**
 * Debug utility to visualize element boundaries (development only)
 */
export function debugBounds(
  enabled: boolean = process.env.NODE_ENV === "development"
) {
  return enabled ? "ring-1 ring-red-500 ring-opacity-50" : "";
}

/**
 * Utility for glass morphism effect
 */
export function glassMorphism(
  intensity: "light" | "medium" | "heavy" = "medium"
) {
  const variants = {
    light: "backdrop-blur-sm bg-slate-900/20 border border-white/10",
    medium: "backdrop-blur-md bg-slate-900/40 border border-white/20",
    heavy: "backdrop-blur-lg bg-slate-900/60 border border-white/30",
  };

  return variants[intensity];
}

/**
 * Utility for consistent button base styles
 */
export function buttonBase() {
  return cn(
    "inline-flex items-center justify-center",
    "font-medium transition-all duration-200",
    "focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
    focusRing()
  );
}

/**
 * Type helpers for better TypeScript experience
 */
export type VariantProps<T extends (...args: any) => any> = Parameters<T>[0];

export type ClassVariants<T> = {
  [K in keyof T]: keyof T[K];
};

// Export common class combinations
export const commonClasses = {
  // Card styles
  card: "bg-slate-800/60 border border-amber-400/20 rounded-xl p-6",
  cardHover:
    "hover:border-amber-400/40 hover:shadow-lg transition-all duration-300",

  // Text styles
  heading: "font-light text-white font-system",
  subheading: "text-gray-300",

  // Layout
  container: "container mx-auto px-4",
  section: "py-16 lg:py-20",

  // Interactive
  clickable: "cursor-pointer select-none",
  disabled: "opacity-50 cursor-not-allowed pointer-events-none",
} as const;
