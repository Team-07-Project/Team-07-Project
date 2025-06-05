/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef, useState } from "react";

import iconArrowDown from "../../assets/images/iconArrowDown.svg";
import iconArrowTop from "../../assets/images/iconArrowTop.svg";

const DropdownSelect = ({
  selectedOption, // 선택된 항목
  onChange, // 선택시 실행할 함수
  options = [], //[{label:..., value:..., onClick:...},{...}]
  customButton, // 버튼 커스텀?
  dropdownWidth = "140px", //trigger를 사용한 dropdown의 너비, 기본값인 140px은 ShereButton 일 때
}) => {
  const [internalValue, setInternalValue] = useState(
    () => (options?.length > 0 ? options[0] : null) //오류방지
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownSelectRef = useRef();

  const selectedValue = selectedOption ? selectedOption : internalValue;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownSelectRef.current &&
        !dropdownSelectRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }; //메모리 누수 방지
  }, []);

  //value 중복검사 일단 추가는 했는데 아직 이해 못 함..
  useEffect(() => {
    const seen = new Set(); //set 집합
    const duplicates = options.filter((opt) => {
      if (seen.has(opt.value)) return true;
      seen.add(opt.value);
      return false;
    });

    if (duplicates.length > 0) {
      console.warn(
        `[DropdownSelect] ⚠️ Duplicate option.value(s) detected:) value 겹쳐요 고쳐주세요 :(`,
        duplicates.map((d) => d.value)
      );
    }
  }, [options]);

  const handleSelect = (option) => {
    if (selectedValue != null) {
      onChange?.(option);
    } else {
      setInternalValue(option);
      onChange?.(option);
    }
    option.onClick?.(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownSelectRef} css={dropdownSelectWrapper}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {customButton ? (
          customButton
        ) : (
          <button css={selectedTrigger} disabled={false}>
            {selectedValue?.label}
            <img src={isOpen ? iconArrowTop : iconArrowDown} alt="toggle" />
          </button>
        )}
      </div>
      {isOpen && ( //isOpen이 true일 때만 렌더링
        <ul
          css={dropdownStyle({ trigger: customButton, width: dropdownWidth })}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              css={dropdownOption}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSelect;

/** <-----Style-----> */

const dropdownSelectWrapper = css`
  position: relative;
  display: inline-block;
`;

const selectedTrigger = css`
  width: 320px;
  height: 50px;
  padding: 12px 16px;
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-regular);
  color: var(--gray-500);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    border: 1px solid var(--gray-500);
    color: var(--gray-900);
  }

  &:focus,
  :active {
    border: 2px solid var(--gray-500);
    color: var(--gray-900);
  }

  &:disabled,
  :disabled:hover,
  :disabled:focus,
  :disabled:active {
    border: 1px solid var(--gray-300);
    background-color: var(--gray-100);
    color: var(--gray-400);
    cursor: default;
  }
`;

const dropdownStyle = ({ trigger, width }) => css`
  position: absolute;
  right: 0;
  width: ${trigger ? width : "100%"};
  background-color: var(--white);
  margin-top: 4px;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  z-index: 10;
  padding: 4px 0;
`;

const dropdownOption = css`
  padding: 12px 16px;
  font-size: var(--font-size-16);
  font-weight: var(--font-weight-regular);

  &:hover {
    background-color: var(--gray-100);
  }
`;
