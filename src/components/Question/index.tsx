import {Children, ReactNode} from 'react';

import './styles.scss';

type QuestionProps = {
  
  
  content: string;
  author: {
    name: string;
    avatar: string;
  };
};

export function Question({content, author }: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
      </footer>
    </div>
  );
}
