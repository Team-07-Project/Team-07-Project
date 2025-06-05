import { css } from "@emotion/react";
import { GlobalHeaderStyle } from "../../components/Header/GlobalHeader";
import { IconShareButton } from "../../components/Button/IconButtons";
import { BREAKPOINTS } from "../../constants/constants";
import AddEmojiButton from "../../components/Button/AddEmojiButton";
import MessageAuthorCount from "../../components/MessageAuthorCount";
import DropdownSelect from "../../components/Dropdown/Dropdown";
import { SHARE_DROPDOWN_ITEMS } from "../../constants/constants";
import ReactionBadges from "../../components/Dropdown/ReactionBadges";
import useToast from "./../../components/Toast/useToast";

// MessageAuthors 컴포넌트용 mockData
import avatarSampleImg1 from "../../assets/images/img-avatar-sample.jpg";
import avatarSampleImg2 from "../../assets/images/img-avatar-default.png";

const mockAvatarData = [
  { id: "avatar1", profileImageURL: avatarSampleImg1 },
  { id: "avatar2", profileImageURL: avatarSampleImg2 },
  { id: "avatar3", profileImageURL: avatarSampleImg1 },
  { id: "avatar4", profileImageURL: avatarSampleImg2 },
  { id: "avatar5", profileImageURL: avatarSampleImg2 },
];

const ListPageHeader = ({ recipient }) => {
  const { showToast } = useToast();

  const showAddReactionPopover = () => {
    console.log("popover open");
  };

  const changeShareOption = (option) => {
    if (!option) return;

    if (option.label === "URL 복사") {
      const currentUrl = location.href;

      // 클립보드에 URL 복사 - 실패
      if (!navigator.clipboard) {
        showToast({ message: "클립보드 복사를 지원하지 않는 브라우저입니다." });
        return;
      }

      // 클립보드에 URL 복사 - 성공
      navigator.clipboard.writeText(currentUrl);
      showToast({ message: option.value });
    }

    if (option.label === "카카오톡 공유") {
      console.log("카카오톡 공유하기...");
    }
  };

  return (
    <div css={ListPageHeaderStyle}>
      <div className="header-container">
        <h2 className="recipient-name">To. {recipient}</h2>
        <ul className="recipient-panel">
          <li className="li-message-author-count">
            <MessageAuthorCount items={mockAvatarData} />
          </li>
          <li className="li-action-reaction-badges">
            <ReactionBadges />
            <AddEmojiButton size="sm" onClick={showAddReactionPopover}>
              추가
            </AddEmojiButton>
          </li>
          <li className="li-action-share">
            <DropdownSelect
              options={SHARE_DROPDOWN_ITEMS}
              customButton={<IconShareButton />}
              onChange={changeShareOption}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ListPageHeader;

const ListPageHeaderStyle = css`
  ${GlobalHeaderStyle};

  .li-message-author-count {
    display: none;
  }

  @media (min-width: ${BREAKPOINTS.md}px) {
    .li-message-author-count {
      display: block;
    }
  }

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
