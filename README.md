# SanIA DoncelProject Academy

Plataforma e-learning de IA para sanitarios. React + Vite + Supabase + Netlify.

## Setup en 5 pasos

### 1. Supabase
1. Abre tu proyecto Supabase existente (asistente-investigación)
2. Ve a SQL Editor → New query
3. Pega y ejecuta el contenido de `supabase_setup.sql`
4. Copia tus credenciales: Project URL + anon key

### 2. Variables de entorno
```bash
cp .env.example .env
# Edita .env con tus credenciales de Supabase
```

### 3. Instalar y arrancar
```bash
npm install
npm run dev
# → http://localhost:5173
```

### 4. Añadir lecciones HTML
Copia todos tus archivos HTML a la carpeta `public/lessons/`:
```
public/lessons/
├── leccion_1_1.html
├── leccion_1_2.html
├── ...
└── herramientas_11_proyecto_final_guiado.html
```

### 5. Deploy en Netlify
```bash
# Crear repo en GitHub y subir
git remote add origin https://github.com/tuusuario/sania-academy.git
git push -u origin main

# En Netlify:
# - Import from GitHub → selecciona el repo
# - Build command: npm run build
# - Publish directory: dist
# - Environment variables: VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
```

## Gestión de invitaciones

Los códigos de invitación se gestionan directamente en Supabase:
- Dashboard → Table Editor → academy_invites
- Añade filas con el código que quieras (formato libre, se guarda en mayúsculas)

## Estructura de archivos

```
src/
├── App.jsx                    # Router principal (auth → dashboard → lección)
├── pages/
│   ├── AuthPage.jsx           # Login + registro con código
│   ├── Dashboard.jsx          # Vista principal con módulos
│   └── LessonShell.jsx        # iframe que carga los HTML
├── components/
│   ├── ModuleCard.jsx         # Tarjeta de módulo
│   └── ModuleDetail.jsx       # Lista de lecciones del módulo
├── lib/
│   ├── supabase.js            # Cliente Supabase
│   └── courseData.js          # Estructura completa del curso
├── services/
│   └── academy.js             # Progreso, certificados, invitaciones
└── utils/
    └── certificate.js         # Generador PDF de certificados
```

## Trigger de completado en los HTML

Cada lección HTML debe disparar este mensaje cuando el alumno completa:
```javascript
window.parent.postMessage({ type: 'LESSON_COMPLETE' }, '*')
```

## Dominio sugerido para Netlify
`sania-doncelproject-academy.netlify.app`
