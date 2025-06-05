import styled from "@emotion/styled";
import { useState } from "react";

//스타일 컴포넌트//
const Label = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 8px;
  display: inline-block;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid var(--gray-300);
  width: 100%;
  color: var(--gray-900);
  border-radius: 8px;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  margin-top: 8px;
  color: var(--gray-900);
`;

const ToInput = ({
  label = "To.",
  placeholder = "",
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div>
      <Label>{label}</Label>
      <div>
        <Input
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </div>
  );
};

export default ToInput;
