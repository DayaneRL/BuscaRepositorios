import React, {useEffect, useState} from "react";
import { Container, Owner, Loading, BackButton,ReposList,PageAction } from "../../styles/styles";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";

export default function Repositorio({match}){
    document.title = 'Usuário'

    const [usuario, setUsuario] = useState([]);
    const [repositorios, setRepositorios] = useState({});
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage,setLastPage] =useState(false);

    useEffect(()=>{
        async function load(){
            const nomeUser = match.params.user;
            const [Data, Repositorios] = await Promise.all([
                api.get(`/users/${nomeUser}`),
                api.get(`/users/${nomeUser}/repos`, {
                    params:{
                        per_page: 4
                    }
                })
            ]);

            setUsuario({
                id: Data.data.id,
                name: Data.data.name,
                login: Data.data.login,
                avatar: Data.data.avatar_url,
                bio: Data.data.bio
            });
            setRepositorios(Repositorios.data);

            setLoading(false);
        }
        load();
    }, []);

    useEffect(()=> {
        async function loadRepos(){
            const nomeUser = match.params.user;
            const response = await api.get(`/users/${nomeUser}/repos`,{
                params:{
                    page,
                    per_page: 4,
                }
            })
            if(response.data.length ==0){
                console.log('vazio');
                setLastPage(true);
            }
            setRepositorios(response.data);
        }
        loadRepos();
    }, [match.params.user, page]);

    function handlePage(action){
        setPage(action === 'previous' ? page-1 : page+1);
    }

    if(loading){
        return(
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    return(
        <Container>
            <BackButton to="/user">
                <FaArrowLeft color="#000" size={30}/>
            </BackButton>
            <Owner>
                <img src={usuario.avatar} alt={usuario.login}/>
                <h1>{usuario.name}</h1>
                <p>@{match.params.user}</p>
                <p>{usuario.bio}</p>
            </Owner>

            <ReposList>
                <h2>  Repositorios:  </h2>
                {repositorios.map(repos => (
                    <li key={String(repos.id)}>
                        <div>
                            <strong>
                                <a href={repos.html_url}>{repos.name}</a>
                            </strong>
                            <p>{usuario.login}</p>
                        </div>
                    </li>
                ))}
                {repositorios.length==0 && (
                    <p>Nenhum item encontrado.</p>
                )}
                <PageAction>
                    <button type="button" onClick={()=>handlePage('previous')} disabled={page<2}>
                        Anterior
                    </button>
                    <button type="button" onClick={()=>handlePage('next')} disabled={lastPage}>Próximo</button>
                </PageAction>
                
            </ReposList>
        </Container>

    )
}