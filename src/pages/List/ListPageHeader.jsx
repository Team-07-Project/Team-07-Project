import { css } from "@emotion/react";
import { GlobalHeaderStyle } from "../../components/Header/GlobalHeader";
import { IconShare24Button } from "../../components/Button/IconButtons";
import AddEmojiButton from "../../components/Button/AddEmojiButton";
import MessageCount from "../../components/MessageCount/MessageCount";

// MessageCount 컴포넌트용 mockData
import avatarSampleImg1 from "../../assets/images/img-avatar-sample.jpg";
import avatarSampleImg2 from "../../assets/images/img-avatar-default.png";
const mockAvatarData = [
  { id: "avatar1", profileImageURL: avatarSampleImg1 },
  { id: "avatar2", profileImageURL: avatarSampleImg2 },
  { id: "avatar3", profileImageURL: avatarSampleImg1 },
  { id: "avatar4", profileImageURL: avatarSampleImg2 },
  { id: "avatar5", profileImageURL: avatarSampleImg2 },
];

// ListPageHeader.jsx
const ListPageHeader = ({ recipient }) => {
  const showAddReactionPopover = () => {
    console.log("popover open");
  };

  const shareRollingPaper = () => {
    alert("ok");
  };

  return (
    <div css={ListPageHeaderStyle}>
      <div className="header-container">
        <h2 className="recipient-name">To. {recipient}</h2>
        <ul className="recipient-panel">
          <li className="sender-counts-area">
            <MessageCount items={mockAvatarData} />
          </li>
          <li className="reaction-area">
            {/* Badges 컴포넌트 생성 이후 추가 예정 */}
            {/* <ReactionBadges /> */}
            <AddEmojiButton size="sm" onClick={showAddReactionPopover}>
              추가
            </AddEmojiButton>
          </li>
          <li className="share-area">
            <IconShare24Button onClick={shareRollingPaper} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ListPageHeader;

const ListPageHeaderStyle = css`
  ${GlobalHeaderStyle};

  .recipient-name {
    margin-right: auto;
  }

  .recipient-panel {
    display: flex;
    align-items: center;
    gap: 14px;

    > li {
      position: relative;

      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 1px;
        height: 28px;
        background-color: var(--gray-200);
      }

      &:first-of-type:before {
        display: none;
      }
    }

    > li + li {
      padding-left: 14px;
    }
  }
`;
