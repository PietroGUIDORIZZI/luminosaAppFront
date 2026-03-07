# ✨ Luminosa — Frontend React

Interface CRUD do Luminosa separada em camadas, pronta para integração com Java Spring Boot.

## 🏗️ Arquitetura em Camadas

```
src/
├── api/                    ← CAMADA 1: Comunicação HTTP
│   ├── client.js           # Fetch base — troca a BASE_URL aqui
│   ├── projectsApi.js      # Endpoints de Projetos
│   ├── tasksApi.js         # Endpoints de Tasks
│   └── sessionsApi.js      # Endpoints de Sessões
│
├── hooks/                  ← CAMADA 2: Estado e lógica de negócio
│   ├── useProjects.js      # Estado + CRUD de projetos
│   ├── useTasks.js         # Estado + CRUD + filtros de tasks
│   ├── useSessions.js      # Estado + CRUD de sessões
│   ├── useTimer.js         # Lógica do temporizador Pomodoro
│   └── useApiStatus.js     # Health check da API
│
├── context/                ← CAMADA 3: Estado global
│   ├── ThemeContext.jsx    # Dark / Light mode
│   └── ToastContext.jsx    # Notificações toast
│
├── components/             ← CAMADA 4: Componentes de UI
│   ├── common/             # Componentes reutilizáveis
│   │   ├── Badge.jsx
│   │   ├── StatCard.jsx
│   │   └── EmptyState.jsx
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── MobileNav.jsx
│   ├── projects/
│   │   ├── ProjectForm.jsx
│   │   ├── ProjectItem.jsx
│   │   └── ProjectList.jsx
│   ├── tasks/
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskFilters.jsx
│   │   └── TaskStats.jsx
│   └── sessions/
│       ├── PomodoroTimer.jsx
│       ├── SessionItem.jsx
│       ├── SessionList.jsx
│       └── SessionStats.jsx
│
├── pages/                  ← CAMADA 5: Páginas (orquestram tudo)
│   ├── TasksPage.jsx
│   ├── ProjectsPage.jsx
│   └── SessionsPage.jsx
│
├── App.jsx                 # Roteamento entre páginas
├── main.jsx                # Entry point
└── index.css               # Estilos globais
```

## 🔌 Integração com Spring Boot

### 1. Configure a URL da API

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8080/api
```

### 2. Endpoints esperados pelo frontend

| Recurso   | Método | Endpoint                      |
|-----------|--------|-------------------------------|
| Projetos  | GET    | `/api/projects`               |
| Projetos  | POST   | `/api/projects`               |
| Projetos  | PUT    | `/api/projects/{id}`          |
| Projetos  | DELETE | `/api/projects/{id}`          |
| Tasks     | GET    | `/api/tasks`                  |
| Tasks     | POST   | `/api/tasks`                  |
| Tasks     | PUT    | `/api/tasks/{id}`             |
| Tasks     | DELETE | `/api/tasks/{id}`             |
| Sessões   | GET    | `/api/sessions`               |
| Sessões   | POST   | `/api/sessions`               |
| Sessões   | PATCH  | `/api/sessions/{id}/complete` |
| Sessões   | DELETE | `/api/sessions/{id}`          |

### 3. Configure CORS no Spring Boot

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE");
            }
        };
    }
}
```

## 🚀 Como rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📦 Stack

- **React 18** com Hooks
- **Vite** como bundler
- **CSS puro** com variáveis CSS (sem biblioteca de UI)
- Sem dependências de roteamento (navegação manual por estado)
