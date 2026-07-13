'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#1A202C] mb-1.5">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-[100px] w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A365D]/20 focus-visible:border-[#1A365D] disabled:cursor-not-allowed disabled:opacity-50 resize-y',
            error && 'border-red-500 focus-visible:ring-red-500/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
