# NavigatorTabsReactNative

Este es un proyecto de React Native que estoy haciendo para aprender durante mi estancia en ALTEN SPAIN como alumno de prácticas.
Aquí dejo un pequeño resumen de los conceptos que se me han quedado en la cabeza.

## React Native

Framework de React para poder crear aplicaciones nativas tanto para Android como para IOS con el mismo código. También vale para web.

## Expo

Framework que implementa React Native a tus proyectos sin que tengas que configurar las cosas básicas.

## Async Storage

Sistema de almacenamiento simple de datos. Almacena valores como mapas de datos, con una clave y un valor por entrada.
No es una base de datos relacional, por lo que no hay nada como tablas.
Permite acceder a datos durante la ejecución de la aplicación y persistir nuevos datos.
En mi caso lo usé para guardar y actualizar la lista de películas cada vez que accedíamos al apartado lista. Y de no haber conexión poder ver en el último estado que tenía.

## Zustand Persist

Librería que permite acceder a los datos en Async Storage de forma más cómoda y permite asignarlos a estados de React (o algo así).

## NativeWind CSS

Librería de estilos basada en TailWind CSS que "facilita" la definición y asignación de estilos a componentes en React Native.

## Node js

Node es un entorno de ejecución que permite ejecutar código javascript fuera del navegador. 

## Node Version Manager (NVM)

Node funciona de forma muy distinta con cada versión. Para controlar mejor las versiones y poder tener instancias separadas usamos nvm. Permite descargar varias versiones de node y alternar entre ellas con el comando $ nvm use {versión}.

En cuanto a razones por las que habría que reinstalar las dependencias al cambiar de versión de Node js:

1. Hay dependencias que fallan con la nueva versión de Node y por ello tienen que reinstalarse.
2. Hay dependencias de módulos nativos de React Native que tendrán que ser compilados. A veces estos módulos pueden depender de la versión de Node. 
3. El caché de npm/yarn puede perder consistencia al cambiar de versión de Node, por lo que hay que reinstalar todo para asegurarse de que estén todas las dependencias. 

## Gestores de paquetes

Los distintos gestores de paquetes tienen la misma función.
Gestionar dependencias e instalación de librerías.
La razón por la que falla el proyecto cuando lo iniciamos con un gestor (p.e. npm run start) pero las dependencias están declaradas en otro gestor (p.e. yarn) es porque cada uno lleva de forma independiente sus dependencias.

### NPM

Gestor de paquetes para node.
Gestiona las dependencias en package-lock.json.

### YARN

Otro gestor de paquetes para node.
Gestiona las dependencias en yarn.lock.

### PNPM

Otro gestor de paquetes para node.
Gestiona las dependencias en pnpm-lock.yaml

