# Projeto de busca de repositorios no Github com ReactJS

Esse projeto é feito usando a API do github https://api.github.com

## Como funciona

Ao rodar o projeto, ele exibe uma tela em que se pode pesquisar um repositório existente, usuário ou organização.
Os dados irão ficar salvo no Local Storage.
Esse projeto foi baseado no curso "React Js do zero ao avançado na pratica" da Udemy.

### Busca por repositórios

### `username/repositorio`

A busca é baseado no "repository_url": "https://api.github.com/repos/{owner}/{repo}".<br/>
Deve ser feita seguindo a ordem "usuario/nomerepositorio" como por exemplo: "DayaneRL/BuscaRepositorios" ou "facebook/react".
Após aparecer na listagem, poderá ser excluído ou ver mais informações, listando também algumas issues.
Possui um filtro de todas issues (pré selecionado), issues abertas e issues fechadas.

### Busca por usuários

### `username`

A busca é baseado no "user_url": "https://api.github.com/users/{user}".<br/>
Deve ser feita somente com o nome de usuário, como por exemplo: "DayaneRL" ou "facebook".
Ao clicar no usuário, ele busca mais dados do mesmo, como: Nome, login, bio, imagem de perfil e os repositórios públicos.

### Busca por organização

### `organização`

A busca é baseado no "organization_url": "https://api.github.com/orgs/{org}".<br/>
Deve ser feita somente com o nome da organização, como por exemplo: "angular" ou "facebook".
Ao clicar na organizaçõa, ele busca mais dados do mesmo, como: Nome, login, blog, localização e imagem de perfil.
Possui um filtro de repositórios públicos (pré selecionado), membros e membros públicos.


## Testar

<p align="center"> Link heroku para visualização <a href="https://busca-repositorios-github.herokuapp.com/">Heroku Busca de Repositorios</a> </p>
