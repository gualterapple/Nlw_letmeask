import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { FormEvent, useState } from 'react';
import { getDatabase, ref } from '@firebase/database';
import { child, get, push, set } from 'firebase/database';

export function Home()
{
    
    const history = useHistory();
    const {user, signInWithGoogle} = useAuth();
    const[roomCode, setRoomCode] = useState('');

    async function handleCreateRoom()
    {
        if(!user)
        await signInWithGoogle();
        history.push('/rooms/new');
    }

    function handleJoinRoom(event:FormEvent)
    {
        event.preventDefault();
        if(roomCode.trim() === '')
        return;

        const dbRef = ref(getDatabase());
        get(child(dbRef, `rooms/${roomCode}`)).then((snapshot) => {

        if(snapshot.val().endedAt){
            alert('Room already closed');
            return;
        }

        if (snapshot.exists()) {
            history.push(`/rooms/${roomCode}`);
        } else {
            console.log("Room does not exists");
        }
        }).catch((error) => {
        console.error(error);
        });

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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input type="text"
                        placeholder="Digite o código da sala" 
                        value={roomCode}
                        onChange={event => setRoomCode(event.target.value)}/>
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}


