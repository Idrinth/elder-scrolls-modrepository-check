# elder-scrolls-modrepository-check
This is a configuration repository for my elder scrolls projects automation.

## .github/workflows/main.yml
```yml
name: CI

on:
  push:
    branches:
    - master
  pull_request:
    branches: 
    - master
jobs:
  spellcheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          repository: idrinth/elder-scrolls-modrepository-check
          ref: master
          path: elder-scrolls-modrepository-check
      - uses: actions/checkout@v3
        with:
          path: project
      - name: Prepare
        run: mv elder-scrolls-modrepository-check/* ./ && mv elder-scrolls-modrepository-check/.spellcheckerrc.yml ./ && mv elder-scrolls-modrepository-check/.markdownlint-cli2.yaml ./ && mv project/* ./
      - name: Setup Node.js environment
        uses: actions/setup-node@v3.4.1
      - name: Install 
        run: npm install 
      - name: Check Spelling
        run: npm run-script spelling
  markdown-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          repository: idrinth/elder-scrolls-modrepository-check
          ref: master
          path: elder-scrolls-modrepository-check
      - uses: actions/checkout@v3
        with:
          path: project
      - name: Prepare
        run: mv elder-scrolls-modrepository-check/* ./ && mv elder-scrolls-modrepository-check/.spellcheckerrc.yml ./ && mv elder-scrolls-modrepository-check/.markdownlint-cli2.yaml ./ && mv project/* ./
      - name: Setup Node.js environment
        uses: actions/setup-node@v3.4.1
      - name: Install 
        run: npm install 
      - name: Check Markdown
        run: npm run-script markdown
  duplicate-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          repository: idrinth/elder-scrolls-modrepository-check
          ref: master
          path: elder-scrolls-modrepository-check
      - uses: actions/checkout@v3
        with:
          path: project
      - name: Prepare
        run: mv elder-scrolls-modrepository-check/* ./ && mv elder-scrolls-modrepository-check/.spellcheckerrc.yml ./ && mv elder-scrolls-modrepository-check/.markdownlint-cli2.yaml ./ && mv project/* ./
      - name: Setup Node.js environment
        uses: actions/setup-node@v3.4.1
      - name: Install 
        run: npm install 
      - name: Check Names
        run: npm run-script duplicates
```
