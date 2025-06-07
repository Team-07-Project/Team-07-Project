import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessages } from "../../../../api/post/fetchMessages";

/**
 * 무한스크롤 메시지 훅
 * URL에서 recipient ID를 가져와서 자동으로 사용
 *
 * @param {Object} params
 * @param {string} [params.sort=""] - 정렬 방식
 * @param {number} [params.limit=6] - 한 번에 가져올 개수
 */
const useInfiniteMessages = ({ sort = "", limit = 6 }) => {
  const { id } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchMore = useCallback(async () => {
    if (loading || isLast) return;

    setLoading(true);
    try {
      const { results } = await getMessages({
        id,       
        offset,
        limit,
        sort,
      });

      setMessages(prev => [...prev, ...results]);
      setOffset(prev => prev + results.length);

      if (results.length < limit) {
        setIsLast(true);
      }
    } catch (error) {
      console.error("메시지를 불러오지 못했습니다:", error);
    } finally {
      setLoading(false);
    }
  }, [id, offset, isLast, loading, sort, limit]);

  return {
    messages,
    setMessages,
    fetchMore,
    isLast,
    loading,
  };
};

export default useInfiniteMessages;
