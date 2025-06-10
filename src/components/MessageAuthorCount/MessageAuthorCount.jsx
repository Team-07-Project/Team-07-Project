import { css } from "@emotion/react";
import AvatarList from "../Avatar/AvatarList";
import { extractUniqueSenders } from "../../utils/extractUniqueSenders";

const MessageAuthorCount = ({ messages = [], customStyle }) => {
  const items = extractUniqueSenders(messages);

  if (!items || items.length === 0) return null;

  return (
    <div css={[MessageAuthorCountStyle, customStyle]}>
      <AvatarList items={items} />
      <span>
        <b>{items.length}</b>명이 작성했어요!
      </span>
    </div>
  );
};

export default MessageAuthorCount;

const MessageAuthorCountStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;
