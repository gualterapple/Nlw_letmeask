import {Children, ReactNode} from 'react';
import cx from 'classnames';

import './styles.scss';

type QuestionProps = {
  
  
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode,
  isHighlighted?: boolean,
  isAnswered?: boolean, 
};

export function Question({
  content, 
  author, 
  children, 
  isHighlighted = false, 
  isAnswered = false 
}: QuestionProps) {
  return (
    <div className={cx('question',
    {answered : isAnswered},
    {highlighted : isHighlighted && !isAnswered}
    )}>
      <p>{content}</p>
      <footer className="user-info">
          <div>
            <img src={author.avatar} alt={author.name} />
            <span>{author.name}</span>
          </div>
          <div>{children}</div>
      </footer>
    </div>
  );
}
