import { useCallback, useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { deleteMessage, getMessages } from "../../../api/post/fetchMessages";
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

  // 삭제 대상으로 표시된 메시지 ID들을 모아두는 state
  const [deletedIds, setDeletedIds] = useState([]);

  // 중간에 url이 바뀔 경우, 삭제하려고 선택한 요소들 초기화
  useEffect(() => {
    if (!isEdit) {
      setDeletedIds([]);
    }
  }, [isEdit]);

  // 휴지통 클릭 시: deletedIds에 ID를 추가만 함
  const handleMarkDelete = (msgId) => {
    setDeletedIds((prev) => {
      if (prev.includes(msgId)) return prev;
      return [...prev, msgId];
    });
  };

  // “저장하기” 버튼 클릭 시 실제 삭제 API를 호출하고, 삭제 후 /post/:id/ 로 돌아감
  const handleSave = async () => {
    try {
      // deletedIds 에 쌓인 ID들을 순회하며 API 호출
      await Promise.all(
        deletedIds.map((msgId) => deleteMessage({ id: msgId }))
      );
      // 완료 후 상세 페이지(뷰 모드)로 이동
      navigate(`/post/${id}`);
    } catch (err) {
      console.error(err);
      alert("메시지 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <section style={{ backgroundColor: "#e4fbdc" }}>
        <GlobalHeader />
        <ListPageHeader />
        <div css={messagesWrapper}>
          {isEdit ? (
            // 편집 모드: “저장하기” 버튼으로 변경
            <Button onClick={handleSave}>저장하기</Button>
          ) : (
            // 뷰 모드: “편집하기” 버튼
            <Button onClick={() => navigate(`/post/${id}/edit`)}>
              편집하기
            </Button>
          )}

          {/* MessageCardList에 editMode와 삭제 대상 콜백(onMarkDelete)를 넘겨준다 */}
          <MessageCardList
            messages={messages}
            editMode={isEdit}
            onMarkDelete={handleMarkDelete}
          />
          {error && (
            <div style={{ color: "red", textAlign: "center" }}>{error}</div>
          )}
        </div>
        {hasMore && (
          <div ref={observerRef} css={loader}>
            {isLoading ? "불러오는 중..." : "더 불러오기..."}
          </div>
        )}
      </section>
    </>
  );
};

export default PostDetailPage;
