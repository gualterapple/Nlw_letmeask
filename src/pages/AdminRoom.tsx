import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";

import { useAuth } from "../hooks/useAuth";
import {
  getDatabase,
  push,
  ref,
  remove,
  set,
} from "firebase/database";

import "../styles/room.scss";
import { Question } from "../components/Question";
import { UseRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();

  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState("");

  const { questions, title } = UseRoom(roomId);

  async function handleOnDeleteQuestion(questionId: string)
  {
    if(window.confirm('Tem certeza que dejesa excluir esta pergunta?'))
    {
      const db = getDatabase();
      const newLike = ref(db, `rooms/${roomId}/quetions/${questionId}`);
      await remove(newLike);
    }
    
  }

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") return;

    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    const db = getDatabase();
    const roomListRef = ref(db, `rooms/${roomId}/quetions`);
    const newQuestionRef = await push(roomListRef);
    set(newQuestionRef, question);

    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <div className="main-room-page">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span className="quetions">{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.map(question => { 
            return (<Question
            key= { question.id }
            content = { question.content }
            author = { question.author }>
              <button
              type="button"
              onClick={()=> handleOnDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="Ver pergunta" />
              </button>
            </Question>);
          })}
        </div>
      </div>
    </div>
  );
}

