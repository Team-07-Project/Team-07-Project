import { useState, useRef, useEffect } from "react";
import { css } from "@emotion/react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import GlobalHeader from "../../../components/Header/GlobalHeader";
import Button from "../../../components/Button";
import Input from "../../../components/Form/Input";
import Label from "../../../components/Form/Label";
import Dropdown from "../../../components/Dropdown/Dropdown";
import {
  RELATIONSHIP_ITEMS,
  FONTS_ITEMS,
  BREAKPOINTS,
  NAME_MAX_LENGTH,
} from "../../../constants/constants";
import SelectProfileImage from "./SelectProfileImage";
import useBreakpoint from "../../List/hooks/useResponsive";
import createMessage from "../../../api/post/createMessage";

const PostMessagePage = () => {
  // From. Input
  const [fromInputValue, setFromInputValue] = useState("");
  const [fromInputError, setFromInputError] = useState("");

  // 프로필 이미지 선택
  const [profileImageSrc, setProfileImageSrc] = useState("");

  // 관계 선택
  const [relationshipValue, setRelationshipValue] = useState(
    RELATIONSHIP_ITEMS[0]
  );

  // 메시지 내용 Input
  const [messageValue, setMessageValue] = useState("");
  const [messageValueError, setMessageValueError] = useState("");
  const textEditorRef = useRef(null);

  // 폰트 선택
  const [fontValue, setFontValue] = useState(FONTS_ITEMS[0]);

  // 반응형
  const breakpoint = useBreakpoint();

  const handleFromInputChange = (value) => {
    setFromInputValue(value);

    if (value.trim().length >= NAME_MAX_LENGTH) {
      setFromInputError(`이름은 ${NAME_MAX_LENGTH}자 이상 입력할 수 없어요.`);
    } else setFromInputError("");
  };

  const handleFromInputBlur = () => {
    if (fromInputValue.trim() === "") {
      setFromInputError("값을 입력해 주세요.");
    } else if (fromInputValue.trim().length >= NAME_MAX_LENGTH) {
      setFromInputError(`이름은 ${NAME_MAX_LENGTH}자 이상 입력할 수 없어요.`);
    } else setFromInputError("");
  };

  const handleMessageInputBlur = (_range, _source, editor) => {
    const textOnly = editor.getText().trim(); // Quill의 실제 텍스트 추출
    if (!textOnly) {
      setMessageValueError("값을 입력해 주세요.");
    } else {
      setMessageValueError("");
    }
  };

  const handleProfileImage = (selectedImageSrc) => {
    setProfileImageSrc(selectedImageSrc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 막기

    const formData = {
      sender: fromInputValue,
      profileImageURL: profileImageSrc,
      relationship: relationshipValue.value,
      content: messageValue,
      font: fontValue.label,
    };

    try {
      const result = await createMessage({
        recipientId: 11836, // 임시 생성 id
        data: formData,
      });
      console.log("메시지 작성 성공!: ", result);
    } catch (err) {
      console.log("메시지 작성 실패!: ", err.message);
    }
  };

  const isMessageEmpty = messageValue.replace(/<(.|\n)*?>/g, "").trim() === ""; //텍스트 에디터 유효성 검사 (내용이 비어있는지 아닌지 검사)

  useEffect(() => {
    // 텍스트 에디터에 선택한 폰트 적용
    const editorEl = textEditorRef.current?.editor?.root;
    if (editorEl) {
      editorEl.style.fontFamily = fontValue.value;
    }
  }, [fontValue]);

  return (
    <>
      <GlobalHeader />
      <section css={PostMessagePageStyle}>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // 기본 제출 막기
          }}
          css={PostMessageFormStyle({ messageValueError })}
        >
          <div className="form-control">
            <Label inputId="fromInput" value="From." />
            <Input
              id="fromInput"
              value={fromInputValue}
              onChange={(e) => handleFromInputChange(e.target.value)}
              onBlur={handleFromInputBlur}
              error={fromInputError}
              placeholder="이름을 입력해 주세요."
              maxLength={NAME_MAX_LENGTH}
            />
          </div>
          <div className="form-control">
            <Label value="프로필 이미지" />
            <p className="form-control-hint">프로필 이미지를 선택해주세요!</p>
            <SelectProfileImage
              onChange={handleProfileImage}
              onResponsive={breakpoint}
            />
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
              ref={textEditorRef}
              theme="snow"
              value={messageValue}
              placeholder="하고 싶은 말을 적어보세요..."
              onChange={setMessageValue}
              onBlur={handleMessageInputBlur}
            />
            {messageValueError && (
              <p css={ErrorMessageStyle}>{messageValueError}</p>
            )}
          </div>
          <div className="form-control">
            <Label value="폰트 선택" />
            <Dropdown
              options={FONTS_ITEMS}
              selectedOption={fontValue}
              onChange={setFontValue}
              isFontDropdown={true}
            />
          </div>
          <Button
            size="lg"
            style={{ width: "100%" }}
            disabled={fromInputValue.trim() === "" || isMessageEmpty}
            onClick={handleSubmit}
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

const PostMessageFormStyle = ({ messageValueError }) => css`
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

  /* react-quill custom style */
  .quill {
    border-radius: var(--radius-md);
    overflow: hidden;
    border: ${!messageValueError
      ? "1px solid var(--gray-300)"
      : "1px solid var(--error)"};
  }

  .ql-toolbar {
    background-color: var(--gray-200);
    border: none;
    border-bottom: 1px solid var(--gray-300);
  }

  .ql-container {
    border: none;
  }

  .ql-editor {
    min-height: 200px;
    font-size: var(--font-size-16);
  }
`;

const ErrorMessageStyle = css`
  font-size: var(--font-size-14);
  margin-top: 8px;
  color: var(--error);
`;
