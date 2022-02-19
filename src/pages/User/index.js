import {Link} from 'react-router-dom';
import React, {useState, useCallback, useEffect} from 'react';

import { FaUser, FaPlus, FaSpinner, FaSearch, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton} from '../../styles/styles';
import { toast } from 'react-toastify';

import api from '../../services/api';


export default function User(){
    document.title = 'Busca Usuários';

    const [newUser, setNewUser] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(()=>{
        const userStorage = localStorage.getItem('users');
        if(userStorage){
            setUsuarios(JSON.parse(userStorage));
        }
    }, []);

    useEffect(()=>{
        localStorage.setItem('users', JSON.stringify(usuarios));
    }, [usuarios]);

    const submit = useCallback((e)=>{
        e.preventDefault();
    
        async function submit(){
          setLoading(true);
            try{
                if(newUser === ''){
                    toast.error('Você precisa indicar um usuário!');
                    return;
                }
          
                const response = await (await api.get(`users/${newUser}`) ).data;

                const hasUser = usuarios.find(user => user.login === response.login);
                if(hasUser){
                    toast.error('Usuario duplicado');
                    return;
                }
                
                const data = {
                    id: response.id,
                    name: response.name,
                    login: response.login,
                    avatar: response.avatar_url
                }
                setUsuarios([...usuarios, data]);
                toast.success(response.login + ' adicionado com sucesso.');
                setNewUser('');
            }catch(error){
                setAlert(true);
                if(error.response.data.message=="Not Found"){
                    toast.error('Não encontrado.');
                } else if(error){
                    toast.error('Algo deu errado!');
                }
            }finally{
                setLoading(false);
            }
        }
        submit();
    
    }, [newUser, usuarios]);

    function inputChange(e){
        setNewUser(e.target.value);
        setAlert(null);
    }

    const Delete = useCallback((id_user)=>{
        const find = usuarios.filter(u => u.id !== id_user);
        setUsuarios(find);
    }, [usuarios]);    

    return(
        <Container>  
            <Link to="/">
                <FaArrowLeft color="#000" size={25}/>
            </Link>
        <br/><br/>
        <h1>
            <FaUser size={25}/>
            Busca de Usuarios no Github
        </h1>

        <Form onSubmit={submit} error={alert}>
            <input 
            type="text" 
            placeholder="Adicionar Usuarios"
            value={newUser}
            onChange={inputChange}
            />

            <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
                <FaSpinner color="#FFF" size={14}/>
            ) : (
                <FaPlus color="#FFF" size={14}/>
            )}
            </SubmitButton>

        </Form>

        <List>
            {usuarios.map(user =>(
            <li key={user.id}>
                <Link to={`/user/${user.login}`} title="Visualizar Mais">
                    <div>
                        <img src={user.avatar} alt={user.login}/>
                        <h3>{user.name}</h3>
                        @<p>{user.login}</p>
                    </div>
                </Link>
                <DeleteButton onClick={()=> Delete(user.id)}>
                    <FaTrash size={14}/>
                </DeleteButton>
            </li>
            ))}
        </List>

        </Container>
    )
}