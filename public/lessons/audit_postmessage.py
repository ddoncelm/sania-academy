"""
audit_postmessage.py

Analiza todos los HTML de lecciones y clasifica cada uno según
si ya tiene postMessage, qué patrón usa, o si necesita revisión manual.

USO:
  1. Pon este script en la carpeta public/lessons/
  2. Ejecuta: python audit_postmessage.py
"""

import os
import glob
import re

# ── Patrones conocidos ──────────────────────────────────────────────────────

# Ya tiene postMessage
HAS_POST = "LESSON_COMPLETE"

# Patrón A: } else if (n === 3) {
PATTERN_A = r"}\s*else\s*if\s*\(\s*n\s*===\s*3\s*\)"

# Patrón B: getElementById('nx' + n) o getElementById("nx"+n)
PATTERN_B = r"getElementById\(['\"]nx['\"].*?\+.*?n\)"

# Patrón C: completar() — función explícita de completado
PATTERN_C = r"function\s+completar\s*\("

# Patrón D: ans() con n===3 pero SIN postMessage
PATTERN_D = r"if\s*\(\s*n\s*===\s*3\s*\)"


def audit_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    if HAS_POST in content:
        return "✅ OK", "Ya tiene postMessage"

    has_a = bool(re.search(PATTERN_A, content))
    has_b = bool(re.search(PATTERN_B, content))
    has_c = bool(re.search(PATTERN_C, content))
    has_d = bool(re.search(PATTERN_D, content))

    if has_c:
        return "⚠️  AÑADIR", "Tiene completar() — añadir postMessage dentro de completar()"
    if has_a:
        return "⚠️  AÑADIR", "Patrón A (else if n===3) — añadir postMessage después de esa línea"
    if has_b:
        return "⚠️  AÑADIR", "Patrón B (nx+n) — añadir: if(n===3){window.parent.postMessage(...)}"
    if has_d:
        return "⚠️  AÑADIR", "Patrón D (if n===3) — añadir postMessage dentro de ese bloque"

    return "❓ REVISAR", "Sin patrón reconocido — revisar manualmente"


def main():
    html_files = sorted(glob.glob("*.html"))

    if not html_files:
        print("No se encontraron archivos HTML.")
        print("Ejecuta desde la carpeta public/lessons/")
        return

    print(f"Analizando {len(html_files)} archivos...\n")
    print(f"{'ARCHIVO':<55} {'ESTADO':<14} DETALLE")
    print("─" * 110)

    counts = {"✅ OK": 0, "⚠️  AÑADIR": 0, "❓ REVISAR": 0}

    for filepath in html_files:
        name = os.path.basename(filepath)
        status, detail = audit_file(filepath)
        key = status.split()[0] + " " + status.split()[1] if len(status.split()) > 1 else status
        # contar por tipo
        for k in counts:
            if k in status:
                counts[k] += 1
                break

        print(f"  {name:<53} {status:<14} {detail}")

    print("─" * 110)
    print(f"\nResumen:")
    print(f"  ✅ Ya tienen postMessage : {counts['✅ OK']}")
    print(f"  ⚠️  Necesitan añadirlo   : {counts['⚠️  AÑADIR']}")
    print(f"  ❓ Revisión manual       : {counts['❓ REVISAR']}")
    total_pendiente = counts['⚠️  AÑADIR'] + counts['❓ REVISAR']
    print(f"\n  Pendientes total: {total_pendiente} de {len(html_files)}")


if __name__ == "__main__":
    main()
