import { css } from "@emotion/react";
import ReactionBadges from "../Dropdown/ReactionBadges";
import EmojiPopover from "../Dropdown/EmojiPopover";
import { useState } from "react";

const ReactionBox = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div css={rectionBoxStyle}>
      <ReactionBadges refreshTrigger={refreshTrigger} />
      <EmojiPopover setRefreshTrigger={setRefreshTrigger} />
    </div>
  );
};

export default ReactionBox;

const rectionBoxStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;
