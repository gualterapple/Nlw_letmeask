import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { FormEvent, useState } from 'react';
import { getDatabase, push, ref, set } from 'firebase/database';


export function NewRoom()
{

    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function  handleCreateRoom (event:FormEvent) {
     event.preventDefault();

     if(newRoom.trim() === '')
     return;

     const db = getDatabase();
     const roomListRef = ref(db, 'rooms');
     const newRoomRef = await push(roomListRef);
     set(newRoomRef, {
        title: newRoom,
        authorId: user?.id
     });

     history.push(`/rooms/${newRoomRef.key}`);


    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input type="text"
                        placeholder="Nome da sala" 
                        onChange={event=> {setNewRoom(event.target.value)}}
                        value={newRoom}/>
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}

