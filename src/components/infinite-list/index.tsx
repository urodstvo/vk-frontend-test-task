import { CustomScrollView, List } from '@vkontakte/vkui';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type InfiniteListProps<T = unknown> = {
  gap: number;
  height: number | string;
  list: T[];
  itemHeight: number;
  itemRenderer: (props: { item: T; key: number }) => React.ReactElement;
  fetchMoreRenderer?: (props: { ref: React.Ref<HTMLDivElement>; fn: () => void }) => React.ReactNode;
  fetchMoreFunction?: () => void;
};

export const InfiniteList = ({
  height,
  gap,
  list,
  itemHeight,
  itemRenderer,
  fetchMoreRenderer,
  fetchMoreFunction,
}: InfiniteListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [visibleItemsCount, setVisibleItemsCount] = useState(
    Math.ceil(window.innerHeight / (itemHeight + gap)) + 4, // Буфер 4 элемента
  );
  const [topIndex, setTopIndex] = useState(0);

  const visibleItems = useMemo(
    () => list.slice(topIndex, topIndex + visibleItemsCount),
    [topIndex, visibleItemsCount, list],
  );

  useEffect(() => {
    const handleResize = () => {
      setVisibleItemsCount(Math.ceil(window.innerHeight / (itemHeight + gap)) + 4);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemHeight, gap]);

  const handleScroll = useCallback(() => {
    if (!listRef.current) return;

    const scrollTop = listRef.current.scrollTop;
    const newTopIndex = Math.max(
      Math.floor(scrollTop / (itemHeight + gap)) - 2, // Буфер 2 элемента
      0,
    );

    setTopIndex((prev) => (prev !== newTopIndex ? newTopIndex : prev));
  }, [itemHeight, gap]);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const totalHeight = list.length * (itemHeight + gap) - gap;

  const fetchMoreRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entities) => {
        const target = entities[0];
        setInView(target.isIntersecting);
      },
      { threshold: 0.01 },
    );

    if (fetchMoreRef.current) observer.observe(fetchMoreRef.current);
  }, []);

  useEffect(() => {
    if (inView && fetchMoreFunction) fetchMoreFunction();
  }, [inView, fetchMoreFunction]);

  return (
    <CustomScrollView
      getRootRef={listRef}
      style={{
        position: 'relative',
        overflowY: 'auto',
        height: height,
        width: '100%',
        padding: '0',
      }}
    >
      <div
        style={{
          height: totalHeight,
          position: 'relative',
        }}
      >
        <List
          gap={gap}
          style={{
            position: 'absolute',
            top: topIndex * (itemHeight + gap),
            left: 0,
            width: '100%',
          }}
        >
          {visibleItems.map((item, index) => itemRenderer({ item, key: topIndex + index }))}
        </List>
      </div>
      {fetchMoreRenderer && fetchMoreFunction ? fetchMoreRenderer({ ref: fetchMoreRef, fn: fetchMoreFunction }) : null}
    </CustomScrollView>
  );
};
