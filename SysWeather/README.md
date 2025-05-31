# **SysTrack: Monitoramento em Tempo Real de Motos**

## Nossa Equipe

- **Gustavo Rangel**  RM559168
  - 💼 Estudante de Análise e Desenvolvimento de Sistemas na FIAP  
  🔗 [linkedin.com/in/gustavoorangel](https://linkedin.com/in/gustavoorangel)

- **David Rapeckman**  RM556607
  - 💼 Estudante de Análise e Desenvolvimento de Sistemas na FIAP  
  🔗 [linkedin.com/in/davidrapeckman](https://linkedin.com/in/davidrapeckman)

- **Luis Felippe Morais**  RM558127
  - 💼 Estudante de Análise e Desenvolvimento de Sistemas na FIAP  
  🔗 [linkedin.com/in/luis-felippe-morais-das-neves-16219b2b9](https://linkedin.com/in/luis-felippe-morais-das-neves-16219b2b9)

---

## Descrição

O **SysTrack** é um aplicativo mobile desenvolvido com **React Native** e **TypeScript**, voltado para o monitoramento e gestão em tempo real de motos em pátios. Ele oferece uma visualização interativa, sistema de login seguro e uma navegação fluida para facilitar a consulta e gestão dos veículos. O aplicativo foi projetado para proporcionar uma experiência otimizada, com telas intuitivas para usuários e administradores.

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [Expo](https://expo.dev/)
- [Styled Components]
- [@expo/vector-icons](https://icons.expo.fyi/)

---

## 📱 Funcionalidades

- ✅ **Autenticação local** com `AsyncStorage`
  - Login com admin padrão (`admin@gmail.com / admin123`)
- 🗺️ **Tela de localização**
  - Exibe um mapa com motos posicionadas (botões clicáveis)
- 🛵 **Tela de motos (Moto1, Moto2, Moto3)**
  - Mostra status de cada moto: Alugada, Livre, IoT, Manutenção
- 🧾 **Lista de Veículos**
  - Visualização em cards com modelo, status e usuário
- 👤 **Perfil**
  - Dados estáticos + possibilidade de trocar imagem e editar informações
- ⚙️ **Configurações**
  - Idioma, modo escuro, notificações, acesso a Termos, Ajuda e Sobre o App
- 🔄 **Navegação via Tab Navigator**
  - Menu inferior com Location, Vehicles, Profile, Settings

---

## 🧩 Estrutura do Projeto

```plaintext
src/
├── assets/                    # Imagens estáticas
├── components/                # Componentes reutilizáveis (Button, Input, Header, MotoCard)
├── contexts/ 
│   └── AuthContext.tsx        # Contexto de autenticação
├── navigation/
│   ├── AppNavigator.tsx       # Stack Navigator + Lógica de Autenticação
│   ├── TabNavigator.tsx       # Navegação por abas para o menu inferior
│   └── Types.ts               # Tipagem de rotas
├── screens/
│   ├── Auth/                  # Telas: Splash, SignIn, SignUp
│   ├── Home/                  # LocationScreen
│   ├── Vehicles/              # Telas: VehiclesList, Moto1, Moto2, Moto3
│   ├── Profile/               # Telas: Profile, Edit, Foto
│   └── Settings/              # Telas: Configurações, Ajuda, Termos, Sobre
├── services/
│   └── authService.ts         # Serviço de autenticação (mock)
├── styles/
│   ├── colors.ts
│   ├── fonts.ts
│   ├── global.ts
│   └── metrics.ts
└── types/
    ├── auth.ts
    ├── navigation.ts
    ├── user.ts
    └── vehicles.ts
```

## Como Rodar o Projeto Localmente

Siga as instruções abaixo para rodar o projeto em seu ambiente local:

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **Expo CLI** (instale com o comando `npm install -g expo-cli`)
- **Yarn** (opcional, mas recomendado para melhor performance)

### Passos

1. Clone o repositório:
   ```bash
   git clone [https://github.com//SysTrack.git](https://github.com/David-Rapeckman/Sprints-Mottu-Mobile/)


Navegue até a pasta do projeto:
   ```bash
   cd Sprints-Mottu-Mobile
   ```
Instale as dependências:
   ```bash
  npm install
   ```

Inicie o servidor:
   ```bash
  npm start
   ```

O Expo CLI abrirá uma nova janela no navegador com o código QR. Você pode escanear o código QR com o aplicativo Expo Go no seu dispositivo ou usar o emulador.


