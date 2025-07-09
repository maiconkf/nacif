# Docker Setup Guide

Este guia explica como usar Docker para executar a aplicação Todo.

## 📋 Pré-requisitos

- Docker Engine 20.10+
- Docker Compose 2.0+
- 4GB RAM disponível
- Porta 3000 e 8000 livres

## 🚀 Execução Rápida

### Desenvolvimento

```bash
# Usando script bash
./start.sh

# Ou usando Make
make dev

# Em background
make dev-bg
```

### Produção

```bash
# Usando script bash
./start-prod.sh

# Ou usando Make
make prod
```

## 📁 Estrutura dos Dockerfiles

### Frontend (`frontend/Dockerfile`)

- **Base**: Node.js 18 Alpine
- **Desenvolvimento**: Vite dev server com hot reload
- **Volumes**: Code mounting para development
- **Porta**: 3000

### Frontend Produção (`frontend/Dockerfile.prod`)

- **Build Stage**: Compila a aplicação
- **Production Stage**: Nginx para servir arquivos estáticos
- **Otimizações**: Gzip, cache headers, SPA routing
- **Porta**: 80

### Backend (`backend/Dockerfile`)

- **Base**: Python 3.11 Slim
- **Melhorias**: User não-root, health checks
- **Development**: Hot reload com uvicorn
- **Porta**: 8000

## 🐳 Comandos Docker

### Desenvolvimento

```bash
# Iniciar ambiente completo
docker-compose up --build

# Iniciar em background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar containers
docker-compose down

# Rebuild from scratch
docker-compose down --rmi all
docker-compose up --build
```

### Produção

```bash
# Iniciar produção
docker-compose -f docker-compose.prod.yml up -d

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f

# Parar produção
docker-compose -f docker-compose.prod.yml down
```

### Maintenance

```bash
# Limpar tudo
docker system prune -a

# Rebuild específico
docker-compose build frontend
docker-compose build backend

# Acessar container
docker-compose exec frontend sh
docker-compose exec backend bash
```

## ⚙️ Configurações

### Variáveis de Ambiente

#### Development (`docker-compose.yml`)

```yaml
# Backend
PYTHONPATH: /app
DATABASE_URL: sqlite:///./data/todos.db
DEBUG: true

# Frontend
CHOKIDAR_USEPOLLING: true
VITE_API_URL: http://localhost:8000
```

#### Production (`docker-compose.prod.yml`)

```yaml
# Backend
PYTHONPATH: /app
DATABASE_URL: sqlite:///./data/todos.db
DEBUG: false
ENVIRONMENT: production
```

### Volumes

#### Development

- `./backend:/app` - Code mounting para hot reload
- `./frontend:/app` - Code mounting para hot reload
- `/app/node_modules` - Anonymous volume para node_modules
- `backend_data:/app/data` - Persistência do banco

#### Production

- `backend_data:/app/data` - Apenas persistência do banco

### Health Checks

O backend inclui health check que verifica:

- Aplicação responde na porta 8000
- Endpoint `/docs` acessível
- Intervalo: 30s
- Timeout: 10s
- Retries: 3

## 🔧 Troubleshooting

### Problemas Comuns

1. **Porta em uso**

```bash
# Verificar processos usando as portas
lsof -i :3000
lsof -i :8000

# Parar containers existentes
docker-compose down
```

2. **Problemas de build**

```bash
# Rebuild sem cache
docker-compose build --no-cache

# Limpar Docker cache
docker system prune -a
```

3. **Frontend não atualiza**

```bash
# Verificar se CHOKIDAR_USEPOLLING está configurado
# Restart do container
docker-compose restart frontend
```

4. **Backend não conecta**

```bash
# Verificar logs
docker-compose logs backend

# Verificar health check
docker-compose ps
```

5. **Banco de dados perdido**

```bash
# Verificar volumes
docker volume ls

# Backup do volume
docker run --rm -v backend_data:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /data .
```

### Logs Úteis

```bash
# Logs em tempo real
docker-compose logs -f

# Logs específicos
docker-compose logs frontend
docker-compose logs backend

# Logs com timestamp
docker-compose logs -t
```

### Performance

#### Development

- Use volumes para hot reload
- `CHOKIDAR_USEPOLLING=true` para sistemas de arquivos virtuais
- Limite containers em background

#### Production

- Use multi-stage builds
- Nginx para servir estáticos
- Health checks para reliability
- User não-root para segurança

## 📊 Monitoramento

### Status dos Containers

```bash
# Via Make
make status

# Via Docker
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### Recursos

```bash
# Uso de recursos
docker stats

# Informações detalhadas
docker-compose top
```

## 🔐 Segurança

### Production Checklist

- ✅ User não-root nos containers
- ✅ Health checks configurados
- ✅ Volumes com dados sensíveis protegidos
- ✅ Nginx com headers de segurança
- ✅ Environment variables para secrets
- ⚠️ Configure SSL/TLS para produção real
- ⚠️ Use secrets manager para senhas

### Development Security

- Dados de desenvolvimento isolados
- Containers efêmeros
- Sem exposição de portas desnecessárias

## 🎯 URLs da Aplicação

### Development

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### Production

- **Frontend**: http://localhost (porta 80)
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🤝 Scripts Úteis

Todos os comandos estão disponíveis via Makefile:

```bash
make help  # Ver todos os comandos disponíveis
```
