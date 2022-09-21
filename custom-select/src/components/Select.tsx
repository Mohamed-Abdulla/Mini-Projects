import { useEffect, useRef, useState } from "react";
import styles from "../select.module.css";

export type SelectOption = {
  label: string;
  value: string | number;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

//all thé values here have options properties and it has either singleselect or multiple select props.
//if multiple is true ,it uses multiple select props or single select props
type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [HighlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearOptions = () => {
    //when we clear wé change multiple to empty array
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    //only changé if wé dont select selected option
    if (multiple) {
      //if we already select one,and try to selct it again, unselect it
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        //if we add new one to value array,add it to array value,
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };

  useEffect(() => {
    //this useEffect is for if we open the option, it alwayš hover from the first option.\
    //everytime wé open it,we reset our highlightIndex to 0
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      //if we click other key ,return
      if (e.target != containerRef.current) return;
      switch (e.code) {
        //key functionalities
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          //select what is highlighted,when wé close
          if (isOpen) selectOption(options[HighlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          //if options are opened, mové highlighted index
          const newValue = HighlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    //cleanup fn

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, HighlightedIndex]);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? value.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();

                  selectOption(v);
                }}
                className={styles["option-badge"]}
              >
                {v?.label}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation(); //it stops the click event of parent element
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation(); //it stops the click event of parent element
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ""} 
            ${index === HighlightedIndex ? styles.highlighted : ""}`}
            key={option.value}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
