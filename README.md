# crypto-dashboard frontend

React + Vite + Tailwind фронтенд для проекта **crypto-dashboard**. Это содержимое подмодуля; основной репозиторий и его архитектура — в [VadimDenisovich/crypto-dashboard](https://github.com/VadimDenisovich/crypto-dashboard).

## Стек
- Vite 6, React 18, TypeScript
- MUI + Tailwind v4
- pnpm

## Локальный запуск
```bash
pnpm install
cp .env.example .env       # при необходимости поправь URL'ы
pnpm dev                   # http://localhost:5173
```

## Переменные окружения
- `VITE_API_URL` — REST API бэкенда (по умолчанию `http://localhost:8000/api/`).
- `VITE_WS_URL` — WebSocket эндпоинт бэкенда (`ws://localhost:8000/ws/updates`).

## Источник
Изначально код взят из [4444urka/crypto-dashboard](https://github.com/4444urka/crypto-dashboard) (директория `frontend/`). Подключён в монорепо как git submodule.
