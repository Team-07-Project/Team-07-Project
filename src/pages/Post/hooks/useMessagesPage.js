/**
 * 상태 및 로직만 담당
 */
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useMatch, useParams } from "react-router-dom";
import useInfiniteMessages from "./useInfiniteMessages";
import useModal from "../../../components/Modal/useModal";
import { deleteMessages } from "../../../api/delete/deleteMessages";
import { getRecipient } from "../../../api/get/getRecipient";
import useAllMessages from "./useAllMessages";

const useMessagesPage = () => {
  const { id: recipientId } = useParams();
  const navigate = useNavigate();
  const editMode = !!useMatch("/post/:id/edit");
  const [selectedIds, setSelectedIds] = useState([]);
  const { showModal } = useModal();
  const {
    messages,
    setMessages,
    fetchMore,
    isLast,
    error: fetchError,
  } = useInfiniteMessages({ id: recipientId, limit: editMode ? 6 : 5 });
  const { allMessages, setAllMessages } = useAllMessages(recipientId);
  const [error, setError] = useState("");
  const [recipient, setRecipient] = useState(null);

  // 👇 recipient 정보 불러오기
  useEffect(() => {
    const fetchRecipient = async () => {
      try {
        const data = await getRecipient({ id: recipientId });
        setRecipient(data);
      } catch (err) {
        console.error("recipient 로딩 실패", err);
        setError("수신인 정보를 불러오는 데 실패했습니다.");
      }
    };

    if (recipientId) {
      fetchRecipient();
    }
  }, [recipientId]);

  const handleEditButton = () => {
    const baseUrl = `/post/${recipientId}`;
    navigate(editMode ? baseUrl : `${baseUrl}/edit`);
  };

  const toggleSelection = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedIds.map((id) => deleteMessages({ id })));
      setMessages((prev) =>
        prev.filter((msg) => !selectedIds.includes(msg.id))
      );

      setAllMessages?.((prev) =>
        prev.filter((msg) => !selectedIds.includes(msg.id))
      );
      setSelectedIds([]);
    } catch (err) {
      console.error("삭제 실패", err);
      setError("메시지 삭제 중 문제가 발생했습니다.");
    }
  };

 // **단일 메시지 삭제**
 const handleDeleteMessage = async (id) => {
   try {
     await deleteMessages({ id });
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    setAllMessages?.((prev) => prev.filter((msg) => msg.id !== id));
     // 혹시 선택된 상태였다면 해제
     setSelectedIds((prev) => prev.filter((x) => x !== id));
   } catch (err) {
     console.error("단일 삭제 실패", err);
     setError("메시지 삭제 중 문제가 발생했습니다.");
   }
 };

  const handleToggleSelectAll = () => {
    const allIds = messages.map((m) => m.id);
    if (selectedIds.length > 0) {
      setSelectedIds([]); // 모두 해제
    } else {
      setSelectedIds(allIds); // 모두 선택
    }
  };

  return {
    recipient,
    recipientId,
    editMode,
    selectedIds,
    setSelectedIds,
    toggleSelection,
    messages,
    setMessages,
    allMessages,
    setAllMessages,
    showModal,
    fetchMore,
    isLast,
    error: fetchError || error,
    handleEditButton,
    handleDeleteSelected,
    handleDeleteMessage,
    handleToggleSelectAll,
  };
};

export default useMessagesPage;
