import MessageCardListStyle from "./MessageCardListStyle";
import MessageCard from "./MessageCard";
import AddMessageCardButton from "./AddMessageCardButton";
import { useEffect, useState } from "react";
import { deleteMessage } from "../../api/post/fetchMessages";

/**
 * @param {boolean} editMode - 편집 모드
 */
const MessageCardList = ({ messages = [], editMode = false }) => {
  const [localMessages, setLocalMessages] = useState(messages);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  const handleDelete = async (id) => {
    try {
      await deleteMessage({ id });
      setLocalMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      alert("삭제에 실패했어요.");
      console.error(err);
    }
  };

  if (!localMessages || localMessages.length === 0) {
    return <EmptyMessageCardList editMode={editMode} />;
  }

  // 메시지가 1개 이상이고, 편집 모드가 아니면 메시지 리스트 보여주기
  return (
    <CardListResult
      messages={localMessages}
      editMode={editMode}
      onDelete={handleDelete}
    />
  );
};

function CardListResult({ messages, editMode, onDelete }) {
  return (
    <div css={MessageCardListStyle}>
      {!editMode && <AddMessageCardButton />}
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          messageData={message}
          isEditable={editMode}
          onDelete={onDelete}
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
