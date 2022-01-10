import { useEffect, useState } from "react";

import {getDatabase, onValue, push, ref, set, off} from "firebase/database";
import { useAuth } from "./useAuth";

type Question = {
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likeId: string | undefined;
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
    likes: Record<string, {
      authorId: string;
    }>
  }
>;

export function UseRoom(roomId: string)
{

    const { user } = useAuth();
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
                  likeCount: Object.values(value.likes ?? {}).length,
                  likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
                };
              }
            );
            setTitle(databaseRoom.title);
            setQuestions(parsedQuentions);
          },
          {
            onlyOnce: false,
          },
          
        );
        

      }, [roomId, user?.id]);

      return { questions, title }
}