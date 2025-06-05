import { useState } from "react";
import { css } from "@emotion/react";
import DropdownSelect from "../../../components/Dropdown/Dropdown";
import {
  IconCheckButton,
  IconDeleteButton,
  IconPlusButton,
  IconShare20Button,
  IconShare24Button,
} from "../../../components/Button/IconButtons";
import Badge from "../../../components/Badge/Badge";
import EmojiBadge from "../../../components/Badge/EmojiBadge";
import ReactionBadges from "../../../components/Dropdown/ReactionBadges";

const handleOptionClick = (option) => {
  alert(`${option.value} 공유`);
};

const TestPage = () => {
  const [font, setFont] = useState(null);
  const [relationship, setRelationship] = useState(null);

  return (
    <div css={all}>
      <DropdownSelect
        selectedOption={font}
        onChange={setFont}
        options={[
          { label: "Noto Sans", value: "noto" },
          { label: "Pretendard", value: "pretendard" },
          { label: "나눔명조", value: "나눔명조" },
          { label: "나눔손글씨 손편지체", value: "나눔손글씨 손편지체" },
        ]}
        controlled={true}
      />

      <DropdownSelect
        customButton={<IconShare24Button />}
        options={[
          {
            label: "카카오톡 공유",
            value: "kakaoTalk",
            onClick: handleOptionClick,
          },
          { label: "URL 공유", value: "URL", onClick: handleOptionClick },
        ]}
      />

      <DropdownSelect
        selectedOption={relationship}
        onChange={setRelationship}
        options={[
          { label: "친구", value: "친구" },
          { label: "지인", value: "지인" },
          { label: "동료", value: "동료" },
          { label: "가족", value: "가족" },
        ]}
      />
      <Badge relationshipLabel={"친구"}></Badge>
      <Badge relationshipLabel={"동료"}></Badge>
      <Badge relationshipLabel={"가족"}></Badge>
      <Badge relationshipLabel={"지인"}></Badge>

      <EmojiBadge emoji={"😍"} count={"4"} />
      <EmojiBadge emoji={"😎"} count={"23"} />
      <EmojiBadge emoji={"⚽️"} count={"17"} />
      <ReactionBadges />
    </div>
  );
};
export default TestPage;

const all = css`
  margin: 20px;
`;
