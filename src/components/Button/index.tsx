import {
  ButtonHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import './button.scss';

interface ButtonProps {
  variant?: 'outline' | 'contained' | 'text' | 'info' | 'error';
  size?: 'xsmall' | 'small' | 'medium' | 'default' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  light?: boolean;
  text?: any;
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {}

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = 'contained',
      size = 'default',
      disabled = false,
      light = false,
      fullWidth = false,
      children,
      text = '',
      ...props
    },
    ref
  ) => {
    const domRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => domRef.current!);

    const classNameMap = {
      xsmall: 'btn-xs',
      small: 'btn-sm',
      medium: 'btn-md',
      default: 'btn-df',
      large: 'btn-lg',
      full: 'btn-full',
      outline: 'btn-outline',
      contained: 'btn-contained',
      text: 'btn-text',
      info: 'btn-info',
      error: 'btn-error',
    };

    const classNames = ['btn', classNameMap[size]]
      .concat(!disabled ? classNameMap[variant] : ['disabled'])
      .concat(light ? ['light'] : ['dark'])
      .concat(fullWidth ? classNameMap['full'] : '')
      .join(' ');

    return (
      <button
        ref={domRef}
        {...props}
        className={
          props.className !== undefined
            ? classNames.concat(` ${props.className as string}`)
            : classNames
        }
      >
        {children}
      </button>
    );
  }
);
