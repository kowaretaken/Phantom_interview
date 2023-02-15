import React, {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';
import './input.css';
import { Button } from '../Button';

export interface InputProps {
  button?: boolean;
  buttonContent?: any;
  buttonOnClick?: () => void;
}

export interface Props
  extends InputHTMLAttributes<HTMLInputElement>,
    InputProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ button = false, buttonContent, buttonOnClick, ...props }, ref) => {
    const domRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => domRef.current!);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const [width, setWidth] = useState(0);

    useEffect(() => {
      if (button) setWidth(buttonRef.current!.offsetWidth);
    }, []);

    return (
      <>
        <input
          ref={domRef}
          {...props}
          dir="rtl"
          className="input"
          style={{ paddingRight: button ? `${width + 15}px` : '18px' }}
        />
        {button && (
          <Button
            style={{ width: 'fit-content', marginLeft: `-${width + 7}px` }}
            ref={buttonRef}
            onClick={buttonOnClick}
          >
            max
          </Button>
        )}
      </>
    );
  }
);
