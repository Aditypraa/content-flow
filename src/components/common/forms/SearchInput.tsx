// src/components/common/forms/SearchInput.tsx

'use client';

import React, { useState, useCallback, forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Tetap menggunakan React.InputHTMLAttributes untuk mendapatkan semua props standar dari input
interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      placeholder = 'Search...',
      value: controlledValue,
      defaultValue,
      onChange,
      onSearch,
      onClear,
      className,
      disabled = false,
      showClearButton = true,
      ...props // Sebar sisa props ke komponen Input
    },
    ref,
  ) => {
    // 1. Logika state yang lebih standar untuk komponen terkontrol vs. tidak terkontrol
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue || '',
    );
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    // 2. Menggunakan useCallback untuk stabilitas fungsi dan efisiensi
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        // Selalu panggil onChange jika ada, memungkinkan parent untuk bereaksi
        onChange?.(e);
      },
      [isControlled, onChange],
    );

    const handleClear = useCallback(() => {
      if (!isControlled) {
        setUncontrolledValue('');
      }
      // Memanggil onChange dengan nilai kosong untuk memberi tahu parent
      onChange?.({
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>);
      onClear?.();
    }, [isControlled, onChange, onClear]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearch) {
          e.preventDefault();
          onSearch(value as string);
        }
        if (e.key === 'Escape') {
          handleClear();
        }
        // Memanggil onKeyDown dari props jika ada
        props.onKeyDown?.(e);
      },
      [onSearch, value, handleClear, props.onKeyDown],
    );

    return (
      // 3. Struktur HTML yang disederhanakan dan penggunaan `cn`
      <div className={cn('relative w-full', className)}>
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2" />
        <Input
          ref={ref}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="h-10 pr-10 pl-10" // Padding disesuaikan untuk ikon
          aria-label={placeholder}
          {...props} // Menyebar sisa props
        />
        {showClearButton && value && !disabled && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 p-0"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
