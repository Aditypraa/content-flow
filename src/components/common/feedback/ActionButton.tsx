import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export default function ActionButton({
  children,
  loading = false,
  loadingText = 'Loading...',
  icon,
  iconPosition = 'left',
  disabled,
  variant,
  size,
  className,
  ...props
}: ActionButtonProps) {
  const isDisabled = disabled || loading;

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      );
    }

    if (icon) {
      return iconPosition === 'left' ? (
        <>
          <span className="mr-2 flex h-4 w-4 items-center">{icon}</span>
          {children}
        </>
      ) : (
        <>
          {children}
          <span className="ml-2 flex h-4 w-4 items-center">{icon}</span>
        </>
      );
    }

    return children;
  };

  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      disabled={isDisabled}
      className={`flex items-center ${className || ''}`}
    >
      {renderContent()}
    </Button>
  );
}
