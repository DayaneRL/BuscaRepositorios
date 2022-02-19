import React, {useEffect, useState} from "react";
import { Container, Owner, Loading, BackButton,ReposList,PageAction,FilterList } from "../../styles/styles";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";

export default function Repositorio({match}){
    document.title = 'Organização'

    const [organizacao, setOrganizacao] = useState([]);
    const [repositorios, setRepositorios] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage,setLastPage] =useState(false);
    const [filters] = useState([
        {name: 'repos', label: 'repositorios', active: true},
        {name: 'members', label: 'membros', active: false},
        {name: 'public_members', label: 'mebros publicos', active: false},
    ])
    const [filterIndex, setFilterIndex] = useState(0);

    useEffect(()=>{
        async function load(){
            const nomeOrg = match.params.organizacao;
            const Data = await api.get(`/orgs/${nomeOrg}`);

            setOrganizacao({
                id: Data.data.id,
                name: Data.data.name,
                login: Data.data.login,
                avatar: Data.data.avatar_url,
                blog: Data.data.blog,
                location: Data.data.location
            });

            setLoading(false);
        }
        load();
    }, [match.params.organizacao]);

    useEffect(()=> {
        async function loadMore(){
            const nomeOrg = match.params.organizacao;

            if(filters[filterIndex].name==="repos"){
                const response = await api.get(`/orgs/${nomeOrg}/repos`,{
                    params:{
                        page,
                        per_page: 4,
                    }
                })
                setRepositorios(response.data);
                setMembers([]);
                if(response.data.length===0){  setLastPage(true);   }
            }else if(filters[filterIndex].name==="members"){
                const response = await api.get(`/orgs/${nomeOrg}/members`,{
                    params:{ page, per_page: 4, }
                })
                setMembers(response.data);
                setRepositorios([]);
            }else if(filters[filterIndex].name==="public_members"){
                const response = await api.get(`/orgs/${nomeOrg}/public_members`,{
                    params:{ page, per_page: 4, }
                })
                setMembers(response.data);
                setRepositorios([]);
            }
            
        }
        loadMore();
    }, [ filterIndex, filters, match.params.organizacao, page]);

    function handlePage(action){
        setPage(action === 'previous' ? page-1 : page+1);
    }
    function handleFilter(index){
        setFilterIndex(index);
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
            <BackButton to="/organizacao">
                <FaArrowLeft color="#000" size={30}/>
            </BackButton>
            <Owner>
                <img src={organizacao.avatar} alt={organizacao.login}/>
                <h1>{organizacao.name}</h1>
                <p>@{match.params.organizacao}</p>
                <p>{organizacao.blog}</p>
                <p>{organizacao.location}</p>
            </Owner>

            <ReposList>
                {/* <h2>  Repositorios:  </h2> */}
                <FilterList active={filterIndex}>
                    {filters.map((filter, index)=>(
                        <button key={filter.label} 
                                onClick={()=>handleFilter(index)}>
                            {filter.label}
                        </button>
                    ))}
                </FilterList>
                {repositorios.map(repos => (
                    <li key={String(repos.id)}>
                        <div>
                            <strong>
                                <a href={repos.html_url}>\{repos.name}</a>
                            </strong>
                            <p>{organizacao.login}</p>
                        </div>
                    </li>
                ))}
                 {members.map(member => (
                    <li key={String(member.id)}>
                            <img src={member.avatar_url} alt={member.login}/>
                        <div className="member">
                            <strong>
                                <a href={member.html_url}>{member.login}</a>
                            </strong>
                            <br/>
                            <p>{organizacao.login} {filters[filterIndex].name}</p>
                        </div>
                    </li>
                ))}
                {repositorios.length===0 && members.length===0 && (
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