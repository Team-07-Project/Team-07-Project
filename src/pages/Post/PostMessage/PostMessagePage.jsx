import { useState } from "react";
import { css } from "@emotion/react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import GlobalHeader from "../../../components/Header/GlobalHeader";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Label from "../../../components/Label";
import Dropdown from "../../../components/Dropdown/Dropdown";
import {
  RELATIONSHIP_ITEMS,
  FONTS_ITEMS,
  BREAKPOINTS,
} from "../../../constants/constants";
import SelectProfileImage from "./SelectProfileImage";

const PostMessagePage = () => {
  const [fromInputValue, setFromInputValue] = useState("");
  const [fromInputError, setFromInputError] = useState("");
  const [profileImageSrc, setProfileImageSrc] = useState("");
  const [relationshipValue, setRelationshipValue] = useState(
    RELATIONSHIP_ITEMS[0]
  );
  const [messageValue, setMessageValue] = useState("");
  const [fontValue, setFontValue] = useState(FONTS_ITEMS[0]);

  const handleProfileImage = (selectedImageSrc) => {
    setProfileImageSrc(selectedImageSrc);
  };

  const handleFromInputBlur = () => {
    if (fromInputValue.trim() === "") {
      setFromInputError("값을 입력해 주세요.");
    } else {
      setFromInputError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("메시지 작성 데이터 api로 전송");
  };

  const isMessageEmpty = messageValue.replace(/<(.|\n)*?>/g, "").trim() === ""; //텍스트 에디터 유효성 검사 (내용이 비어있는지 아닌지 검사)

  return (
    <>
      <GlobalHeader />
      <section css={PostMessagePageStyle}>
        <form onSubmit={handleSubmit} css={PostMessageFormStyle}>
          <div className="form-control">
            <Label inputId="fromInput" value="From." />
            <Input
              id="fromInput"
              value={fromInputValue}
              onChange={(e) => setFromInputValue(e.target.value)}
              onBlur={handleFromInputBlur}
              error={fromInputError}
              placeholder="이름을 입력해 주세요."
            />
          </div>
          <div className="form-control">
            <Label value="프로필 이미지" />
            <SelectProfileImage onChange={handleProfileImage} />
          </div>
          <div className="form-control">
            <Label value="상대와의 관계" />
            <Dropdown
              options={RELATIONSHIP_ITEMS}
              selectedOption={relationshipValue}
              onChange={setRelationshipValue}
            />
          </div>
          <div className="form-control">
            <Label value="내용을 입력해 주세요" />
            <ReactQuill
              theme="snow"
              value={messageValue}
              placeholder="하고 싶은 말을 적어보세요..."
              onChange={setMessageValue}
            />
          </div>
          <div className="form-control">
            <Label value="폰트 선택" />
            <Dropdown
              options={FONTS_ITEMS}
              selectedOption={fontValue}
              onChange={setFontValue}
            />
          </div>
          <Button
            size="lg"
            style={{ width: "100%" }}
            disabled={fromInputValue.trim() === "" || isMessageEmpty}
          >
            생성하기
          </Button>
        </form>
      </section>
    </>
  );
};

export default PostMessagePage;

const PostMessagePageStyle = css`
  padding: 0 24px;

  @media (min-width: ${BREAKPOINTS.md}px) {
    width: 720px;
    margin: 0 auto;
    padding: 0;
  }
`;

const PostMessageFormStyle = css`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 48px 0 60px;

  .form-control {
    display: flex;
    flex-direction: column;
  }

  .form-control-hint {
    color: var(--gray-500);
    font-size: var(--font-size-16);
    margin-top: -4px;
    margin-bottom: 12px;
  }

  .ql-toolbar {
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    background-color: var(--gray-200);
  }

  .ql-container {
    border-radius: 0 0 var(--radius-md) var(--radius-md);
  }

  .ql-editor {
    min-height: 200px;
  }
`;
