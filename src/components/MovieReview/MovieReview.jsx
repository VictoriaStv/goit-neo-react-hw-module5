import { useState, useRef, useEffect } from "react";
import css from "./MovieReview.module.css";

export default function MovieReview({ review }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(contentRef.current).lineHeight,
        10
      );
      const maxHeight = lineHeight * 3;
      setIsOverflowing(contentRef.current.scrollHeight > maxHeight);
    }
  }, [review.content]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={css.card}>
      <h3 className={css.author}>Author: {review.author}</h3>
      <div className={css.review}>
        <p
          ref={contentRef}
          className={isExpanded ? css.contentExpanded : css.content}
        >
          {review.content}
        </p>
        {isOverflowing && !isExpanded && (
          <button className={css.moreButton} onClick={toggleExpand}>
            more
          </button>
        )}
        {isOverflowing && isExpanded && (
          <button className={css.moreButton} onClick={toggleExpand}>
            less
          </button>
        )}
      </div>
    </div>
  );
}
