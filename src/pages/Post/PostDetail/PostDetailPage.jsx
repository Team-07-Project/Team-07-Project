import { useCallback } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { getMessages } from "../../../api/post/fetchMessages";
import MessageCardList from "../../../components/MessageCard/MessageCardList";
import { loader, messagesWrapper } from "./PostDetailPage.styles";
import { TEAM } from "../../../constants/constants";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import GlobalHeader from "../../../components/Header/GlobalHeader";
import ListPageHeader from "../../List/ListPageHeader";
import Button from "../../../components/Button";

const PostDetailPage = () => {
  const { id } = useParams();
  // url이 /post/:id/edit 일 경우에 editMode인 걸로 자동 적용
  const isEdit = useMatch("/post/:id/edit"); // editMode 판별용
  const navigate = useNavigate();

  // ── fetcher: useInfiniteScroll에게 "limit, offset"을 넘겨주면 getMessages 로직을 실행해서 메시지 배열을 반환하도록 만든다.
  const fetchMessages = useCallback(
    (limit, offset) => getMessages({ id, team: TEAM, limit, offset }),
    [id]
  );

  // ── baseLimit = 6 (원하는 한 화면에 보여질 총 메시지 개수 + 고정 요소 1개)
  const baseLimit = 6;

  // editMode에 따라 첫 fetch 개수 다르게 조정
  const adjustFirstCount = isEdit ? 0 : -1;

  // 훅 호출: items, isLoading, hasMore, observerRef을 받아온다.
  const {
    items: messages,
    isLoading,
    hasMore,
    observerRef,
    error,
  } = useInfiniteScroll(fetchMessages, baseLimit, { adjustFirstCount });

  return (
    <>
      <section style={{ backgroundColor: "#e4fbdc" }}>
        <GlobalHeader />
        <ListPageHeader />
        <div css={messagesWrapper}>
          {isEdit ? (
            <Button onClick={() => navigate(`/post/${id}`)}>편집종료</Button>
          ) : (
            <Button onClick={() => navigate(`/post/${id}/edit`)}>
              편집하기
            </Button>
          )}
          <MessageCardList messages={messages} editMode={isEdit} />
          {hasMore && (
            <div ref={observerRef} css={loader}>
              {isLoading ? "불러오는 중..." : "더 불러오기..."}
            </div>
          )}
          {error && (
            <div style={{ color: "red", textAlign: "center" }}>{error}</div>
          )}
        </div>
      </section>
    </>
  );
};

export default PostDetailPage;
