import { css } from "@emotion/react";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import AddEmojiButton from "../Button/AddEmojiButton";
import useDropdown from "./useDropdown";
import ReactionsApi from "../../api/ReactionApi";
import { useParams } from "react-router-dom";

const EmojiPopover = ({ setRefreshTrigger }) => {
  const { dropdownSelectRef, isOpen, setIsOpen } = useDropdown({}); //굳이 커스텀 훅을 쓸 필요는 없지만 연습겸 써봄
  const { id } = useParams();

  const handleEmojiSelect = async (emoji) => {
    try {
      const selectedEmoji = emoji.native;
      await ReactionsApi.post({
        id,
        emoji: selectedEmoji,
        type: "increase",
      });
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.log("이모지 post 실패!", error);
    } finally {
      console.log(" id:", id);
      console.log(" emoji:", emoji.native);

      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownSelectRef} css={popoverContainerStyle}>
      <AddEmojiButton onClick={() => setIsOpen((prev) => !prev)}>
        추가
      </AddEmojiButton>

      {isOpen && (
        <div css={popoverStyle}>
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
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
