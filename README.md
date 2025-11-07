# Analizador de Casos de Derecho Penal (Estudiante de 2º)

Esta es una aplicación web creada para analizar casos prácticos de derecho penal español desde la perspectiva de un estudiante de segundo año de carrera. Utiliza la API de Gemini para generar un análisis estructurado del caso y permite al usuario hacer preguntas de seguimiento a través de un chat interactivo.

## Características

- **Análisis Estructurado**: Proporciona un análisis del caso siguiendo una estructura académica (Hechos, Calificación, Autoría, etc.).
- **Perspectiva de Estudiante**: El tono y la terminología son los de un estudiante de derecho, no los de un experto consumado.
- **Chat Interactivo**: Permite realizar preguntas de seguimiento para profundizar en el análisis o aclarar dudas.
- **Interfaz Limpia y Sencilla**: Diseño minimalista y fácil de usar.
- **Desplegable en Vercel**: Configurado para un despliegue rápido y sencillo.

## Puesta en Marcha Local

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Instalar dependencias:**
    Asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego, ejecuta:
    ```bash
    npm install
    ```

3.  **Configurar la clave de API:**
    Crea un archivo llamado `.env.local` en la raíz del proyecto y añade tu clave de la API de Google Gemini:
    ```
    API_KEY="TU_CLAVE_DE_API_AQUI"
    ```
    > **Nota:** El nombre de la variable debe ser `API_KEY`. No uses `VITE_API_KEY` ya que el código está configurado para leer `process.env.API_KEY` directamente, para alinearse con las directrices y el entorno de Vercel.

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Abre [http://localhost:5173](http://localhost:5173) (o el puerto que indique la terminal) en tu navegador para ver la aplicación.

## Despliegue en Vercel

Puedes desplegar esta aplicación de forma gratuita con [Vercel](https://vercel.com).

1.  **Sube tu código a GitHub:**
    Crea un repositorio en GitHub y sube el código del proyecto.

2.  **Importar el proyecto en Vercel:**
    - Regístrate o inicia sesión en Vercel.
    - Haz clic en "Add New..." -> "Project".
    - Importa el repositorio que acabas de subir desde GitHub.

3.  **Configurar el proyecto:**
    - Vercel debería detectar automáticamente que es un proyecto Vite y preconfigurar los ajustes de construcción.
    - **¡Importante!** Ve a la pestaña "Settings" -> "Environment Variables".
    - Añade una nueva variable de entorno:
        - **Name**: `API_KEY`
        - **Value**: `TU_CLAVE_DE_API_DE_GOOGLE_GEMINI`
    - Haz clic en "Add".

4.  **Desplegar:**
    - Vuelve a la pestaña de "Deployments" y haz clic en el botón "Deploy".
    - Vercel construirá y desplegará tu aplicación. Una vez completado, te proporcionará la URL pública.
