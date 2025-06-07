import { Link } from "react-router-dom";
import { css } from "@emotion/react";

import Button from "../../components/Button/Button";
import GlobalHeader from "../../components/Header/GlobalHeader";
import Slider from "./Slider";
import { BREAKPOINTS } from "../../constants/constants";

//  슬라이더에 들어갈 목업 아이템
export const mockItems = [
  { id: 1, title: "Card 1" },
  { id: 2, title: "Card 2" },
  { id: 3, title: "Card 3" },
  { id: 4, title: "Card 4" },
  { id: 5, title: "Card 5" },
  { id: 6, title: "Card 6" },
  { id: 7, title: "Card 7" },
  { id: 8, title: "Card 8" },
  { id: 9, title: "Card 9" },
  { id: 10, title: "Card 10" },
];

//  리스트 페이지 컴포넌트
function ListPage() {
  return (
    <div>
      {/* 상단 글로벌 헤더 + CTA 버튼 */}
      <GlobalHeader>
        <Button
          as={Link}
          to="/post"
          variant="outlined"
          size="md"
          css={headerButtonStyle}
        >
          롤링 페이퍼 만들기
        </Button>
      </GlobalHeader>
      {/* 메인 콘텐츠 영역 */}
      <main css={pageWrapper} role="main">
        {/* 슬라이더 섹션 */}
        <section css={section}>
          <SliderSection title="인기 롤링 페이퍼 🔥" items={mockItems} />
          <SliderSection title="최근에 만든 롤링 페이퍼⭐️" items={mockItems} />
        </section>
        {/* 하단 CTA 버튼 */}
        <div css={ctaWrapper}>
          <Button
            as={Link}
            to="/post"
            variant="primary"
            size="lg"
            css={ctaButtonStyle}
          >
            나도 만들어보기
          </Button>
        </div>
      </main>
    </div>
  );

  function SliderSection({ title, items }) {
    return (
      <div css={sliderBlock}>
        <h2 css={sliderTitle}>{title}</h2>
        <Slider items={items} />
      </div>
    );
  }
}

export default ListPage;

//  스타일 정의  //
//  스타일 정의  //

const pageWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bg-light);
  padding-top: 48px;
  margin: 0 auto;
  gap: 48px;

  @media (min-width: ${BREAKPOINTS.md}px) {
    min-height: 951px;
  }
  @media (min-width: ${BREAKPOINTS.lg}px) {
    max-width: 1160px;
    gap: 72px;
  }
`;

const section = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 72px;
`;

const sliderBlock = css`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: ${BREAKPOINTS.md}px) {
    gap: 16px;
  }
`;

const sliderTitle = css`
  font-size: var(--font-size-20);
  font-weight: 600;
  text-align: left;
  padding-left: 20px;

  @media (min-width: ${BREAKPOINTS.md}px) {
    font-size: var(--font-size-24);
    font-weight: var(--font-weight-bold);
  }
`;

//버튼 style
const headerButtonStyle = css`
  width: auto;
  @media (max-width: ${BREAKPOINTS.md}px) {
    font-size: var(--font-size-14);
  }
`;

const ctaButtonStyle = css`
  width: 100%;
  @media (min-width: ${BREAKPOINTS.lg}px) {
    max-width: 280px;
  }
`;

const ctaWrapper = css`
  width: var(--content-width);
  padding: var(--content-padding);
  display: flex;
  justify-content: center;
  align-items: center;
`;
