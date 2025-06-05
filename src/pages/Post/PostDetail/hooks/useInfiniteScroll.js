import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useInfiniteScroll 훅
 *
 * @param {Function} fetcher
 *   - (limit: number, offset: number) => Promise<array>
 *   - limit: 이번 호출에서 가져올 아이템 개수
 *   - offset: 이미 가져온 아이템 수(넘긴 offset)
 *
 * @param {number} baseLimit
 *   - 화면에 한 번에 보여주고 싶은 아이템 개수(LIMIT).
 *   - 훅 내부에서는 첫 호출 시 baseLimit - 1만큼만 가져오고,
 *     다음부터는 baseLimit만큼 가져오는 방식으로 동작.
 *
 * @returns {{
 *   items: any[],
 *   isLoading: boolean,
 *   hasMore: boolean,
 *   observerRef: React.MutableRefObject<null>
 * }}
 */
export function useInfiniteScroll(fetcher, baseLimit, options = {}) {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const observerRef = useRef(null);
  const { adjustFirstCount = 0 } = options;

  // 실제로 한 번에 fetch할 개수를 계산하는 함수
  const calcFetchCount = (currentOffset) => {
    // 맨 처음 로드할 때 offset = 0
    const isFirstLoad = currentOffset === 0;
    return isFirstLoad ? baseLimit + adjustFirstCount : baseLimit;
  };

  // 데이터를 가져오는 함수 (useCallback으로 묶어서 의존성 관리)
  const loadMore = useCallback(async () => {
    // 이미 로딩 중이거나 불러올 게 없다면 탈출
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const countToFetch = calcFetchCount(offset);
      const data = await fetcher(countToFetch, offset);
      const newItems = data.results;
      const total = data.count;

      const nextOffset = offset + newItems.length;

      // 데이터 가져올 떄 ID중복 요소들이 생김 - filter이용해서 중복요소 제거하고 기존 items뒤에 붙임.
      setItems((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const deduped = newItems.filter((item) => !existingIds.has(item.id));
        return [...prev, ...deduped];
      });

      setOffset(nextOffset); // 상태만 업데이트

      // 받아온 개수가 요청한 개수보다 적으면 더 이상 불러올 게 없다.
      if (nextOffset >= total) {
        setHasMore(false); // 실제 offset을 기준으로 판단!
      }
      setError(null);
    } catch (err) {
      console.error("useInfiniteScroll: 데이터 로드 실패", err);
      setError("데이터를 불러오는 데 실패했습니다.");
      setHasMore(false); // ❗ 무한스크롤 중지
    } finally {
      setIsLoading(false);
    }
  }, [fetcher, offset, isLoading, hasMore, baseLimit]);

  // ── (1) 컴포넌트 마운트 직후 첫 번째 로드
  useEffect(() => {
    loadMore();
  }, []);

  // ── (2) IntersectionObserver로 추가 로드
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!isLoading && entry.isIntersecting) loadMore();
      },
      { threshold: 0.3 }
    );

    const ele = observerRef.current;
    if (ele) observer.observe(ele);

    return () => {
      if (ele) observer.unobserve(ele);
    };
  }, [loadMore, isLoading, hasMore, adjustFirstCount]);

  return { items, isLoading, hasMore, observerRef, error };
}
