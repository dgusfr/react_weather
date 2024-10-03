# Previsão do Tempo

Uma aplicação web que permite aos usuários visualizar a previsão do tempo atual e dos próximos dias, baseada em sua localização ou em uma cidade específica, utilizando a API da OpenWeather.

## Interface

<!-- <div align="center">
  <img src="img/logo.png" alt="Imagem do Projeto" width="100">
</div> -->

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Status](#status)
- [Descrição](#descrição)
- [Funcionalidades](#funcionalidades)
- [Explicação](#explicação)
- [Como Usar](#como-usar)
- [Autor](#autor)

## Tecnologias Utilizadas

<div style="display: flex; flex-direction: row;">
  <div style="margin-right: 20px; display: flex; justify-content: flex-start;">
    <img src="img/js.png" alt="Logo Linguagem" width="100"/>
  </div>
  <div style="margin-right: 20px; display: flex; justify-content: flex-start;">
    <img src="img/react.png" alt="Logo React" width="100"/>
  </div>
</div>

## Status

![Em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=RED&style=for-the-badge)

<!-- ![Concluído](http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge) -->

## Descrição

Este projeto é uma aplicação de previsão do tempo que permite ao usuário pesquisar o clima de qualquer cidade e obter as previsões dos próximos dias. 

A aplicação utiliza a API OpenWeather para obter dados meteorológicos em tempo real.

## Funcionalidades

- Busca de previsão do tempo para uma cidade específica.
  
- Exibição da temperatura atual, condições do tempo e previsão para os próximos 5 dias.
  
- Exibição de ícones meteorológicos baseados nas condições do tempo.
  
- Responsividade para diferentes dispositivos.

## Explicação

Aqui está um pequeno exemplo de como a barra de busca é implementada:

```jsx
import React, { useState } from "react";

function WeatherApp() {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    console.log(`Buscando a previsão para: ${city}`);
  };

  return (
    <div>
      <header>
        <h1>Previsão do Tempo</h1>
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </header>
    </div>
  );
}

export default WeatherApp;
```

# **Sobre o React Weather**

O usuário, ao acessar a nossa aplicação, é direcionado para a página Home. Nesta página, é renderizado um card onde ele pode digitar o nome da cidade para a qual deseja obter a previsão do tempo. 

Ao clicar no botão "Buscar", as informações sobre o clima atual da cidade, bem como a previsão para os próximos dias, são apresentadas ao usuário de forma clara e organizada.

## **Específico:**

### **Fluxo Detalhado:**

1. **Entrada na Aplicação:**

   - **Arquivo:** `index.js`
     - **Responsabilidade:** Este arquivo é o ponto de entrada da aplicação React. Ele importa e renderiza o componente principal `App` dentro do elemento `root` no DOM.
     - **Interação:** Chama o componente `App`, que contém a estrutura da aplicação.

2. **Estrutura Principal:**

   - **Arquivo:** `App.js`
     - **Responsabilidade:** O `App.js` é responsável por definir a estrutura básica da aplicação. Ele pode incluir o roteamento (caso existam múltiplas páginas) e renderiza o componente principal da aplicação.
     - **Interação:** No contexto do React Weather, o `App.js` simplesmente renderiza o componente `WeatherApp` ou, se houver mais páginas, gerencia a navegação entre elas usando `react-router-dom`.

3. **Renderização da Página Home:**

   - **Arquivo:** `WeatherApp.js`
     - **Responsabilidade:** Este é o componente central da aplicação, responsável por renderizar a interface principal onde o usuário pode interagir para buscar a previsão do tempo.
     - **Interação:**
       - **Estado e Hooks:**
         - Usa `useState` para gerenciar o estado da cidade (`city`), dados meteorológicos (`weatherData`), dados da previsão (`forecastData`), estado de carregamento (`loading`), mensagens de erro (`error`) e histórico de cidades pesquisadas (`cityHistory`).
         - O `useEffect` poderia ser usado para realizar efeitos colaterais, mas neste caso, o foco está nos métodos de busca e na atualização do estado.
       - **Renderização Condicional:**
         - Quando o usuário digita o nome da cidade e clica em "Buscar", a função `fetchWeather` é chamada, que, por sua vez, interage com os serviços de API para buscar os dados climáticos.
       - **Componentes Filhos:**
         - Renderiza o componente `Loader` durante o carregamento dos dados.
         - Renderiza a previsão atual e dos próximos dias ao receber os dados.

4. **Busca de Dados Meteorológicos:**

   - **Arquivo:** `weatherService.js`
     - **Responsabilidade:** Este arquivo contém funções que interagem com a API externa (como a OpenWeatherMap) para buscar os dados meteorológicos.
     - **Funções:**
       - `getWeatherByCity`: Busca os dados climáticos atuais para uma cidade específica.
       - `getForecastByCity`: Busca a previsão do tempo para os próximos dias.
     - **Interação:** Essas funções são chamadas dentro do componente `WeatherApp.js` para preencher o estado com os dados obtidos.

5. **Renderização de Componentes Específicos:**

   - **Componentes:**
     - `Loader.js`: Exibe uma animação ou mensagem enquanto os dados estão sendo carregados.
     - `Footer.js`: (se fosse usado) Exibiria informações no rodapé, mas foi removido do projeto.
     - `ForecastDetails.js` e `HourlyForecast.js`: São componentes que renderizam detalhes específicos do clima, como previsões por hora ou detalhamento da previsão para cada dia.
     - **Interação:** Todos esses componentes interagem diretamente com o `WeatherApp.js`, que os renderiza condicionalmente com base no estado da aplicação.

6. **Estilização e Layout:**

   - **Arquivos:** `WeatherApp.module.css` (e outros arquivos `.module.css` para componentes específicos)
     - **Responsabilidade:** Define o layout, cores, fontes, espaçamentos, e outros aspectos visuais da aplicação.
     - **Interação:** Os estilos são aplicados diretamente nos componentes por meio do CSS Modules, garantindo encapsulamento e evitando conflitos de estilos globais.

7. **Fluxo Completo:**
   - **Processo:**
     - O usuário acessa a aplicação, que carrega o componente `WeatherApp`.
     - O usuário digita o nome da cidade e clica em "Buscar".
     - O `WeatherApp.js` chama as funções do `weatherService.js` para buscar os dados.
     - Enquanto os dados estão sendo carregados, o componente `Loader` é exibido.
     - Após o carregamento, os dados são renderizados no card principal e nos cards individuais de previsão.
     - A estilização aplicada pelo `WeatherApp.module.css` assegura que a interface seja visualmente agradável e responsiva.

## Configuração da API

1. Obtenha uma chave de API no site [OpenWeather](https://home.openweathermap.org/users/sign_up).
2. Adicione a chave no arquivo `.env`

# Estrutura do Projeto

```plaintext
src/
|-- components/
|   |-- Loader/
|   |   |-- Loader.js
|   |   |-- Loader.module.css
|   |-- ForecastDetails/
|   |   |-- ForecastDetails.js
|   |   |-- ForecastDetails.module.css
|   |-- HourlyForecast/
|   |   |-- HourlyForecast.js
|   |   |-- HourlyForecast.module.css
|
|-- pages/
|   |-- WeatherApp/
|   |   |-- WeatherApp.js
|   |   |-- WeatherApp.module.css
|
|-- services/
|   |-- weatherService.js
|
|-- App.js
|-- index.js
```

## Como Usar

1.  Clone este repositório:

    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git

    ```

2.  Instale as dependências:

         `npm install`

3.  Execute a aplicação:

        `npm start`

Acesse a aplicação no navegador em http://localhost:3000.

# Autor

Desenvolvido por Diego Franco.

```

