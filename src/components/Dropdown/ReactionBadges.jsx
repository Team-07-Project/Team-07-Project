import { css } from "@emotion/react";
import { BREAKPOINTS } from "../../constants/constants";
import useDropdown from "./useDropdown";
import EmojiBadge from "../Badge/EmojiBadge";
import iconArrowTop from "../../assets/images/iconArrowTop.svg";
import iconArrowDown from "../../assets/images/iconArrowDown.svg";
import { useEffect, useState } from "react";

const MockReactionOptions = [
  { id: 1, emoji: "😀", count: "13" },
  { id: 2, emoji: "🥹", count: "2" },
  { id: 3, emoji: "😊", count: "43" },
  { id: 4, emoji: "😂", count: "22" },
  { id: 5, emoji: "🥲", count: "34" },
  { id: 6, emoji: "😎", count: "51" },
  { id: 7, emoji: "⚽️", count: "10" },
  { id: 8, emoji: "🏍️", count: "6" },
  { id: 9, emoji: "🍎", count: "120" },
];

const ReactionBadges = ({ options = MockReactionOptions }) => {
  const { dropdownSelectRef, isOpen, setIsOpen } = useDropdown({
    options,
  });

  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setVisibleCount(width < 769 ? 6 : 8);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sortReactions = [...options].sort(
    (a, b) => Number(b.count) - Number(a.count)
  );

  return (
    <div ref={dropdownSelectRef} css={ReactionsWrapper}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <div css={topCountReaction}>
          {sortReactions.slice(0, 3).map((reaction) => (
            <EmojiBadge
              key={reaction.id}
              id={reaction.id}
              emoji={reaction.emoji}
              count={Number(reaction.count) > 99 ? "99+" : reaction.count}
            />
          ))}
          <img src={isOpen ? iconArrowTop : iconArrowDown} alt="toggle" />
        </div>
        {isOpen && (
          <div css={reactionDropdown}>
            {sortReactions.slice(0, visibleCount).map((reaction) => (
              <EmojiBadge
                key={reaction.id}
                id={reaction.id}
                emoji={reaction.emoji}
                count={Number(reaction.count) > 99 ? "99+" : reaction.count}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactionBadges;

/**     Style     */
const ReactionsWrapper = css`
  display: inline-block;
  position: relative;
  padding: 0 6px 0 6px;
`;

const topCountReaction = css`
  display: flex;
  gap: 8px;
  font-size: var(--font-size-14) img {
    width: 24px;
    padding: 2px;
  }

  @media (min-width: ${BREAKPOINTS.md}px) {
    font-size: var(--font-size-16);
  }
`;

const reactionDropdown = css`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  right: 0;
  margin-top: 12px;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-lg);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 24px;
  gap: 10px;
  z-index: 100;
  background-color: var(--white);
  font-size: var(--font-size-14);

  @media (min-width: ${BREAKPOINTS.md}px) {
    grid-template-columns: repeat(4, 1fr);
    font-size: var(--font-size-16);
  }
`;
