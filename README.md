## 🐾 Animal Donation API

Esta API permite o gerenciamento de adoção de animais, com funcionalidades para cadastrar, listar e atualizar o status dos animais. É construída usando Java 21 com Spring Boot 3.3.4.

<hr>

## 📋 Funcionalidades

- [x] **Cadastro de Animais**: Registre animais com informações básicas.
- [x] **Listagem de Animais**: Consulte animais disponíveis para adoção e já adotados.
- [x] **Atualização de Status**: Altere o status do animal (Adotar / Adotado).
- [x] **API REST**: Comunicação entre o **frontend** e **backend**.

<hr>
  

## 📦 Estrutura do Projeto
  
 ```bash
/Animai-donation
├── backend/
|	├── main/
|	│   ├── java/com/felipesouls/
|	|   |   ├── config                      # Configurações do servidor (SWAGGER).
|	│   │   ├── controllers                 # Controladores REST.
|	│   │   ├── entities                    # Entidades JPA.
|	|   |   ├── exceptions                  # Exceções personalizadas.
|	|   |	├── DTO                         # DTO reproduzir resp/env customizados.
|	|   |   ├── records                     # Bodys customizados.
|	│   │   ├── repositories                # Repositórios JPA.
|	│   │   ├── services                    # Serviços de negócio.
|	│   └── resources/
|	│       └── application.properties      # Configurações da aplicação.
|	|	└── application-test.properties # Perfil de test com banco H2.
|	|	└── import.sql                  # Inicilalização do banco de dados.
|	|
|	└── test/                              # Testes unitários.
|	    ├── factories                      # Fabricas para enditadades de teste.
|	    ├── repositories                   # Testes de repository.
|	    ├── servives                       # Testes de unidade da camada Service.
|
├──frontend/
│  └── src/ 
│      ├── components/                     # Componentes React
│      └── services/                       # Serviços de consumo da API 
└── docker-compose.yml                     # Config do Docker para back e front
└── EU                                     # Descrição do projeto o melhor.
```  

<hr>
  

## ⚙️ Como Executar

Pré-requisitos

- Docker está installado.

 Para caso queira rodar independente é necessário.

- **Node.js** instalado
- **Java 21** e **Maven** instalados
- **Docker** (opcional) para rodar containers
- **Postman** para testar a API (opcional)

<hr>
   
Passo 1: Clonar o Repositório

```bash
git clone https://github.com/felipesousasilva/adocao-animais.git

cd adocao-animais
```
  
<hr>


## 🐳 Docker (PRINCiPAL)

### Executar Backend e Frontend com Docker:

1. **Build das imagens**:

```bash
docker-compose
```

2. **Iniciar os containers**:

```bash
`docker-compose up
```

### Passo 2: Executar o Backend

 1 - **Acesse a pasta do backend:**
```bash
cd backend
```

2 - **Configuração do Banco de Dados:**
		- Por padrão, a aplicação usa H2 como banco de dados em memória.Se quiser usar MySQL ou PostgreSQL, configure um novo perfil.

3 - **Executar a aplicação (Terminal)**:
```bash
./mvnw spring-boot:run
```
  
  4- Acessando a Documentação Swagger:
	Após a execução, acesse:
	http://localhost:8080/swagger-ui/index.html

<hr>

Passo 3: Executar o Frontend

1. **Acesse a pasta do frontend**:
```bash
cd frontend
```
2. **Instalar as dependências**:
```bash
npm install
```
3. **Iniciar a aplicação**:
```bash
npm run dev
```
4. Acesse o frontend em:  
	http://localhost:3000

<hr>

## 🔗 Comunicação entre Frontend e Backend

### Configuração da API no Frontend

No arquivo `frontend/src/services/AnimalService.js`:

```javascript
import axios from 'axios';
import { Animal } from '../model/Animal';

 
const API_URL = 'http://localhost:8080/animals';

export const fetchAnimals = async (): Promise<Animal[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addAnimal = async (newAnimal: Animal): Promise<Animal> => {
    const response = await axios.post(API_URL, newAnimal);
    return response.data;
};


```

<hr>

## 📄 Exemplos de Endpoints


1. **Listar Animais**
	`GET /animals`

2. Cadastrar Animal
	`POST /animals`

```json
{
  "name": "Buddy",
  "description": "Um golden retriever amigável.",
  "imageUrl": "https://example.com/images/buddy.jpg",
  "category": "Cachorro",
  "birthDate": "2019-04-15",
  "status": "AVAILABLE"
}
```

3. **Atualizar Status**
	`PATCH /animals/{id}/{status}

<hr>

## 🧩 Componentes React

1.
```javascript
```

---
## 📄 Licença

Este projeto é licenciado sob a **SaaS License**. Consulte [LICENSE](https://github.com/felipesousasilva/adocao-animais/license) para mais detalhes.

---

## ✉️ Contato

**Felipe Sousa da Silva**  
[WhatsApp](https://web.whatsapp.com/send?phone=11954705118)
[GitHub](https://github.com/FelipeSdsilva)  
[✉️ E-mail](felipe.fps09@hotmail.com)
[LinkedIn](https://www.linkedin.com/in/felipesdsilva/)
