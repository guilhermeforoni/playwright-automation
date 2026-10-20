# 🎭 Playwright E2E Test Automation

[![Playwright](https://img.shields.io/badge/Playwright-1.x-green?logo=playwright)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js->=18.x-green?logo=node.js)](https://nodejs.org/)

Este repositório contém a automação de testes End-to-End (E2E) desenvolvida com **Playwright** e **TypeScript**. O projeto foi estruturado seguindo boas práticas e padrões do mercado para garantir alta manutenibilidade, reuso de código e testes confiáveis.

---

## 🎯 Destaques e Arquitetura

Neste projeto foram aplicados os seguintes conceitos e padrões:

- **Page Object Model (POM):** Abstração das telas e componentes em classes próprias, separando a lógica de interação com os elementos da página da lógica dos cenários de teste.
- **Fixtures Personalizadas:** Criação e extensão de fixtures do Playwright (por exemplo, para geração de dados dinâmicos de cadastro/massa de teste e reutilização do contexto das páginas).
- **Tratamento de Assertivas Assíncronas:** Uso de locatores resilientes e auto-waiting nativos do Playwright para evitar *flakiness* nos testes.

---

## 🛠️ Tecnologias Utilizadas

- **[Playwright](https://playwright.dev/)**: Framework para automação de testes E2E.
- **[TypeScript](https://www.typescriptlang.org/)**: Linguagem com tipagem estática para maior segurança no código.
- **Node.js**: Ambiente de execução JavaScript/TypeScript.

---

## 📂 Estrutura do Projeto

```text
├── tests/              # Arquivos de cenários de testes (.spec.ts)
├── pages/              # Mapeamento de elementos e ações (Page Object Model)
├── fixtures/           # Fixtures do Playwright para dados e instâncias (ex: dados de cadastro)
├── playwright.config.ts# Configurações globais do Playwright (browsers, base URL, timeouts)
├── package.json        # Dependências e scripts do projeto
└── README.md           # Documentação do projeto
