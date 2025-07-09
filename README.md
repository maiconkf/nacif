# Modern Todo Application

Uma aplicação todo moderna e clean construída com React 19, TanStack Router, TanStack Form, TanStack Query e FastAPI.

## 🚀 Tecnologias

### Frontend

- **React 19** - Última versão do React com recursos modernos
- **TanStack Router** - Roteamento file-based type-safe
- **TanStack Form** - Gerenciamento de formulários com validação
- **TanStack Query** - Gerenciamento de estado do servidor
- **Zustand** - Gerenciamento de estado global leve
- **Tailwind CSS** - Framework CSS utilitário para design moderno
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápido e moderno

### Backend

- **FastAPI** - Framework Python moderno e rápido
- **SQLAlchemy** - ORM para banco de dados
- **JWT** - Autenticação baseada em tokens
- **SQLite** - Banco de dados leve para desenvolvimento
- **Python 3.11** - Versão moderna do Python

## 🏗️ Arquitetura

### Frontend Architecture

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── Header.tsx      # Header com navegação e logout
│   ├── LoginForm.tsx   # Formulário de login com TanStack Form
│   ├── TodoForm.tsx    # Formulário para criar todos
│   ├── TodoItem.tsx    # Item individual de todo
│   ├── TodoList.tsx    # Lista de todos com filtros
│   └── LoadingSpinner.tsx # Spinner de loading
├── hooks/              # Hooks customizados
│   └── useAuth.ts      # Hook para gerenciamento de autenticação
├── routes/             # Rotas file-based
│   ├── __root.tsx      # Layout raiz
│   ├── index.tsx       # Página inicial (redireciona)
│   ├── login.tsx       # Página de login
│   └── todos.tsx       # Página principal dos todos
├── services/           # Serviços e API clients
│   ├── api.ts          # Cliente API com TanStack Query
│   └── auth-interceptor.ts # Interceptor para redirecionamento 401
├── types/              # Definições de tipos TypeScript
│   └── todo.ts         # Tipos para Todo, User, etc.
└── styles.css          # Estilos globais
```

### Backend Architecture

```
backend/
├── app/
│   ├── __init__.py
│   ├── auth.py         # Autenticação JWT
│   ├── config.py       # Configurações
│   ├── database.py     # Modelos SQLAlchemy
│   ├── routes.py       # Endpoints API
│   ├── schemas.py      # Schemas Pydantic
│   └── validators.py   # Validações customizadas
├── main.py             # Ponto de entrada da aplicação
└── requirements.txt    # Dependências Python
```

## ✨ Funcionalidades

### ✅ Implementadas

- **Autenticação JWT** - Login/logout seguro
- **CRUD de Todos** - Criar, ler, atualizar e deletar todos
- **Filtros** - Visualizar todos, ativos ou completados
- **Edição inline** - Editar todos diretamente na lista
- **Estados de loading** - Feedback visual para operações assíncronas
- **Tratamento de erros** - Mensagens de erro amigáveis
- **Design responsivo** - Funciona em desktop e mobile
- **Validação de formulários** - Validação client-side e server-side
- **Otimistic updates** - Updates otimistas para melhor UX

### � React 19 Features

- **Concurrent Features** - Renderização concorrente
- **Automatic Batching** - Batching automático de atualizações
- **useTransition** - Transições não-bloqueantes
- **Modern Hooks** - Hooks otimizados do React 19

### 📊 TanStack Query Features

- **Cache inteligente** - Cache automático com invalidação
- **Background refetching** - Refetch em background
- **Optimistic updates** - Updates otimistas
- **Error boundaries** - Tratamento de erros
- **DevTools** - Ferramentas de desenvolvimento

### 📋 TanStack Form Features

- **Validação em tempo real** - Validação conforme o usuário digita
- **Type safety** - Tipagem completa dos formulários
- **Field-level validation** - Validação por campo
- **Form state management** - Gerenciamento de estado do formulário

### 🎯 TanStack Router Features

- **File-based routing** - Rotas baseadas em arquivos
- **Type-safe navigation** - Navegação com tipos
- **Code splitting** - Divisão automática de código
- **Route guards** - Proteção de rotas
- **DevTools** - Ferramentas de desenvolvimento

## 🚀 Como executar

### Pré-requisitos

- Node.js 20+
- Python 3.11+
- npm ou yarn

### Desenvolvimento Local

1. **Clone o repositório**

```bash
git clone https://github.com/maiconkf/nacif.git
cd nacif-test
```

2. **Execute com Docker (Recomendado)**

```bash
./start.sh
```

3. **Ou execute manualmente:**

Backend:

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

### URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 🔐 Autenticação

A aplicação usa autenticação JWT com usuários pré-criados:

| Username | Password    |
| -------- | ----------- |
| admin    | admin123    |
| user1    | password123 |
| test     | test123     |

## 🎨 Design System

A aplicação segue um design system moderno e clean:

- **Cores**: Paleta neutra com azul como cor primária
- **Tipografia**: Inter/System fonts para legibilibilidade
- **Componentes**: Design consistente com Tailwind CSS
- **Animações**: Transições suaves e microinterações
- **Responsividade**: Mobile-first design

## 📱 Experiência do Usuário

### Estados da Aplicação

1. **Loading States** - Spinners e skeletons durante carregamento
2. **Empty States** - Mensagens amigáveis quando não há dados
3. **Error States** - Tratamento elegante de erros
4. **Success States** - Feedback positivo para ações bem-sucedidas

### Microinterações

- Animações suaves nos botões
- Transições entre estados
- Hover effects consistentes
- Focus states acessíveis

### Performance

- Otimizações do React 19
- Cache inteligente com TanStack Query

## 📦 API Endpoints

- `POST /login` - Autenticação do usuário
- `GET /todos` - Buscar todos do usuário
- `POST /todos` - Criar novo todo
- `GET /todos/{id}` - Buscar todo específico
- `PUT /todos/{id}` - Atualizar todo
- `DELETE /todos/{id}` - Deletar todo

## 🧪 Testes

```bash
# Frontend
cd frontend
npm run test

# Lint
npm run lint

# Format
npm run format
```

## 🔧 Configuração

### Variáveis de Ambiente

#### Backend (.env)

```env
DATABASE_URL=sqlite:///./todos.db  # Para desenvolvimento
SECRET_KEY=your-secret-key-here
ENVIRONMENT=development
```

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000  # Para desenvolvimento
```

#### Produção (Netlify)

```env
VITE_API_URL=https://mere-hornet-nacif-2b03f653.koyeb.app
```

#### Produção (Koyeb)

```env
DATABASE_URL=sqlite:///./todos.db
SECRET_KEY=sua-chave-secreta-aqui
ENVIRONMENT=production
FRONTEND_URL=https://your-app.netlify.app
```

## 📁 Arquivos de Configuração

### Netlify

- `netlify.toml` - Configuração de build e redirects para SPA
- `.env` - Variáveis de ambiente para desenvolvimento

### Koyeb

- `Procfile` - Configuração de processo para deploy

### Docker

- `Dockerfile` - Container para desenvolvimento (Node.js 20)
- `.dockerignore` - Arquivos ignorados no build do Docker

## 🔒 Segurança

### Autenticação

- JWT tokens com expiração
- Redirecionamento automático em caso de token inválido
- Limpeza automática de dados de autenticação

### API

- CORS configurado adequadamente
- Validação de entrada com Pydantic
- Headers de autenticação em todas as requisições protegidas

## 📦 Build e Deploy

### Frontend

```bash
cd frontend
npm run build  # Gera build otimizado na pasta dist/
```

### Backend

```bash
# Para Koyeb, use o Procfile incluído
# Para Docker:
docker build -t todo-backend ./backend
```

## 🐳 Docker

### Frontend

```bash
cd frontend
docker build -t todo-frontend .
docker run -p 3000:3000 todo-frontend
```

### Backend

```bash
cd backend
docker build -t todo-backend .
docker run -p 8000:8000 todo-backend
```
