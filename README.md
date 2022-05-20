# challenge-library

Teste para Dev Fullstack na Ag.Begin

## Requisitos

**Segue Teste para a alocação de vaga: Dev Fullstack.**

**Modelo de negócio:**
Sistema de doação de livros para sebos e instituição de caridade.

Para essa tarefa, o que você deve fazer é adicionar, remover e editar livros da instituição de caridade.

Não tem limite de quantidade de livros que uma instituição pode ter.

Para cadastrar uma instituição, será necessário os seguintes dados:

- Nome da instituição (único)
- Endereço completo e preciso
- Administrador da instituição

Cadastrar livro será necessário:

- Nome do livro
- Edição
- Ano
- Data de lançamento
- Estado:
  - novo
  - usado
  - danificado
- Instituição
- Quantidade em estoque
- Endereço que encontra-se o livro
- Não pode cadastrar os mesmos livros

Editar livro:

- Edição
- Estado
- Instituição

Cadastrar administrador da instituição:

- Nome
- E-mail (único)
- Usuário (único)
- Senha (mínimo 8 dígitos e máximo 32)

Ao cadastrar, enviar mensagem de boas-vindas para o email dele e ativar a conta.

Editar administrador da instituição:

- Nome
- E-mail
- Senha

- Alteração de e-mail, solicitando uma confirmação, e após o confirmo, enviar uma notificação ao antigo e-mail sobre tal alteração, com a possibilidade de recuperação de senha.
- Deletar administrador da instituição;
- Cliente pode adquirir um ou mais livros se disponível.
- Toda o projeto será desenvolvido em TypeScript, React, utilizando Node.JS e Next.JS. Express para criação de rotas API com ORM Prisma e banco relacional PostgreSQL.
- Recomendamos configurar o Hustky com ESlint e Prettier; fazer commits utilizando o padrão Conventional Commits do angular convention.
- Todos os testes pode ser feito diretamente no Insomnia ou Postman.
- Fazer Deploy do sistema em uso na Vercel.
- Fazer uma documentação do sistema no Git é de bom grado.
- Se possível, fazer teste de integração/unitário com Jest.

O teste é deverá ser concluído em até 7 dias, você deverá posta no GitHub e nos notificar via e-mail após a conclusão.
Good Job :D

## Executar:

```bash
$ git clone https://github.com/DenisMedeirosSDK/challenge-library

$ cd challenge-library

$ npm install
```

Crie um arquivo `.env` igual ao `.env.example`

Crie um banco de dados com docker, ou use uma URL valida para postgresql

`docker run --name library -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

```bash
$ npm run test

$ npm run dev
```
