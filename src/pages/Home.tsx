import { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, firebase } from '../services/firebase';

import { TesteContext } from '../App';

export function Home()
{

    const history = useHistory();
    const { value, setValue } = useContext(TesteContext);

    function handleCreateRoom()
    {
        var provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(result => {
            console.log(result);
            history.push('/rooms/new');
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
                <h1>{value}</h1>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input type="text"
                        placeholder="Digite o código da sala" />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}