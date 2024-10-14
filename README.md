# Proyecto Angular con PrimeNG

Este proyecto es una aplicación web construida con Angular 18 y PrimeNG, que permite gestionar productos.

## Tecnologías Utilizadas
- **Angular 18**: Framework de JavaScript para construir aplicaciones web.
- **PrimeNG**: Biblioteca de componentes de UI para Angular.
- **json-server**: Simulación de API REST para desarrollo y pruebas.

## Configuración de la Base de Datos
1. **Instalar json-server**:
2. npm install -g json-server
3. Levantar la base de datos: Asegúrate de que tu archivo db.json esté en la raíz del proyecto y ejecuta:
   json-server --watch db.json

## Levantar el Proyecto  
1. cd eldar-front
2. npm install
3. ng serve
4. Accede a la aplicación en http://localhost:4200

## Funcionalidades
- Agregar, Editar y Eliminar Productos: Interfaz para gestionar productos con operaciones CRUD.
- Autenticación de Usuarios: Diferentes roles para controlar el acceso a funcionalidades.

## Ingresos default
Rol Admin  admin@gamil.com 
Rol User  user@user.com 

Contraseña 123456

## Resumen funcional
En esta aplicacion, se limita el ABM a un usuario con acceso de administrador, este usuario puede acceder a la vista del usuario normal
y puede en otra vista realizar el proceso, de alta, baja y modificacion de una lista de productos.
El usuario normal, puede acceder solo a la vista de los productos.
En el login se realizan las validaciones de acceso para el usuario registrado, si no se tiene un usuario registrado, se puede crear uno 
pasando a la vista de registro.
En la vista de registro, se puede crear un usuario para el ingreso de la aplicacion, el usuario creado en la vista de registro solo sera del 
rol "user" limitando su interaccion a solo lectura de la lista de productos.

## Resumen tecnico
Debido a que esta aplicacion esta desarrollada en angular 18 no contiene modulos, se maneja con "standalone components".
Esto simplifica la estructura del proyecto, ya que cada componente puede manejar sus propias dependencias y 
configuraciones de manera independiente.

El sistema de guards y autenticación se gestiona a través del AuthService, que verifica las credenciales de los usuarios. 
Los guards protegen las rutas, asegurando que solo los usuarios autenticados y con los roles adecuados (como "admin" o "user")
puedan acceder a ciertas partes de la aplicación. 
Al iniciar sesión, el usuario se almacena en la sesión, y se utilizan guards para redirigir a los usuarios no autorizados
a la página de inicio de sesión.

La conexión de servicios en la aplicación se realiza a través del HttpClient, que permite enviar solicitudes HTTP al archivo db.json, 
que actúa como una base de datos simulada. El ProductService gestiona las operaciones CRUD (crear, leer, actualizar y eliminar)
enviando solicitudes a las rutas de json-server. 
El manejo de usuarios en la aplicación se realiza mediante el AuthService, que gestiona el registro y la autenticación.
Al iniciar sesión, se validan las credenciales contra los datos almacenados en db.json. Los roles de los usuarios 
(como "admin" y "user") se utilizan para controlar el acceso a diferentes secciones de la aplicación. La información del 
usuario autenticado se almacena en la sesión, 
lo que permite un acceso fluido y seguro a las funcionalidades adecuadas según el rol del usuario.
   
