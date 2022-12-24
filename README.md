# Descripción del repositorio.

Este repositorio contiene el backend del portal web de la comunidad GDG Algeciras. Está basado en MongoDB, NodeJs y Express.

## Configuración del editor (VSCode)

Para una mejor experiencia con la refactorización del código y recomendaciones, instalar las extensiones "Prettier - Code formatter" y "ESLint" de VSCode.

El objetivo es conseguir un alto standard de calidad y legibilidad del código. De esta manera distintos desarrolladores podrán colaborar más eficientemente.

El código debe estar correctamente formateado antes de enviarlo a GitHub. Para eso se debe ejecutar el npm script "prettier", o incluso mejor, configurar el archivo "settings.json" del VSCode para que al guardar un archivo formatee el código automáticamente. Este es el archivo de preferencias de VSCode, se accede con el siguiente comando: 

Ctrl + Shift + P > Preferences Open User settings (JSON)

Este repositorio se configuró con la siguiente configuración del "settings.json":

```json
{
  ... Other configurations,
  "typescript.format.insertSpaceAfterCommaDelimiter": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "[json]": {
    "editor.formatOnSave": true,
    "editor.quickSuggestions": {
      "strings": true
    },
    "editor.suggest.insertMode": "replace",
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": true
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  "editor.guides.bracketPairs": true,
  "[jsonc]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.formatOnPaste": false
  }
}
```

## Antes de comenzar

Antes de comenzar será necesario crear un archivo .env (Archivo de configuración de variables) en el root directory. En este archivo tendremos que poner ciertas variables para su correcto funcionamiento. Dichas variables serán provistas por privado.

## Una vez tenemos el proyecto configurado.

### Instalar en tu ordenador NODE

Instalar Node: [https://nodejs.org/en/download/](https://nodejs.org/en/download/).\

### Ejecutar comando para instalar los paquetes

En el directorio raiz, ejecutar el comando "npm install".

### Ejecutar comandos para correr la web

Para arancar el frontend, en la terminal moverse a la carpeta raiz y correr el siguiente comando:

### `npm start`
