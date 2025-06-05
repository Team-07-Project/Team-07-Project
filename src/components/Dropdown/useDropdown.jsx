import { useState, useEffect, useRef } from "react";

const useDropdown = ({
  options, //개별 onChange가 있을경우...이지만 그냥 통일해도 괜찮습니다. 저도 헷갈리거든요 근데 어차피 컴포넌트에도 줘야해요..
  selectedOption, //상태 변수
  onChange, //상태 변화함수
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(
    () => (options?.length > 0 ? options[0] : null) //오류방지
  );
  const dropdownSelectRef = useRef();

  const selectedValue = selectedOption ?? internalValue;

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

  return {
    dropdownSelectRef,
    isOpen,
    setIsOpen,
    selectedValue,
    handleSelect,
  };
};

export default useDropdown;
