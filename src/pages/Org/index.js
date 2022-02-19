import React, {useState, useCallback, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { FaBuilding, FaPlus, FaSpinner, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton} from '../../styles/styles';
import { toast } from 'react-toastify';

import api from '../../services/api';

export default function Org(){
    document.title = 'Busca Organização'
    
    const [newOrg, setNewOrg] = useState('');
    const [organizacoes, setOrganizacoes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');

    useEffect(()=>{
        const orgStorage = localStorage.getItem('orgs');
        if(orgStorage){
            setOrganizacoes(JSON.parse(orgStorage));
        }
    }, []);

    useEffect(()=>{
        localStorage.setItem('orgs', JSON.stringify(organizacoes));
    }, [organizacoes]);

    const submit = useCallback((e)=>{
        e.preventDefault();
    
        async function submit(){
            setLoading(true);
            try{
                if(newOrg === ''){
                    toast.error('Você precisa indicar uma organização!');
                    return;
                }
          
                const response = await (await api.get(`orgs/${newOrg}`) ).data;
                
                const hasOrg = organizacoes.find(org => org.login === response.login);
                if(hasOrg){
                    toast.error('Organização duplicada');
                    return;
                }
                
                const data = {
                    id: response.id,
                    name: response.name,
                    login: response.login,
                    avatar: response.avatar_url
                }
                setOrganizacoes([...organizacoes, data]);
                toast.success(response.login + ' adicionado com sucesso.');
                setNewOrg('');
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
    
    }, [newOrg, organizacoes]);

    function inputChange(e){
        setNewOrg(e.target.value);
        setAlert(null);
    }

    const Delete = useCallback((org)=>{
    const find = organizacoes.filter(o => o.id !== org);
    setOrganizacoes(find);
    }, [organizacoes]);    

    return(
        <Container>  
             <Link to="/">
                <FaArrowLeft color="#000" size={25}/>
            </Link>
            <br/><br/>

            <h1>
                <FaBuilding size={25}/>
                Busca de Organizações no Github
            </h1>

            <Form onSubmit={submit} error={alert}>
                <input 
                type="text" 
                placeholder="Adicionar Organizações"
                value={newOrg}
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
                {organizacoes.map(org =>(
                <li key={org.id}>
                    <Link to={`/organizacao/${org.login}`} title="Visualizar Mais">
                    <div>
                        <img src={org.avatar} alt={org.login}/>
                        <h3>{org.name}</h3>
                        @<p>{org.login}</p>
                    </div>
                    
                    </Link>
                    <DeleteButton onClick={()=> Delete(org.id)}>
                        <FaTrash size={14}/>
                    </DeleteButton>
                </li>
                ))}
            </List>

        </Container>
    )
}