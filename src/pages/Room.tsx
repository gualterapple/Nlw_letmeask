import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";

import { useAuth } from "../hooks/useAuth";
import {
  getDatabase,
  push,
  ref,
  set,
} from "firebase/database";

import "../styles/room.scss";
import { Question } from "../components/Question";
import { UseRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();

  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState("");

  const { questions, title } = UseRoom(roomId);

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
          <RoomCode code={roomId} />
        </div>
      </header>

      <div className="main-room-page">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span className="quetions">{questions.length} pergunta(s)</span>}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          ></textarea>
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça o seu login</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
        <div className="question-lis">
          {questions.map(question => { 
            return (
              <Question
                key= { question.id }
                content={question.content}
                author={question.author}></Question>
              );
          })}
        </div>
      </div>
    </div>
  );
}

function updateStarCount(postElement: any, data: any) {
  throw new Error("Function not implemented.");
}
