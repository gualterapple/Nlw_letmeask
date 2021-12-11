import { useEffect, useState } from "react";


import {
    getDatabase,
    onValue,
    push,
    ref,
    set,
  } from "firebase/database";

type Question = {
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  };

  type FireBaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

export function UseRoom(roomId: string)
{
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const db = getDatabase();
        return onValue(
          ref(db, "/rooms/" + roomId),
          (snapshot) => {
            const databaseRoom = snapshot.val();
            const firebaseQuestions: FireBaseQuestions =
              databaseRoom.quetions ?? {};
            const parsedQuentions = Object.entries(firebaseQuestions).map(
              ([key, value]) => {
                return {
                  id: key,
                  content: value.content,
                  author: value.author,
                  isHighlighted: value.isHighlighted,
                  isAnswered: value.isAnswered,
                };
              }
            );
            setTitle(databaseRoom.title);
            setQuestions(parsedQuentions);
          },
          {
            onlyOnce: false,
          }
        );
      }, [roomId]);

      return { questions, title }
}