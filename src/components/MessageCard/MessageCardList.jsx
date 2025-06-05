import MessageCardListStyle from "./MessageCardListStyle";
import MessageCard from "./MessageCard";
import AddMessageCardButton from "./AddMessageCardButton";
import { useEffect, useState } from "react";

/**
 * @param {boolean} editMode - 편집 모드
 */
const MessageCardList = ({ messages = [], editMode = false,onMarkDelete }) => {
  const [localMessages, setLocalMessages] = useState(messages);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  // 휴지통 아이콘 클릭 시: 화면에서 숨기고, 부모의 onMarkDelete 를 호출
  const handleMarkDelete = (msgId) => {
    // 화면상에서 해당 메시지 제거
    setLocalMessages((prev) => prev.filter((msg) => msg.id !== msgId));
    // 실제 삭제 대상 ID를 부모(PostDetailPage)에 전달
      onMarkDelete(msgId);
  };

  if (!localMessages || localMessages.length === 0) {
    return <EmptyMessageCardList editMode={editMode} />;
  }

  // 메시지가 1개 이상이고, 편집 모드가 아니면 메시지 리스트 보여주기
  return (
    <CardListResult
      messages={localMessages}
      editMode={editMode}
      onMarkDelete={handleMarkDelete}
    />
  );
};

function CardListResult({ messages, editMode, onMarkDelete }) {
  return (
    <div css={MessageCardListStyle}>
      {!editMode && <AddMessageCardButton />}
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          messageData={message}
          isEditable={editMode}
          onDelete={onMarkDelete} // 휴지통 클릭 시 onMarkDelete(msg.id) 호출
        />
      ))}
    </div>
  );
}

function EmptyMessageCardList({ editMode }) {
  if (!editMode) {
    return (
      <div css={MessageCardListStyle}>
        <AddMessageCardButton />
      </div>
    );
  }

  return (
    <div css={MessageCardListStyle}>
      <p className="empty-message">아직 등록된 메시지가 없어요!</p>
    </div>
  );
}

export default MessageCardList;
