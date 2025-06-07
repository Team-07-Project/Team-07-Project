import { useNavigate, useMatch, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useInfiniteMessages from "./hooks/useInfiniteMessages";
import MessageCardList from "../../../components/MessageCard/MessageCardList";
import GlobalHeader from "../../../components/Header/GlobalHeader";
import ListPageHeader from "../../List/ListPageHeader";
import Button from "../../../components/Button";
import { ButtonGroupStyle } from "./MessagesPageStyle";
import { ErrorTextStyle } from "./MessagesPageStyle";
import { ObserverSpacerStyle } from "./MessagesPageStyle";
import { deleteMessages } from "../../../api/delete/deleteMessages";
import useModal from "../../../components/Modal/useModal";
import MessageCardModal from "../../../components/Modal/MessageCardModal";

const MessagesPage = () => {
  // 변수 선언
  const navigate = useNavigate();
  const { id: recipientId } = useParams();
  const editMode = !!useMatch("/post/:id/edit");
  const [selectedIds, setSelectedIds] = useState([]);
  const observerRef = useRef();
  const {
    messages,
    setMessages,
    fetchMore,
    isLast,
    error: fetchError,
  } = useInfiniteMessages({
    id: recipientId,
    limit: editMode ? 6 : 5,
  });
  const [error, setError] = useState("");
  const fullError = fetchError || error;
  const { showModal } = useModal();

  // 함수 선언
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };

  const handleEditButton = () => {
    navigate(`/post/${recipientId}/edit`);
  };

  const handleSave = async () => {
    try {
      await Promise.all(selectedIds.map((id) => deleteMessages({ id })));
      // 삭제 후 메시지 상태 갱신
      setMessages((prev) =>
        prev.filter((msg) => !selectedIds.includes(msg.id))
      );
      setSelectedIds([]);
      navigate(`/post/${recipientId}`); // 일반 모드로 돌아가기
    } catch (err) {
      console.error("삭제 실패", err);
      setError("메시지 삭제 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    setSelectedIds([]); // 편집모드 변경 시 선택 초기화
  }, [editMode]);

  useEffect(() => {
    if (!observerRef.current || isLast) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchMore();
        }
      },
      {
        threshold: 1.0,
        rootMargin: "300px 0px",
      }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchMore, isLast]);

  // 화면
  return (
    <>
      <GlobalHeader />
      <ListPageHeader />
      <section>
        {editMode ? (
          <div css={ButtonGroupStyle}>
            <Button onClick={handleSave}>💾 저장하기</Button>
            <Button
              onClick={() => setSelectedIds([])}
              disabled={selectedIds.length === 0}
            >
              🚫 선택 해제 (항목: {selectedIds.length}개)
            </Button>
            <Button onClick={() => navigate(`/post/${recipientId}`)}>
              ❌ 편집 종료
            </Button>
          </div>
        ) : (
          <div css={ButtonGroupStyle}>
            <Button onClick={handleEditButton}>✏️ 편집하기</Button>
          </div>
        )}

        <MessageCardList
          messages={messages}
          editMode={editMode}
          selectedIds={selectedIds}
          onToggle={toggleSelect}
          openMessageCardModal={(data) =>
            showModal(<MessageCardModal data={data} />)
          }
        />
      </section>
      {fullError && <p css={ErrorTextStyle}>{fullError}</p>}
      <div ref={observerRef} css={ObserverSpacerStyle} />
    </>
  );
};

export default MessagesPage;
