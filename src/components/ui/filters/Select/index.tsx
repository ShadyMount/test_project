import { FC, MouseEventHandler, useRef, useState } from 'react';

// import 'simplebar/dist/simplebar.min.css';
import cn from 'classnames/bind';

import Arrow from '../Arrow';
import './SimpleBar.scss';
import styles from './Select.module.scss';
import useOutsideClick from '../hooks/useOutSideHook';
import SimpleBar from 'simplebar-react';
import Cross from '../Cross';

const cx = cn.bind(styles);

type TOption = {
  id: number;
  name: string;
};

export interface ISelect {
  /**
   * Specify an optional className to be applied to the select box
   */
  className?: string;
  /**
   * Specify whether the control is disabled
   */
  disabled: boolean;
  /**
   * Provide the contents of your Select
   */
  options: TOption[];
  /**
   * Current theme
   */
  isDarkTheme: boolean;
  /**
   * The value of the `<select>`
   */
  value?: string;
  placeHolder: string;
onCrossClicked: MouseEventHandler<HTMLDivElement>;
  /**
   * The callback function that is called each time the value of
   * the underlying `<input>` changes
   */
  onChange: (name: TOption) => void;
}

const Select: FC<ISelect> = ({
  className,
  disabled = false,
  options,
  isDarkTheme = false,
  value,
  placeHolder,
  onCrossClicked,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  useOutsideClick(ref, toggleOpen);

  return (
    <div
      ref={isOpen ? ref : null}
      className={cx(className, 'Select', {
        'Select--open': isOpen,
        'Select--dark': isDarkTheme
      })}
      onClick={!disabled ? toggleOpen : () => {}}
      aria-hidden="true">
      <span className={cx('Select__title')}>{value ? value : placeHolder}</span>
      <Cross isSelected={value && value !=='Author' ? true : false} onClick={onCrossClicked} className={cx('Select__cross')} isDarkTheme={isDarkTheme}/>
      <Arrow isOpen={isOpen} className={cx('Select__arrow')} isDarkTheme={isDarkTheme} />
      {isOpen && options && (
        
        <ul
          className={cx('Select__optionContainer', {
            'Select__optionContainer--open': isOpen,
            'Select__optionContainer--dark': isDarkTheme
          })}>
            <div className={cx('Select__optionContainer__stick')}></div>
            
          <SimpleBar style={{ maxHeight: 'inherit' }}>
            
            {options.map((option) => (
              <li
                onClick={() => onChange(option)}
                className={cx('Select__option', {
                  'Select__option--dark': isDarkTheme
                })}
                key={option.id}
                aria-hidden="true">
                <p className={cx('Select__optionName')}>{option.name}</p>
              </li>
            ))}
          </SimpleBar>
        </ul>
      )}
    </div>
  );
};

export default Select;