'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-[#1A365D] to-[#2D5A8E] text-white hover:from-[#152C4D] hover:to-[#234A76] shadow-lg hover:shadow-xl',
        gold: 'bg-gradient-to-r from-[#D69E2E] to-[#E8B84B] text-white hover:from-[#C08B1E] hover:to-[#D6A63B] shadow-lg hover:shadow-xl',
        outline: 'border-2 border-[#1A365D] text-[#1A365D] hover:bg-[#1A365D] hover:text-white',
        ghost: 'text-[#1A365D] hover:bg-[#1A365D]/10',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-emerald-600 text-white hover:bg-emerald-700',
      },
      size: {
        default: 'px-6 py-3 text-base',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    if (asChild && children && typeof children === 'object' && 'props' in children) {
      const child = children as React.ReactElement
      return (
        <child.type
          {...child.props}
          className={cn(buttonVariants({ variant, size, className }), (child.props as Record<string, string>).className)}
          ref={ref}
        />
      )
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
