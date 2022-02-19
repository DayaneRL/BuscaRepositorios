import React, {useEffect, useState} from "react";
import { Container,Owner,Loading, BackButton,IssuesList,PageAction,FilterList } from "./styles";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";

export default function Repositorio({match}){
    document.title = 'Repositorios';

    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState([
        {state: 'all', label: 'Todas', active: true},
        {state: 'open', label: 'Abertas', active: false},
        {state: 'closed', label: 'Fechadas', active: false},
    ])
    const [filterIndex, setFilterIndex] = useState(0);

    useEffect(()=>{
        async function load(){
            const nomeRepo = decodeURIComponent(match.params.repositorio);

            // const response = await api.get(`/respos/${nomeRepo}`);
            // const issue = await api.get(`/repos/${nomeRepo}/issues`);
            const [Data, Issues] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params:{
                        state: filters.find(f=> f.active).state, //all
                        per_page: 5
                    }
                })
            ]);

            setRepositorio(Data.data);
            setIssues(Issues.data);

            setLoading(false);
        }
        load();
    }, []);

    useEffect(()=> {

        async function loadIssue(){
            const nomeRepo = decodeURIComponent(match.params.repositorio);

            const response = await api.get(`/repos/${nomeRepo}/issues`,{
                params:{
                    state:  filters[filterIndex].state,
                    page,
                    per_page: 5,
                }
            })

            setIssues(response.data);
        }

        loadIssue();
    }, [filterIndex, filters, match.params.repositorio, page]);

    function handlePage(action){
        setPage(action === 'previous' ? page-1 : page+1);
        console.log(page);
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
            <BackButton to="/">
                <FaArrowLeft color="#000" size={30}/>
            </BackButton>
            <Owner>
                <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login}/>
                <h1>{repositorio.name}</h1>
                <p>{repositorio.description}</p>
            </Owner>

            {issues.length > 0 ? 
            (
            <IssuesList>
                <h2>  Issues:  </h2>
                <FilterList active={filterIndex}>
                    {filters.map((filter, index)=>(
                        <button key={filter.label} 
                                onClick={()=>handleFilter(index)}>
                            {filter.label}
                        </button>
                    ))}
                </FilterList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login}/>

                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>

                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>{label.name}</span>
                                ))}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssuesList>

            ):( <IssuesList>
                <h2>  Issues:  </h2>
                <p>Nenhum item encontrado.</p>
                </IssuesList>)}

            {issues.length > 0 ? 
            (
                <PageAction>
                    <button type="button" onClick={()=>handlePage('previous')} disabled={page<2}>
                        Anterior
                    </button>
                    <button type="button" onClick={()=>handlePage('next')}>Próximo</button>
                </PageAction>
            ):(<></>)}
        </Container>
    )
}