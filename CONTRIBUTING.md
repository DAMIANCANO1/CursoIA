# Contribuir a CursoIA

¡Gracias por tu interés en contribuir! Este repositorio está orientado a aprendizaje y evolución técnica, por lo que se priorizan cambios claros, pequeños y bien documentados.

## Cómo contribuir

1. Haz un fork del repositorio.
2. Crea una rama descriptiva desde `main`:
   - `feat/nombre-cambio`
   - `fix/nombre-bug`
   - `docs/nombre-doc`
3. Realiza cambios atómicos y relacionados con un solo objetivo.
4. Ejecuta validaciones locales antes de abrir PR.
5. Abre un Pull Request con contexto claro.

## Estándares de código

- Mantén consistencia con el estilo existente.
- Evita cambios no relacionados con el objetivo del PR.
- Usa nombres claros para variables, funciones y componentes.
- Mantén componentes y archivos enfocados en una sola responsabilidad.

## Proceso de Pull Requests

- Describe el problema y la solución propuesta.
- Referencia issues relacionados (por ejemplo: `Closes #12`).
- Incluye pasos de verificación local.
- Asegúrate de que el build pase (`npm run build` en `InMaterial`).
- Responde feedback de revisión y mantén el alcance del PR acotado.

## Convenciones de commits

Se recomienda Conventional Commits:

- `feat:` nueva funcionalidad
- `fix:` corrección de errores
- `docs:` cambios de documentación
- `refactor:` refactor sin cambio funcional
- `test:` pruebas
- `chore:` tareas de mantenimiento

Ejemplos:

- `feat: agregar módulo base de ejercicios IA`
- `fix: corregir error de render en componente Hero`
- `docs: actualizar instrucciones de instalación`
