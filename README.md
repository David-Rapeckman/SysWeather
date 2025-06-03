# SysWeather

SysWeather é um aplicativo em React Native que exibe informações meteorológicas atuais e alertas de risco de enchentes para cidades brasileiras predefinidas. Construído com Expo, ele integra a API do OpenWeather para buscar dados meteorológicos em tempo real, previsões horárias e determina o risco de enchente com base na precipitação acumulada. Os usuários podem visualizar temperatura, condições climáticas, dicas de prevenção e localizar abrigos próximos para cada cidade.

---

## Índice

- [Funcionalidades](#funcionalidades)  
- [Pré-requisitos](#pré-requisitos)  
- [Instalação](#instalação)  
- [Scripts Disponíveis](#scripts-disponíveis)  
- [Estrutura do Projeto](#estrutura-do-projeto)  
- [Uso](#uso)  
- [Como Contribuir](#como-contribuir)  
- [Licença](#licença)  

---

## Funcionalidades

- Exibe temperatura atual, descrição do clima e ícone representando a condição para cidades selecionadas.  
- Calcula risco de enchente com base na soma da precipitação prevista para as próximas 3 horas.  
- Fornece dicas de prevenção conforme a condição climática (por exemplo, levar guarda-chuva, evitar áreas abertas durante trovoadas).  
- Apresenta temperaturas mínima e máxima, além de porcentagem de chance de chuva.  
- Inclui um modal com endereços e contatos de abrigos quando um card de cidade é selecionado.  
- Implementa armazenamento persistente de sessão do usuário e permite adicionar cidades personalizadas usando AsyncStorage.  

---

## Pré-requisitos

- **Node.js** (versão 16.x ou superior)  
- **Yarn** ou **npm**  
- **Expo CLI** (instalar globalmente via `npm install -g expo-cli` ou `yarn global add expo-cli`)  

---

## Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/yourusername/SysWeather.git
   cd SysWeather
   ```bash

2. Instale as dependências
   ```bash
   # Usando npm
   npm install
2.1. Ou usando Yarn
    ```bash   
   yarn install
    ```bash
 
3. Inicie o servidor de desenvolvimento
   ```bash
   npm start
   ```bash

Inicie a aplicação
expo start
Tela Principal
A tela inicial exibirá cards para as seguintes cidades predefinidas:
São Paulo
Rio de Janeiro
Belo Horizonte
Curitiba
Porto Alegre
Salvador
Detalhes do Card de Cidade
Cada card apresenta:
Temperatura Atual (°C)
Ícone do Clima (por exemplo, sol, chuva, nuvens)
Descrição Textual (por exemplo, “chuva leve”)
Indicador de Risco de Enchente (“⚠️ Alto risco de enchente”) se a precipitação acumulada para as próximas 3 horas for ≥ 20 mm.
Dicas de Prevenção conforme o clima (por exemplo, “Leve um guarda-chuva”).
Temperaturas Mínima e Máxima
Chance de Chuva (porcentagem)
Modal de Abrigos
Ao tocar em um card de cidade, abre-se um modal listando abrigos locais com endereços e informações de contato.
Armazenamento Persistente e Cidades Personalizadas
Os dados de sessão do usuário são armazenados de forma persistente.
Os usuários podem adicionar cidades personalizadas, que são salvas via AsyncStorage.
Como Contribuir

Faça um fork do repositório
git clone https://github.com/yourusername/SysWeather.git
cd SysWeather
Crie uma branch para sua feature
git checkout -b feature/MinhaFeature
Faça alterações e crie commits
git commit -m "Descrição da minha feature"
Envie para sua branch
git push origin feature/MinhaFeature
Abra um Pull Request
Explique claramente suas mudanças.
Certifique-se de seguir o estilo de código existente e manter os tipos TypeScript consistentes.
Inclua testes quando apropriado.
