## REST API: Representational state transfer, is a software architecture
### 1. Principios: Escalabilidad, Simplicidad,Portabilidad, Visibilidad Fiabilidad, Facil modificacion

### 2. Fundamentos:
#### 2.1 Recursos, todo es considerado un recurso; como usuarios, libros, etc...
#### 2.2 Verbos HTTP: definir las operaciones que se pueden realizar con los recursos
#### 2.3 Representaciones: JSON, XML, etc...
#### 2.4 Stateless: cada solicitud debe contener toda la informacion necesaria para entender el recurso
#### 2.6 Stateful: cada solicitud debe contener toda la informacion que se necesita para realizar la operacion
#### 2.7 Separacion de conceptos: Permite que el cliente y servidor funcionen de forma separada
#### 2.8 Codigo fuente abierto: Todo el codigo fuente de una aplicacion puede ser consumido por cualquiera8


#### ❌  CORS es un mecanismo de seguridad que restringe las solicitudes HTTP que se pueden realizar desde un navegador web a un servidor web que está en un  dominio diferente al del sitio web actual.  Cuando un navegador web realiza una solicitud HTTP a un servidor en un dominio diferente, el servidor puede agregar encabezados CORS a la respuesta para indicar al navegador si la solicitud está permitida. Si la solicitud no está permitida, el navegador bloqueará la respuesta y mostrará un error.