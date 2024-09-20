# Aplicação de Previsão do Tempo

Uma aplicação web que permite aos usuários visualizar a previsão do tempo atual e dos próximos dias, baseada em sua localização ou em uma cidade específica, utilizando a API OpenWeather.

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

Este projeto é uma aplicação de previsão do tempo que permite ao usuário pesquisar o clima de qualquer cidade e obter as previsões dos próximos dias. A aplicação utiliza a API OpenWeather para obter dados meteorológicos em tempo real.

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

# Previsão do Tempo

Estrutura:

`index.js`: É o ponto de entrada do aplicativo. Este arquivo normalmente importa o App.js e monta o React no DOM.

`App.js`: É o componente principal que contém a lógica e a estrutura do aplicativo. Este componente é normalmente importado por index.js.

`routes.js`: Se você deseja separar a lógica de roteamento do restante do código do aplicativo, você pode criar um routes.js para conter apenas as configurações de rotas e importá-lo no App.js.

## Configuração da API

1. Obtenha uma chave de API no site [OpenWeather](https://home.openweathermap.org/users/sign_up).
2. Adicione a chave no arquivo `.env` como:

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
