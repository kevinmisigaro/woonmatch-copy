import { faCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

export const Chevron = ({
  opened,
}: {
  opened: boolean;
  className?: string;
}) => {
  return (
    <img
      style={{
        transform: opened ? `rotateX(180deg)` : `rotateX(0deg)`,
      }}
      className={` w-[14px] 3xl:w-[18px] h-auto duration-500`}
      src="/images/chevron-down.svg"
    />
  );
};

interface Option {
  key: string;
  value: unknown;
  checked?: boolean;
}
export const CheckBoxes = ({
  options,
  onItemSelect,
}: {
  options: Option[];
  onItemSelect: (options: Option[]) => void;
}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(options);
  }, [options]);

  const handleItemToggle = (value: boolean, index: number) => {
    setItems((previousItems) => {
      if (previousItems) {
        const _prevCopy = [...previousItems];
        _prevCopy[index] = { ..._prevCopy[index], checked: value };
        onItemSelect(_prevCopy);
        return _prevCopy;
      } else {
        return previousItems;
      }
    });
  };

  return (
    <div className="w-full">
      {items?.map((item, index) => (
        <CheckBox
          key={index}
          label={item.key}
          isChecked={item.checked}
          onChange={(v) => {
            handleItemToggle(v, index);
          }}
        />
      ))}
    </div>
  );
};

export const CheckBox = ({
  isChecked = false,
  label,
  onChange,
}: {
  isChecked?: boolean;
  label: string;
  onChange: (value: boolean) => void;
}) => {
  const [_isChecked, setIsChecked] = useState(isChecked);

  useEffect(() => {
    onChange(_isChecked);
  }, [_isChecked]);

  const handleClickStateChange = () => {
    setIsChecked(!_isChecked);
  };

  return (
    <div
      className="flex items-center px-4 cursor-pointer py-4"
      onClick={handleClickStateChange}>
      <div
        className={`w-[19px] h-[19px] grid place-content-center border border-apple mr-2 ${
          _isChecked ? "bg-apple text-limeade" : "bg-transparent"
        } `}>
        {_isChecked && (
          <FontAwesomeIcon icon={faCheck} className="text-xs text-white" />
        )}
      </div>
      <div className={`${_isChecked ? "text-limeade" : ""}`}>{label}</div>
    </div>
  );
};

export const Options = ({
  options,
  onSelect,
}: {
  options: Option[];
  onSelect: (value: Option) => void;
}) => {
  const [, setItem] = useState<Option | undefined>();
  return (
    <div className="w-full">
      {options?.map((option, index) => (
        <button
          key={`option-${index}-${option.key}-${option.value}`}
          className="form-check block py-3 px-4 cursor-pointer w-full text-left hover:bg-white truncate"
          onClick={() => {
            setItem(option);
            onSelect(option);
          }}>
          {option.key}
        </button>
      ))}
    </div>
  );
};

interface Props {
  darkTheme: boolean;
  title: string;
  options?: Option[];
  multiple: boolean;
  className?: string;
  maxHeight?: number;
  wraperClassNames?: string;
  value?: string | number | string[] | number[];
  onSelect?: (options: Option[] | Option) => void;
}
const DropDownButton: React.FC<any> = ({
  darkTheme = false,
  title,
  options,
  multiple = false,
  className,
  wraperClassNames = null,
  maxHeight = null,
  value,
  onSelect,
}: Props) => {
  const [opened, setOpened] = useState(false);
  const [mouseIsIn, setMouseIsIn] = useState(false);
  const [_options, setOptions] = useState<Option[]>();
  const [selected, setSelected] = useState<Option>();

  useEffect(() => {
    setOptions(options);

    if (!multiple) {
      let _selected = options.filter((option) => option.checked);
      setSelected(_selected.length == 1 ? _selected[0] : null);
      if (onSelect && _selected.length == 1) {
        // onSelect(_selected[0]);
      }
    }
  }, [options]);

  const handleOutsideClicks = (e) => {
    let _mouseIsIn = null;

    setMouseIsIn((currentState) => {
      _mouseIsIn = currentState;
      return currentState;
    });

    if (multiple) {
      if (!_mouseIsIn) {
        setOpened(false);
      }
    } else {
      setOpened(false);
    }
  };

  useEffect(() => {
    if (opened) document.addEventListener("click", handleOutsideClicks);

    return () => {
      document.removeEventListener("click", handleOutsideClicks);
    };
  }, [opened]);

  return (
    <div
      className={`relative w-full bg-gray justify-center ${wraperClassNames}`}>
      <button
        onClick={() => setOpened(!opened)}
        className={`drop-down-btn rounded ${className} ${
          darkTheme ? "bg-gray-100" : ""
        }`}>
        {selected ? selected.key : title}
        <Chevron opened={opened} />
      </button>

      <div
        onMouseEnter={() => {
          setMouseIsIn(true);
        }}
        onMouseLeave={() => {
          setMouseIsIn(false);
        }}
        style={{ height: opened ? "unset" : 0 }}
        className={`-mt-1 z-10 min-w-max w-full text-gray-500 ${
          maxHeight ? maxHeight : ""
        } overflow-y-auto overscroll-contain flex ${
          darkTheme ? "bg-gray-100" : "bg-white"
        }  rounded-b overflow-hidden`}>
        {multiple === true && (
          <CheckBoxes
            onItemSelect={(options) => {
              if (onSelect) {
                onSelect(options);
              }
            }}
            options={_options}
          />
        )}
        {multiple === false && (
          <Options
            onSelect={(option) => {
              if (onSelect) {
                onSelect(option);
              }
              setSelected(option);
              setOpened(false);
            }}
            options={_options}
          />
        )}
      </div>
    </div>
  );
};

export default DropDownButton;
