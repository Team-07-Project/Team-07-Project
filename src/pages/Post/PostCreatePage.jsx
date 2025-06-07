import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Label from "../../components/Form/Label";
import Input from "../../components/Form/Input";
import ToInput from "./components/ToInPut";
import SelectBackground from "./components/SeletBackground";
import GlobalHeader from "../../components/Header/GlobalHeader";
import Button from "../../components/Button";
import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 600px;
  margin: 57px auto 340px;
  padding: 0 24px;
`;

// 배경 선택 영역
const Background = styled.div`
  margin: 50px 0px;
`;

const HeaderWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const PostCreatePage = () => {
  const [to, setTo] = useState("");
  const [toError, setToError] = useState("");
  const [background, setBackground] = useState({
    backgroundColor: undefined,
    backgroundImageURL: undefined,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTo(e.target.value);
    if (toError) setToError("");
  };

  const handleBlur = () => {
    if (to.trim() === "") {
      setToError("값을 입력해 주세요");
    }
  };

  const handleCreate = () => {
    if (to.trim() === "") {
      setToError("값을 입력해 주세요");
      return;
    }

    const fakeId = "test123";
    navigate(`/post/${fakeId}`);
  };

  const isBackgroundSelected =
    background.backgroundColor || background.backgroundImageURL;

  const isCreateEnabled = to.trim() !== "" && isBackgroundSelected;

  return (
    <div>
      <HeaderWrapper>
        <GlobalHeader />
      </HeaderWrapper>

      <Container>
        <Label value="To." />
        <Input
          value={to}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="받는사람 이름을 입력해 주세요"
          error={toError}
        />
        {/* <ToInput
          value={to}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="받는사람 이름을 입력해 주세요"
          error={toError}
        /> */}

        <Background>
          <SelectBackground onChange={setBackground} />
        </Background>

        <div>
          <Button
            variant="primary"
            size="lg"
            disabled={!isCreateEnabled}
            onClick={handleCreate}
            style={{ width: "100%" }}
          >
            생성하기
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default PostCreatePage;
