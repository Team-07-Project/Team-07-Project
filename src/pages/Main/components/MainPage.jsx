import { css } from "@emotion/react";
import cardPreview from "../../../assets/images/card_preview.png";
import emojiPreview from "../../../assets/images/emoji_preview.png";
import Button from "../../../components/Button/Button";
import { Link } from "react-router-dom";
import GlobalHeader from "../../../components/Header/GlobalHeader";
import { BREAKPOINTS } from "../../../constants/constants";

// 메인 페이지 컴포넌트
const MainPage = () => {
  return (
    <>
      {/* 헤더 영역 */}
      <GlobalHeader>
        <HeaderButton />
      </GlobalHeader>

      {/* 본문 전체 래퍼 */}
      <div css={pageWrapper}>
        {/* 포인트 섹션 1 */}
        <PointSection
          pointNumber="01"
          title={
            <>
              누구나 손쉽게, 온라인 <br css={breakLine} /> 롤링 페이퍼를 만들 수
              있어요
            </>
          }
          description="로그인 없이 자유롭게 만들어요."
          image={cardPreview}
        />

        {/* 포인트 섹션 2 - 좌우 반전 */}
        <PointSection
          pointNumber="02"
          title={
            <>
              서로에게 이모지로 감정을 <br css={breakLine} /> 표현해보세요
            </>
          }
          description="롤링 페이퍼에 이모지를 추가할 수 있어요."
          image={emojiPreview}
          reverse
        />
        {/* 구경해보기 버튼 */}
        <div css={[responsiveBox, flexCenter]}>
          <Button
            as={Link}
            to="/list"
            css={ctaButton}
            variant="primary"
            size="lg"
          >
            구경해보기
          </Button>
        </div>
      </div>
    </>
  );
};
export default MainPage;

// 헤더 우측에 노출되는 "롤링 페이퍼 만들기" 버튼
const HeaderButton = () => (
  <Button
    as={Link}
    to="/post"
    variant="outlined"
    size="md"
    css={css`
      width: 157px;
      height: 40px;
      display: block;
      @media (max-width: ${BREAKPOINTS.md}px) {
        width: 142px;
        font-size: var(--font-size-14);
      }
    `}
  >
    롤링 페이퍼 만들기
  </Button>
);

// Point.01, Point.02 공통 영역 컴포넌트
const PointSection = ({
  pointNumber,
  title,
  description,
  image,
  reverse = false,
}) => (
  <section css={[pointSection, responsiveBox, reverse && reverseStyle]}>
    <div css={pointContent}>
      <span css={pointBadge}>Point. {pointNumber}</span>
      <h2 css={pointTitle}>{title}</h2>
      <p css={pointDesc}>{description}</p>
    </div>
    <div css={pointPreview}>
      <img
        src={image}
        alt={
          pointNumber === "01"
            ? "카드 미리보기 이미지"
            : "이모지 기능 미리보기 이미지"
        }
        css={pointNumber === "02" ? emojiImageStyle : undefined}
      />
    </div>
  </section>
);

// 페이지 전체 배경 및 레이아웃 설정 (반응형 padding, margin 포함)
const pageWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  background-color: var(--bg-light);
  padding: var(--content-padding);
  margin-top: 24px;
  @media (min-width: ${BREAKPOINTS.md}px) {
    gap: 30px;
  }
  @media (min-width: ${BREAKPOINTS.lg}px) {
    margin-top: 48px;
    padding-bottom: 48px;
  }
`;

// 포인트 섹션 공통 스타일 (카드 형태 + 반응형 레이아웃)
const pointSection = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--surface-0);
  border-radius: 20px;
  padding: 24px;
  gap: 48px;
  flex-direction: column;
  overflow: hidden;
  @media (min-width: ${BREAKPOINTS.md}px) {
    padding: 40px;
    height: 440px;
  }
  @media (min-width: ${BREAKPOINTS.lg}px) {
    height: 324px;
    flex-direction: row;
    padding: 60px;
    align-items: flex-start;
  }
`;

const pointContent = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  gap: 4px;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    gap: 16px;
  }
`;

const pointBadge = css`
  width: 80px;
  display: inline-block;
  background-color: var(--purple-600);
  color: var(--white);
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-bold);
  padding: 4px 12px;
  border-radius: 999px;
  line-height: 20px;
  letter-spacing: -0.5px;

  @media (min-width: ${BREAKPOINTS.md}px) {
    padding: 6px 12px;
  }
`;

const pointTitle = css`
  font-size: var(--font-size-18);
  font-weight: var(--font-weight-bold);
  color: var(--gray-900);
  letter-spacing: -1px;

  @media (min-width: ${BREAKPOINTS.md}px) {
    font-size: var(--font-size-24);
  }
`;

const pointDesc = css`
  font-size: var(--font-size-15);
  font-weight: var(--font-weight-regular);
  color: var(--gray-500);

  @media (min-width: ${BREAKPOINTS.md}px) {
    font-size: var(--font-size-18);
  }
`;

const pointPreview = css`
  display: flex;
  justify-content: flex-end;
  width: 395px;
  padding-bottom: 24px;

  @media (min-width: ${BREAKPOINTS.md}px) {
    width: 100%;
    max-width: 640px;
    height: auto;
    padding-bottom: 0px;
  }
  @media (min-width: ${BREAKPOINTS.lg}px) {
    max-width: 720px;
  }
`;

// Point.02 이모지 이미지만 적용되는 스타일
const emojiImageStyle = css`
  width: 100%;
  height: 113px;
  object-fit: cover;
  object-position: center;

  @media (min-width: ${BREAKPOINTS.md}px) {
    height: 204px;
  }
`;

// 화면 너비에 따라 줄바꿈 처리 방식 변경
const breakLine = css`
  display: block;
  @media (min-width: ${BREAKPOINTS.md}px) {
    display: none;
  }
  @media (min-width: ${BREAKPOINTS.lg}px) {
    display: block;
  }
`;

export const responsiveBox = css`
  width: 100%;
  max-width: clamp(320px, 90vw, 1200px);
`;

// 하단 '구경해보기' 버튼 스타일 (정렬 + 반응형 너비)
const ctaButton = css`
  width: 100%;
  height: 56px;
  margin-top: 24px;
  font-size: var(--font-size-18);
  font-weight: 700;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    max-width: 280px;
    margin-top: 0;
  }
`;

// Point 섹션 좌우 반전용 스타일
const reverseStyle = css`
  @media (min-width: ${BREAKPOINTS.lg}px) {
    flex-direction: row-reverse;
    padding: 60px 60px 60px 0;
  }
`;

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
