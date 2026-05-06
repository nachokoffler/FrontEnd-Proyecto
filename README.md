# FrontEnd-Proyecto
Integrantes: Gonzalo Carrizo e Ignacio Koffler.

Descripción:
Libertadnt es un sistema de gestión carcelario, se encarga de la administración tanto del personal de seguridad como de los reclusos, cuenta tanto con una base de datos para poder contabilizar e indicar cada preso y su sector asignado, como sus actividades diarias y el personal de seguridad asignado.

Uso: \
Crea un carpeta en tu computadora, ejecuta git init y luego git remote add origin https://github.com/nachokoffler/FrontEnd-Proyecto.git.
Luego ejecuta pnpm install.

Tambien vas a tener que crear un archivo .env en el directorio principal. \
server_port=4200 \
JWT_SECRET="4265#%mkj68u7" \
JWT_SECRET_SPECIAL='asdasdeeer555678?()55' \

Para comenzar a usar el servidor frontend, ejecute 'ng serve' en la terminal.

Use el usuario {codigo: 1, contraseña: 123r} para usar las capacidades de nivel de acceso especial y {codigo: 2, contraseña: 123r} para el nivel de acceso normal.

# Deploy Frontend — Libertand't

## Requisitos previos
- Tener [Node.js](https://nodejs.org) instalado
- Tener una cuenta en [Vercel](https://vercel.com)
- Tener el proyecto Angular en la carpeta `Libertadnt-FrontEnd`

---

## 1. Instalar Vercel CLI

```powershell
pnpm i -g vercel
```

---

## 2. Configurar `vercel.json`

Asegurate de tener este archivo en la raíz del proyecto Angular:

```json
{
  "buildCommand": "npx ng build --configuration=production",
  "outputDirectory": "dist/libertadnt-front-end/browser",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 3. Configurar la URL del backend

En `src/environments/environment.ts` (producción):

```typescript
export const environment = {
    API_URL: "https://tu-backend.ngrok-free.dev/"
};
```

> ⚠️ Si usás ngrok, esta URL cambia cada vez que reiniciás ngrok. Actualizala antes de cada deploy.

---

## 4. Hacer el deploy

Desde PowerShell en la raíz del proyecto:

```powershell
vercel deploy --prod
```

Si es la primera vez:
- **Set up and deploy?** → `yes`
- **Which scope?** → `nachokoffler's projects`
- **Link to existing project?** → `no` (la primera vez)
- **What's your project's name?** → `libertadnt-front-end`
- **In which directory is your code located?** → `./` (Enter)

---

## 5. URLs resultantes

| Tipo | URL |
|------|-----|
| Deploy específico | `https://libertadnt-front-4iee9z2dq-nachokofflers-projects.vercel.app` |
| Alias permanente | `https://libertadnt-front-end.vercel.app` ✅ |

Usar siempre la **alias permanente**.

---

## 6. Re-deploy (deploys futuros)

Para deploys posteriores simplemente correr:

```powershell
vercel deploy --prod
```

No vuelve a pedir configuración porque ya está linkeado el proyecto.

---

## Notas

- El archivo `.vercel/` se crea automáticamente y **no debe subirse a git** (ya está en `.gitignore`).
- Si el proyecto se desvincula o hay errores, borrar la carpeta `.vercel` y repetir desde el paso 4.
- El backend debe tener CORS configurado para aceptar `https://libertadnt-front-end.vercel.app`.
