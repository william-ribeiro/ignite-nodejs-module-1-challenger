# ignite-nodejs-module-2-challenger
<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/william-ribeiro/ignite-nodejs-module-2-challenger?color=%2304D361">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/william-ribeiro/ignite-nodejs-module-2-challenger">
  <a href="https://github.com/william-ribeiro/ignite-nodejs-module-2-challenger/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/william-ribeiro/ignite-nodejs-module-2-challenger">
  </a>    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
  <a href="http://commitizen.github.io/cz-cli/">
    <img alt="Commitizen" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg"> 
    </a>
  <a href="https://www.rocketseat.com.br/">
    <img alt="Rocketseat" src="https://img.shields.io/badge/Rocketseat-%237159c1?style=flat&logo=ghost">
    </a>    
  <a href="https://github.com/william-ribeiro/ignite-nodejs-module-2-challenger/stargazers">
  <a href="https://www.codefactor.io/repository/github/william-ribeiro/ignite-nodejs-module-2-challenger"><img src="https://www.codefactor.io/repository/github/william-ribeiro/ignite-nodejs-module-2-challenger/badge" alt="CodeFactor" /></a>
    <img alt="Stargazers" src="https://img.shields.io/github/stars/william-ribeiro/ignite-nodejs-module-1?style=social">
  </a>

  <div align="center" style="margin-bottom: 20px;">
<img src="https://hubsystems.s3.sa-east-1.amazonaws.com/wp-content/uploads/2023/07/15215150/63c83ebeef5ea2f341f3dd4c_OG-perpetuo.jpg" alt="" width="700" height="250"/>
</div>

</p>

<h4 align="center"> 
	🚧  Formação NodeJS - Modulo 2 🚧
</h4>

<p align="center">
 <a href="#-sobre-o-desafio">Sobre</a> •
 <a href="#%EF%B8%8F-funcionalidades">Funcionalidades</a> • 
 <a href="#-regras-de-negocio">Regras de negócio</a> • 
 <a href="#-extras">Extras</a> •  
 <a href="#-autor">Autor</a> • 
 <a href="#user-content--licença">Licença</a>
</p>

## 💻 Sobre o desafio

🚀 Nesse desafio desenvolveremos uma API para controle de dieta diária, a Daily Diet API. - [Link](https://efficient-sloth-d85.notion.site/Desafio-02-be7cdb37aaf74ba898bc6336427fa410) .

---

## ⚙️ Funcionalidades

A API deve conter as seguintes funcionalidades:

- Criação de usuário
- Identificação do usuário pelo `id`
- Registro, edição, remoção de refeição
- Listagem de todas as refeições de um usuário
- Listagem de uma unica refeição  de um usário pelo `id` da refeição
- Métricas de um usário pelo `id`

---

## 🚧 Regras de negocio

- Deve ser possível criar um usuário
- Deve ser possível identificar o usuário entre as requisições
- Deve ser possível registrar uma refeição feita, com as seguintes informações:

    *As refeições devem ser relacionadas a um usuário.*

    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta
- Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- Deve ser possível apagar uma refeição
- Deve ser possível listar todas as refeições de um usuário
- Deve ser possível visualizar uma única refeição
- Deve ser possível recuperar as métricas de um usuário
    - Quantidade total de refeições registradas
    - Quantidade total de refeições dentro da dieta
    - Quantidade total de refeições fora da dieta
    - Melhor sequência de refeições dentro da dieta
- O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

---

## 🚀 Como executar o projeto

Clone este repositório:

```console
git clone git@github.com:william-ribeiro/ignite-nodejs-module-2-challenger.git
```

Acesse a pasta do projeto no terminal/cmd:

```console
cd ignite-nodejs-module-2-challenger
```

Renomeie os arquivos .env.example e .env.test.example

```console
.env
.env.test
```

*Não esqueça de preencher com as suas variáveis de ambiente*

Instale as dependencias do projeto com npm

```console
npm install
```

Se preferir usar yarn ou pnpm

```console
yarn install | pnpm install
```

#### Acesse o endpoint para testar a API

http://localhost:PORT/
*PORT é a porta do arquivo .env*

<p align="center">
  <a href="https://github.com/william-ribeiro/ignite-nodejs-module-2-challenger/blob/main/colletion_insomnia.yaml" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

---

## 🛠 Extras

É comum ao estar desenvolvendo uma API, imaginar como esses dados vão estar sendo utilizados pelo cliente web e/ou mobile.

Por isso, deixamos abaixo o [Link](https://www.figma.com/community/file/1218573349379609244) . para o layout da aplicação que utilizaria essa API.

---

## 🦸 Autor

<a href="https://github.com/william-ribeiro/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/60985185?s=460&u=389f6878e2b972d3f66348a698c7ecfbbb245582&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>William Ribeiro</b></sub></a>
 <sub><a href="https://linktr.ee/william_ribeiro/" title="portifolio">🚀 <b>Portifólio</b></a></sub>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-William-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/william-ribeiro-0b5ab911a/)](https://www.linkedin.com/in/william-ribeiro-0b5ab911a/)
[![WhatsApp Badge](https://img.shields.io/badge/-Entrar%20em%20Contato-c14438?style=flat-square&color=075e54&logo=whatsapp&logoColor=white&link=https://api.whatsapp.com/send?phone=5553991274353)](https://api.whatsapp.com/send?phone=5553991274353)

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

---