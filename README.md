# Ejercicio-API-log-reg-search
Ejercicio de herramienta de búsqueda sobre la API de registro y login previamente vista

## Vista Previa
https://nl0v1.sse.codesandbox.io/

## Consignas

1. Modificar la página de registro agregando un 2do input tipo "password" que sea para confirmar la clave creada. Validar que las dos claves sean iguales para procesar el registro. Que la validación se haga en el servidor (ahora la API /register tendrá que recibir los 3 datos: usuario, clave, confirmación de clave) y si no cumplen la condición de ser iguales, retorne un mensaje indicando eso, con status code 400 o 409 (a gusto). Ese mensaje se debería ver en la pantalla del cliente para que corrija.
Nota aclaratoria sobre este punto: tendríamos dos enfoques posibles, validarlo en el cliente o en el servidor. Según las circunstancias, se hace de una u otra forma, o incluso de ambas (lo podemos charlar en la clase, pero me lo recuerdan, eh jaja). En este caso elegí pedirles que lo hagan en el server para que trabajen ese punto.
2. Agregar una API GET /phrases que consulte una lista de frases que van a estar en un archivo phrases.json y retorne solo las 5 primeras frases (o las que haya, pueden ser menos, o ninguna) que cumplan con la condición consultada. Esa lista es un array de strings de longitud indefinida con frases de texto. Si se pasa por query parameter un filtro "keyword=algo", se busca que ese "algo" sea parte de la frase.
Ej. del archivo:
[
	"Hola, mundo",
	"Faltan 119 días para la Primavera",
	"Esta es una lista de frases random, me quedé sin ideas.",
	... etc.
]
3. Agregar en el home.html (al que podemos llegar una vez registradxs) un input de búsqueda de frases que funcione como un predictivo. Es decir, que con cada tecla (podrían usar el evento keyup del input) dispare un request a la API pasándole lo que contiene el input en ese momento, la API retornará las 5 frases que contengan ese texto y las tenemos que mostrar en un div que aparece abajo del input, al modo que lo hace Google, x ej. Eso va a implicar que tengamos un div creado ahí abajo conteniendo, x ej, una ul y que ante cada respuesta, vaciemos esa ul (podemos hacerlo indicando que su .innerHTML = "" ) y la llenemos con nuevos li.
4. Hacer que en la lista de resultados de la coincidencia se resalte en negrita (usando el elemento inline <strong>) la parte del texto que coincidió con lo ingresado.
5. Hacer que al clickear en alguno de los resultados de la lista, ese texto pase a ser el que quede en el input como texto. Esto singifica que al armar la lista de elementos li tenemos que a su vez agregarles el listener del click para que oculte el div y ponga el texto del item clickeado en el input. Podemos usar el objeto/referencia this para que la función asignada como callback de click sea la misma en todos los casos, pero que al ejecutarse reciba una referencia al li clickeado (y, por lo tanto, la posibilidad de acceder a su contenido sin problemas). Un detalle no tan detalle: el contenido del li va a incluir el <strong>  y </strong>, hay que quitarlos antes de poner el texto en el input.
