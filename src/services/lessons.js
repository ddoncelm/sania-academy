/**
 * CATÁLOGO DE LECCIONES
 * Para añadir una lección nueva: añade un objeto al array del módulo correspondiente.
 * Para añadir un módulo nuevo: añade un objeto al array MODULES.
 * El shell lo renderiza automáticamente sin tocar nada más.
 */

export const MODULES = [
  {
    id: 1,
    title: 'Introducción a la IA en la práctica sanitaria',
    description: 'Fundamentos de IA generativa en salud con enfoque práctico, ético y humanista.',
    duration: '16 horas',
    color: '#2196F3',
    lessons: [
      { id: '1_1',  title: '¿Qué es la IA y cómo se aplica en distintos roles sanitarios?',        duration: 71,  file: 'leccion_1_1_IA_salud.html' },
      { id: '1_2',  title: 'La transformación de las búsquedas: IA vs. motores tradicionales',     duration: 95,  file: 'leccion_1_2_busquedas_IA.html' },
      { id: '1_3',  title: 'IA con propósito: una mirada humanista desde el dato hasta el cuidado',duration: 71,  file: 'leccion_1_3_humanista.html' },
      { id: '1_4',  title: 'La IA como palanca de transformación en salud: visión desde la 4RI',   duration: 71,  file: 'leccion_1_4_transformacion_4ri.html' },
      { id: '1_5',  title: 'La IA como motor de cambio en la cultura profesional sanitaria',        duration: 57,  file: 'leccion_1_5_cambio_cultural.html' },
      { id: '1_6',  title: 'Modelos conversacionales: evolución, versiones y consideraciones',      duration: 85,  file: 'leccion_1_6_modelos_conversacionales.html' },
      { id: '1_7',  title: 'Traducción y resumen de artículos médicos con IA',                     duration: 71,  file: 'leccion_1_7_traduccion_articulos.html' },
      { id: '1_8',  title: 'Revisión crítica con NotebookLM, Consensus AI y Elicit',               duration: 95,  file: 'leccion_1_8_notebooklm_consensus_elicit.html' },
      { id: '1_9',  title: 'Principios éticos básicos para el uso seguro de IA',                   duration: 57,  file: 'leccion_1_9_principios_eticos.html' },
      { id: '1_10', title: 'Casos reales de éxito y lecciones aprendidas',                         duration: 71,  file: 'leccion_1_10_casos_exito_lecciones.html' },
      { id: '1_11', title: 'Integración con Historias Clínicas Electrónicas',                      duration: 71,  file: 'leccion_1_11_integracion_HCE.html' },
      { id: '1_12', title: 'Introducción a la IA multimodal',                                      duration: 57,  file: 'leccion_1_12_IA_multimodal.html' },
      { id: '1_13', title: 'IA en Administración Pública Sanitaria Española',                      duration: 95,  file: 'leccion_1_13_IA_administracion_publica.html' },
    ]
  },
  {
    id: 2,
    title: 'Ingeniería de prompts clínicos y personalización',
    description: 'Diseñar, optimizar y personalizar prompts que maximicen la precisión clínica.',
    duration: '10 horas',
    color: '#00B8D4',
    lessons: [
      { id: '2_1',  title: 'Fundamentos de Big Data, ML y DL explicados para clínicos',            duration: 60,  file: 'leccion_2_1_bigdata_ml_dl.html' },
      { id: '2_2',  title: 'Diseño de prompts efectivos para distintos perfiles',                  duration: 78,  file: 'leccion_2_2_prompts_efectivos.html' },
      { id: '2_3',  title: 'Adaptación del lenguaje: paciente, estudiante, especialista',          duration: 47,  file: 'leccion_2_3_adaptacion_lenguaje.html' },
      { id: '2_4',  title: 'Memoria persistente para seguimiento clínico',                         duration: 60,  file: 'leccion_2_4_memoria_persistente.html' },
      { id: '2_5',  title: 'Protocolo de prompts éticos y seguros en hospitales',                  duration: 40,  file: 'leccion_2_5_prompts_eticos.html' },
      { id: '2_6',  title: 'Generación automatizada de informes clínicos',                         duration: 70,  file: 'leccion_2_6_informes_clinicos.html' },
      { id: '2_7',  title: 'Modelos abiertos vs. cerrados: diferencias prácticas',                 duration: 47,  file: 'leccion_2_7_modelos_abiertos_cerrados.html' },
      { id: '2_8',  title: 'Validación y control de calidad de respuestas',                        duration: 78,  file: 'leccion_2_8_validacion_calidad.html' },
      { id: '2_9',  title: 'RAG - Validación científica con fuentes verificadas',                  duration: 70,  file: 'leccion_2_9_rag_validacion.html' },
      { id: '2_10', title: 'Simulaciones interactivas y role-playing clínico',                     duration: 60,  file: 'leccion_2_10_simulaciones_roleplaying.html' },
    ]
  },
  {
    id: 3,
    title: 'Automatización clínica y administrativa no-code',
    description: 'Flujos de trabajo automatizados sin programación para optimizar procesos asistenciales.',
    duration: '18 horas',
    color: '#4CAF50',
    lessons: [
      { id: '3_1',  title: 'Casos de uso reales en gestión hospitalaria, diagnóstico y mejora asistencial', duration: 88, file: 'leccion_3_1_casos_automatizacion.html' },
      { id: '3_2',  title: 'Introducción a Zapier, Make y n8n',                                            duration: 70, file: 'leccion_3_2_zapier_make_n8n.html' },
      { id: '3_3',  title: 'Creación de flujos clínicos automatizados',                                    duration: 105,file: 'leccion_3_3_flujos_clinicos.html' },
      { id: '3_4',  title: 'Automatización de recordatorios, derivaciones y tareas administrativas',       duration: 60, file: 'leccion_3_4_recordatorios_derivaciones.html' },
      { id: '3_5',  title: 'Traducción y anonimización de informes clínicos',                              duration: 88, file: 'leccion_3_5_traduccion_anonimizacion.html' },
      { id: '3_6',  title: 'Integración con bases científicas',                                            duration: 70, file: 'leccion_3_6_bases_cientificas.html' },
      { id: '3_7',  title: 'Gestión de comunicaciones clínicas',                                           duration: 60, file: 'leccion_3_7_comunicaciones_clinicas.html' },
      { id: '3_8',  title: 'Taller de simulaciones y exportación a HCE',                                  duration: 88, file: 'leccion_3_8_simulaciones_HCE.html' },
      { id: '3_9',  title: 'Dashboards y APIs para bienestar',                                             duration: 88, file: 'leccion_3_9_dashboards_apis.html' },
      { id: '3_10', title: 'Visualización y explotación de datos de salud',                                duration: 88, file: 'leccion_3_10_visualizacion_datos.html' },
      { id: '3_11', title: 'Automatización en Administración Pública',                                     duration: 70, file: 'leccion_3_11_admin_publica.html' },
      { id: '3_12', title: 'Casos de automatización perioperatoria',                                       duration: 60, file: 'leccion_3_12_perioperatoria.html' },
      { id: '3_13', title: 'Automatización de procesos asistenciales integrados',                          duration: 88, file: 'leccion_3_13_procesos_integrados.html' },
      { id: '3_14', title: 'Simulación de flujos clínico-asistenciales',                                   duration: 70, file: 'leccion_3_14_simulacion_flujos.html' },
    ]
  },
  {
    id: 4,
    title: 'Creación y personalización segura de modelos de IA',
    description: 'Crear, entrenar y personalizar modelos de IA para necesidades clínicas concretas.',
    duration: '10 horas',
    color: '#FF9800',
    lessons: [
      { id: '4_1',  title: 'Fundamentos de entrenamiento en salud',                                duration: 62, file: 'leccion_4_1_entrenamiento_salud.html' },
      { id: '4_2',  title: 'Aplicaciones por rol sanitario y especialidad',                        duration: 74, file: 'leccion_4_2_aplicaciones_rol.html' },
      { id: '4_3',  title: 'Playground de OpenAI: configuración avanzada',                         duration: 49, file: 'leccion_4_3_playground_openai.html' },
      { id: '4_4',  title: 'Integración con wearables e IoT clínico',                              duration: 62, file: 'leccion_4_4_wearables_iot.html' },
      { id: '4_5',  title: 'Validación clínica cruzada',                                           duration: 41, file: 'leccion_4_5_validacion_cruzada.html' },
      { id: '4_6',  title: 'Marco normativo completo',                                              duration: 82, file: 'leccion_4_6_marco_normativo.html' },
      { id: '4_7',  title: 'Personalización sin código con fuentes verificadas',                   duration: 49, file: 'leccion_4_7_personalizacion_nocode.html' },
      { id: '4_8',  title: 'Actualización continua y mantenimiento',                               duration: 49, file: 'leccion_4_8_actualizacion_mantenimiento.html' },
      { id: '4_9',  title: 'Liderazgo en transformación digital sanitaria',                        duration: 62, file: 'leccion_4_9_liderazgo_digital.html' },
      { id: '4_10', title: 'Uso legal y ético de datos clínicos',                                  duration: 74, file: 'leccion_4_10_uso_legal_datos.html' },
    ]
  },
  {
    id: 5,
    title: 'Casos prácticos avanzados y flujos de acción',
    description: 'Integrar todos los conocimientos mediante casos prácticos complejos de entornos reales.',
    duration: '16 horas',
    color: '#9C27B0',
    lessons: [
      { id: '5_1',  title: 'Marco normativo español y europeo',                                    duration: 72, file: 'leccion_5_1_marco_normativo_esp.html' },
      { id: '5_2',  title: 'Gobernanza ética y gestión de riesgos',                                duration: 87, file: 'leccion_5_2_gobernanza_riesgos.html' },
      { id: '5_3',  title: 'Optimización avanzada para diagnóstico diferencial',                   duration: 96, file: 'leccion_5_3_diagnostico_diferencial.html' },
      { id: '5_4',  title: 'Personalización por especialidad',                                     duration: 72, file: 'leccion_5_4_personalizacion_especialidad.html' },
      { id: '5_5',  title: 'Escriba virtual con memoria persistente',                              duration: 58, file: 'leccion_5_5_escriba_virtual.html' },
      { id: '5_6',  title: 'IA en triage de urgencias',                                            duration: 58, file: 'leccion_5_6_triage_urgencias.html' },
      { id: '5_7',  title: 'Automatización de informes clínicos',                                  duration: 48, file: 'leccion_5_7_automatizacion_informes.html' },
      { id: '5_8',  title: 'Integración completa con HCE',                                         duration: 87, file: 'leccion_5_8_integracion_HCE.html' },
      { id: '5_9',  title: 'Análisis económico del impacto',                                       duration: 72, file: 'leccion_5_9_analisis_economico.html' },
      { id: '5_10', title: 'Casos interactivos multidisciplinares',                                duration: 72, file: 'leccion_5_10_casos_multidisciplinares.html' },
      { id: '5_11', title: 'Role-playing y simulación en tiempo real',                             duration: 72, file: 'leccion_5_11_roleplaying_simulacion.html' },
      { id: '5_12', title: 'Medición de impacto real',                                             duration: 72, file: 'leccion_5_12_medicion_impacto.html' },
      { id: '5_13', title: 'Contratación y auditoría de herramientas',                             duration: 96, file: 'leccion_5_13_contratacion_auditoria.html' },
    ]
  },
]

export const TOTAL_LESSONS = MODULES.reduce((acc, m) => acc + m.lessons.length, 0)

export function getLessonById(lessonId) {
  for (const mod of MODULES) {
    const lesson = mod.lessons.find(l => l.id === lessonId)
    if (lesson) return { lesson, module: mod }
  }
  return null
}
