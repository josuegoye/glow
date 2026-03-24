# Glow Fullstack Platform

Glow es una plataforma B2B2C que permite a negocios locales gestionar interacciones, sorteos, módulos de chat con inteligencia artificial y ofertas, y publicarlas instantáneamente en su Asistente Público (Panel Cliente).

## Arquitectura

- **Backend (`back/`)**: FastAPI, SQLAlchemy (async), Alembic, Pydantic, PostgreSQL/SQLite.
- **Frontend (`front/`)**: Next.js (App Router), React, Vanilla CSS.

## Prerrequisitos

- Python 3.10+
- Node.js 18+

## Inicio rápido (Desarrollo Local)

### 1. Backend (FastAPI)
```bash
cd back
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt # O simplemente usa el virtual env actual
uvicorn main:app --reload
```
La API estará corriendo en `http://127.0.0.1:8000`. Swagger interactivo en `http://127.0.0.1:8000/docs`.

**Base de datos**:
El proyecto está pre-configurado para correr con SQLite asíncrono (`aiosqlite`) localmente. La semilla ya ha sido corrida, generando usuarios en `glow.db`.

Si necesitas re-poblar la base de datos:
```bash
python seed.py
```

### 2. Frontend (Next.js)
En una terminal nueva:
```bash
cd front
npm install
npm run dev
```
La aplicación web correrá en `http://localhost:3000`.

## Vistas Disponibles (Demo)

Para la prueba de funcionamiento con los datos del `seed.py`, visita los siguientes endpoints en tu frontend:
- **Admin CEO**: `http://localhost:3000/admin`
- **Panel Negocio**: `http://localhost:3000/business`
- **Asistente Público**: `http://localhost:3000/glow-cooperativa-centro`

## Notas para Agentes de IA

Este repositorio está preparado para ser modificado limpiamente por agentes de IA:
1. **Modelos y DB**: Todo SQLAlchemy está en `back/models/`. Para modificar el esquema, edita los modelos y luego corre `alembic revision --autogenerate -m "cambios"` y `alembic upgrade head`.
2. **Estilos**: El frontend usa Vanilla CSS. Las variables globales (como esquema de colores rojo/negro) están centralizadas en `front/src/app/globals.css`. Respetar estas variables para mantener la identidad visual Glow (`var(--bg)`, `var(--brand)`, `var(--card)`).
3. **Módulos configurables**: El rendering en `app/[slug]/page.tsx` responde de manera dinámica al json devuelto por `/api/public/{slug}`. Los flags como `modules.raffle`, `modules.offers` controlan qué botones se visualizan.
