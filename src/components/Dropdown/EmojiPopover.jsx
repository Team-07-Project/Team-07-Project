import { css } from "@emotion/react";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import AddEmojiButton from "../Button/AddEmojiButton";
import useDropdown from "./useDropdown";

const EmojiPopover = () => {
  const { dropdownSelectRef, isOpen, setIsOpen } = useDropdown({}); //굳이 커스텀 훅을 쓸 필요는 없지만 연습겸 써봄

  return (
    <div ref={dropdownSelectRef} css={popoverContainerStyle}>
      <AddEmojiButton onClick={() => setIsOpen((prev) => !prev)}>
        추가
      </AddEmojiButton>

      {isOpen && (
        <div css={popoverStyle}>
          <Picker
            data={data}
            onEmojiSelect={(emoji) => {
              console.log(emoji);
              setIsOpen(false);
            }}
            theme="light"
            previewPosition="none"
            searchPosition="none"
            locale="ko"
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPopover;

const popoverContainerStyle = css`
  position: relative;
  display: inline-block;
`;

const popoverStyle = css`
  position: absolute;
  margin-top: 8px;
  z-index: 100;
  right: 0;
`;
