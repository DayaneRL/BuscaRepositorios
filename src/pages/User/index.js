import React, {useState, useCallback, useEffect} from 'react';
import { FaUser, FaPlus, FaSpinner, FaSearch, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton} from '../../styles/styles';
import {Link} from 'react-router-dom';

import api from '../../services/api';


export default function User(){

    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');

    const submit = useCallback((e)=>{
        e.preventDefault();
    
        async function submit(){
          setLoading(true);
            try{
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        submit();
    
    }, [newRepo, repositorios]);

    function inputChange(e){
        setNewRepo(e.target.value);
        setAlert(null);
    }

    const Delete = useCallback((repo)=>{
    const find = repositorios.filter(res => res.name !== repo);
    setRepositorios(find);
    }, [repositorios]);    

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
            value={newRepo}
            onChange={inputChange}
            disabled
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
            {repositorios.map(repo =>(
            <li key={repo.name}>
                <span>
                <DeleteButton onClick={()=> Delete(repo.name)}>
                    <FaTrash size={14}/>
                </DeleteButton>
                {repo.name}
                </span>
                <Link to={`/repositorio/${encodeURIComponent(repo.name)}`} title="Visualizar Mais">
                <FaSearch size={20}/>
                </Link>
            </li>
            ))}
        </List>

        </Container>
    )
}