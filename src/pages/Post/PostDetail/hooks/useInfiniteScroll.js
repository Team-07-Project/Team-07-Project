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
export function useInfiniteScroll(fetcher, baseLimit) {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  // 실제로 한 번에 fetch할 개수를 계산하는 함수
  const calcFetchCount = (currentOffset) =>
    currentOffset === 0 ? baseLimit - 1 : baseLimit;

  // 데이터를 가져오는 함수 (useCallback으로 묶어서 의존성 관리)
  const loadMore = useCallback(async () => {
    // 이미 로딩 중이거나 불러올 게 없다면 탈출
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const countToFetch = calcFetchCount(offset);
      const newItems = await fetcher(countToFetch, offset);

      // 백엔드에서 ordering이 없어서 중복 요소들이 생김 - filter이용해서 중복요소 제거하고 기존 items뒤에 붙임.
      setItems((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const deduped = newItems.filter((item) => !existingIds.has(item.id));
        return [...prev, ...deduped];
      });

      // offset을 증가시킨다
      setOffset((prev) => prev + countToFetch);

      // 받아온 개수가 요청한 개수보다 적으면 더 이상 불러올 게 없다.
      if (newItems.length < countToFetch) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("useInfiniteScroll: 데이터 로드 실패", err);
    } finally {
      setIsLoading(false);
    }
  }, [fetcher, offset, isLoading, hasMore, baseLimit]);

  // ── (1) 컴포넌트 마운트 직후 첫 번째 로드
  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── (2) IntersectionObserver로 추가 로드
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!isLoading && entry.isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        threshold: 1.0,
        // 살짝 여유를 두고 감지하고 싶다면 조절 가능
        rootMargin: "0px 0px 100px 0px",
      }
    );

    const ele = observerRef.current;
    if (ele) observer.observe(ele);

    return () => {
      if (ele) observer.unobserve(ele);
    };
  }, [loadMore, isLoading, hasMore]);

  return { items, isLoading, hasMore, observerRef };
}
