# Star4cast — Backend (pendiente)

API en Python que servirá los modelos de **forecast de stock**. Todavía no
existe; este documento describe el **contrato previsto** para cuando se
implemente.

> Nota: el frontend actual es solo el sitio público de marketing y aún **no**
> consume esta API. Los modelos TypeScript (`Product`, `ForecastResult`, etc.)
> se definirán en el frontend cuando se construya la app interna; hoy no
> existen todavía.

## Contrato previsto

| Método | Ruta                                  | Devuelve            |
| ------ | ------------------------------------- | ------------------- |
| GET    | `/api/products`                       | `Product[]`         |
| GET    | `/api/products/{id}`                  | `Product`           |
| GET    | `/api/forecast/{id}?horizonDays=30`   | `ForecastResult`    |
| POST   | `/api/contact`                        | `202 Accepted`      |

La API debe servirse bajo el prefijo `/api` (el proxy de dev y nginx en prod ya
enrutan ahí).

Stack candidato: FastAPI + Pandas/Statsmodels (o Prophet) para el modelo de
series temporales. Se añadirá `backend/Dockerfile` y se descomentará el servicio
`backend` en los `docker-compose`.
