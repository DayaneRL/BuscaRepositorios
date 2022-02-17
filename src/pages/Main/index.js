import React, {useState, useCallback, useEffect} from 'react';
import { FaGithub, FaPlus, FaSpinner, FaSearch, FaTrash, FaUser, FaBuilding } from 'react-icons/fa';
import {Div, Container, Form, SubmitButton, List, DeleteButton, Container1} from './styles';
import {Link} from 'react-router-dom';

import api from '../../services/api';

export default function Main(){

  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');

  //buscar
  useEffect(()=>{
    const repoStorage = localStorage.getItem('repos');

    if(repoStorage){
      setRepositorios(JSON.parse(repoStorage));
    }
  }, []);

  //salvar alterações
  useEffect(()=>{
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios]);

  const submit = useCallback((e)=>{
    e.preventDefault();

    async function submit(){
      setLoading(true);
      setAlert(null);
      try{

        if(newRepo === ''){
          throw new Error('Você precisa indicar um repositorio!');
        }

        const response = await api.get(`repos/${newRepo}`);

        const hasRepo = repositorios.find(repo => repo.name === newRepo);

        if(hasRepo){
          throw new Error('Repositorio duplicado');
        }
  
        const data = {
          name: response.data.full_name,
        }
    
        setRepositorios([...repositorios, data]);
        setNewRepo('');
      }catch(error){
        setAlert(true);
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
    <Div>
      <Container1>
        <Link to ="/user">
          <FaUser size={20}/>
          Busca por usuários
        </Link>
      </Container1>
      <Container1>
        <Link to ="/organizacao">
          <FaBuilding size={20}/>
          Busca por organizações
        </Link>
      </Container1>

    <Container>  

      <h1>
        <FaGithub size={25}/>
        Busca de Repositorios no Github
      </h1>

      <Form onSubmit={submit} error={alert}>
        <input 
        type="text" 
        placeholder="Adicionar Repositorios"
        value={newRepo}
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
    </Div>
  )
}