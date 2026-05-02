export const MODULES = [
  {
    id: 1,
    title: 'Introducción a la IA en la práctica sanitaria',
    color: '#2196F3',
    colorDim: 'rgba(33,150,243,0.15)',
    icon: '🧠',
    hours: 16,
    lessons: [
      { id: '1_1',  title: '¿Qué es la IA y cómo se aplica en distintos roles?',        duration: 71,  file: 'leccion_1_1_IA_salud.html' },
      { id: '1_2',  title: 'La transformación de las búsquedas: IA vs. motores',         duration: 95,  file: 'leccion_1_2_busquedas_IA.html' },
      { id: '1_3',  title: 'IA con propósito: una mirada humanista',                     duration: 71,  file: 'leccion_1_3_humanista.html' },
      { id: '1_4',  title: 'La IA como palanca de transformación en salud',              duration: 71,  file: 'leccion_1_4_transformacion_4ri.html' },
      { id: '1_5',  title: 'La IA como motor de cambio en la cultura profesional',       duration: 57,  file: 'leccion_1_5_cambio_cultural.html' },
      { id: '1_6',  title: 'Modelos conversacionales: evolución y consideraciones',      duration: 85,  file: 'leccion_1_6_modelos_conversacionales.html' },
      { id: '1_7',  title: 'Traducción y resumen de artículos médicos con IA',           duration: 71,  file: 'leccion_1_7_traduccion_articulos.html' },
      { id: '1_8',  title: 'Revisión crítica con NotebookLM, Consensus AI y Elicit',     duration: 95,  file: 'leccion_1_8_notebooklm_consensus_elicit (1).html' },
      { id: '1_9',  title: 'Principios éticos básicos para el uso seguro de IA',         duration: 57,  file: 'leccion_1_9_principios_eticos.html' },
      { id: '1_10', title: 'Casos reales de éxito y lecciones aprendidas',               duration: 71,  file: 'leccion_1_10_casos_exito_lecciones.html' },
      { id: '1_11', title: 'Integración con Historias Clínicas Electrónicas',            duration: 71,  file: 'leccion_1_11_integracion_HCE.html' },
      { id: '1_12', title: 'Introducción a la IA multimodal',                            duration: 57,  file: 'leccion_1_12_IA_multimodal.html' },
      { id: '1_13', title: 'IA en Administración Pública Sanitaria Española',            duration: 95,  file: 'leccion_1_13_IA_administracion_publica.html' },
    ]
  },
  {
    id: 2,
    title: 'Ingeniería de prompts clínicos y personalización',
    color: '#009688',
    colorDim: 'rgba(0,150,136,0.15)',
    icon: '✍️',
    hours: 10,
    lessons: [
      { id: '2_1',  title: 'Fundamentos de Big Data, ML y DL para clínicos',             duration: 60,  file: 'leccion_2_1_bigdata_ML_DL_clinicos.html' },
      { id: '2_2',  title: 'Diseño de prompts efectivos para distintos perfiles',        duration: 78,  file: 'leccion_2_2_prompts_efectivos.html' },
      { id: '2_3',  title: 'Adaptación del lenguaje: paciente, estudiante, especialista',duration: 47,  file: 'leccion_2_3_adaptacion_lenguaje.html' },
      { id: '2_4',  title: 'Memoria persistente para seguimiento clínico',               duration: 60,  file: 'leccion_2_4_memoria_persistente.html' },
      { id: '2_5',  title: 'Protocolo de prompts éticos y seguros en hospitales',        duration: 40,  file: 'leccion_2_5_protocolo_etico.html' },
      { id: '2_6',  title: 'Generación automatizada de informes clínicos',               duration: 70,  file: 'leccion_2_6_informes_clinicos.html' },
      { id: '2_7',  title: 'Modelos abiertos vs. cerrados: diferencias prácticas',       duration: 47,  file: 'leccion_2_7_modelos_abiertos_cerrados.html' },
      { id: '2_8',  title: 'Validación y control de calidad de respuestas',              duration: 78,  file: 'leccion_2_8_validacion_calidad.html' },
      { id: '2_9',  title: 'RAG — Validación científica con fuentes verificadas',        duration: 70,  file: 'leccion_2_9_rag.html' },
      { id: '2_10', title: 'Simulaciones interactivas y role-playing clínico',           duration: 60,  file: 'leccion_2_10_simulaciones.html' },
    ]
  },
  {
    id: 3,
    title: 'Automatización clínica y administrativa no-code',
    color: '#FF6D00',
    colorDim: 'rgba(255,109,0,0.15)',
    icon: '⚙️',
    hours: 18,
    lessons: [
      { id: '3_1',  title: 'Casos de uso reales en gestión hospitalaria',                duration: 88,  file: 'leccion_3_1_casos_automatizacion.html' },
      { id: '3_2',  title: 'Introducción a Zapier, Make y n8n',                          duration: 70,  file: 'leccion_3_2_zapier_make_n8n.html' },
      { id: '3_3',  title: 'Creación de flujos clínicos automatizados',                  duration: 105, file: 'leccion_3_3_flujos_clinicos.html' },
      { id: '3_4',  title: 'Automatización de recordatorios y derivaciones',             duration: 60,  file: 'leccion_3_4_recordatorios.html' },
      { id: '3_5',  title: 'Traducción y anonimización de informes clínicos',            duration: 88,  file: 'leccion_3_5_traduccion_anonimizacion.html' },
      { id: '3_6',  title: 'Integración con bases científicas',                          duration: 70,  file: 'leccion_3_6_bases_cientificas.html' },
      { id: '3_7',  title: 'Gestión de comunicaciones clínicas',                         duration: 60,  file: 'leccion_3_7_comunicaciones.html' },
      { id: '3_8',  title: 'Taller de simulaciones y exportación a HCE',                 duration: 88,  file: 'leccion_3_8_hce_integracion.html' },
      { id: '3_9',  title: 'Dashboards y APIs para bienestar',                           duration: 88,  file: 'leccion_3_9_dashboards.html' },
      { id: '3_10', title: 'Visualización y explotación de datos de salud',              duration: 88,  file: 'leccion_3_10_visualizacion.html' },
      { id: '3_11', title: 'Automatización en Administración Pública',                   duration: 70,  file: 'leccion_3_11_admin_publica.html' },
      { id: '3_12', title: 'Casos de automatización perioperatoria',                     duration: 60,  file: 'leccion_3_12_perioperatoria.html' },
      { id: '3_13', title: 'Automatización de procesos asistenciales integrados',        duration: 88,  file: 'leccion_3_13_procesos_integrados.html' },
      { id: '3_14', title: 'Simulación de flujos clínico-asistenciales',                 duration: 70,  file: 'leccion_3_14_simulacion.html' },
    ]
  },
  {
    id: 4,
    title: 'Creación y personalización segura de modelos de IA',
    color: '#AB47BC',
    colorDim: 'rgba(171,71,188,0.15)',
    icon: '🔬',
    hours: 10,
    lessons: [
      { id: '4_1',  title: 'Fundamentos de entrenamiento en salud',                      duration: 62,  file: 'leccion_4_1_fundamentos_entrenamiento.html' },
      { id: '4_2',  title: 'Aplicaciones por rol sanitario y especialidad',              duration: 74,  file: 'leccion_4_2_aplicaciones_rol.html' },
      { id: '4_3',  title: 'Playground de OpenAI: configuración avanzada',               duration: 49,  file: 'leccion_4_3_playground_openai.html' },
      { id: '4_4',  title: 'Integración con wearables e IoT clínico',                    duration: 62,  file: 'leccion_4_4_wearables_iot.html' },
      { id: '4_5',  title: 'Validación clínica cruzada',                                 duration: 41,  file: 'leccion_4_5_validacion_cruzada.html' },
      { id: '4_6',  title: 'Marco normativo completo',                                   duration: 82,  file: 'leccion_4_6_marco_normativo.html' },
      { id: '4_7',  title: 'Personalización sin código con fuentes verificadas',         duration: 49,  file: 'leccion_4_7_personalizacion_nocode.html' },
      { id: '4_8',  title: 'Actualización continua y mantenimiento',                     duration: 49,  file: 'leccion_4_8_actualizacion_mantenimiento.html' },
      { id: '4_9',  title: 'Liderazgo en transformación digital sanitaria',              duration: 62,  file: 'leccion_4_9_liderazgo_digital.html' },
      { id: '4_10', title: 'Uso legal y ético de datos clínicos',                        duration: 74,  file: 'leccion_4_10_datos_clinicos.html' },
    ]
  },
  {
    id: 5,
    title: 'Casos prácticos avanzados y flujos de acción',
    color: '#EF5350',
    colorDim: 'rgba(239,83,80,0.15)',
    icon: '🏥',
    hours: 16,
    lessons: [
      { id: '5_1',  title: 'Marco normativo español y europeo',                          duration: 72,  file: 'leccion_5_1_marco_normativo.html' },
      { id: '5_2',  title: 'Gobernanza ética y gestión de riesgos',                      duration: 87,  file: 'leccion_5_2_gobernanza_riesgos.html' },
      { id: '5_3',  title: 'Optimización avanzada para diagnóstico diferencial',         duration: 96,  file: 'leccion_5_3_diagnostico_diferencial.html' },
      { id: '5_4',  title: 'Personalización por especialidad',                           duration: 72,  file: 'leccion_5_4_personalizacion_especialidad.html' },
      { id: '5_5',  title: 'Escriba virtual con memoria persistente',                    duration: 58,  file: 'leccion_5_5_escriba_virtual.html' },
      { id: '5_6',  title: 'IA en triage de urgencias',                                  duration: 58,  file: 'leccion_5_6_triage_urgencias.html' },
      { id: '5_7',  title: 'Automatización de informes clínicos',                        duration: 48,  file: 'leccion_5_7_informes_clinicos.html' },
      { id: '5_8',  title: 'Integración completa con HCE',                               duration: 87,  file: 'leccion_5_8_integracion_hce.html' },
      { id: '5_9',  title: 'Análisis económico del impacto',                             duration: 72,  file: 'leccion_5_9_roi_economico.html' },
      { id: '5_10', title: 'Casos interactivos multidisciplinares',                      duration: 72,  file: 'leccion_5_10_casos_multidisciplinares.html' },
      { id: '5_11', title: 'Role-playing y simulación en tiempo real',                   duration: 72,  file: 'leccion_5_11_roleplay_simulacion.html' },
      { id: '5_12', title: 'Medición de impacto real',                                   duration: 72,  file: 'leccion_5_12_medicion_impacto.html' },
      { id: '5_13', title: 'Contratación y auditoría de herramientas',                   duration: 96,  file: 'leccion_5_13_contratacion_auditoria.html' },
    ]
  },
  {
    id: 6,
    title: 'Herramientas y despliegue de aplicaciones',
    color: '#FF8F00',
    colorDim: 'rgba(255,143,0,0.15)',
    icon: '🛠️',
    hours: 8,
    lessons: [
      { id: '6_1',  title: 'Fundamentos del despliegue moderno: CI/CD y JAMstack',       duration: 45,  file: 'herramientas_1_cicd_jamstack.html' },
      { id: '6_2',  title: 'Control de versiones con Git',                               duration: 40,  file: 'herramientas_2_control_de_versiones_con_git.html' },
      { id: '6_3',  title: 'Despliegue con plataformas modernas',                        duration: 45,  file: 'herramientas_3_despliegue_con_plataformas_mod.html' },
      { id: '6_4',  title: 'Backend como servicio con Supabase',                         duration: 50,  file: 'herramientas_4_backend_como_servicio_con_supa.html' },
      { id: '6_5',  title: 'Terminal y Bash',                                            duration: 55,  file: 'herramientas_5_terminal_y_bash.html' },
      { id: '6_6',  title: 'Build y carpeta dist',                                       duration: 35,  file: 'herramientas_6_build_y_carpeta_dist.html' },
      { id: '6_7',  title: 'Flujo completo de despliegue',                               duration: 40,  file: 'herramientas_7_flujo_completo_de_despliegue.html' },
      { id: '6_8',  title: 'Apps móviles con Capacitor',                                 duration: 45,  file: 'herramientas_8_apps_moviles_con_capacitor.html' },
      { id: '6_9',  title: 'Debugging y problemas reales',                               duration: 50,  file: 'herramientas_9_debugging_y_problemas_reales.html' },
      { id: '6_10', title: 'Buenas prácticas y mantenimiento',                           duration: 40,  file: 'herramientas_10_buenas_practicas_y_mantenimien.html' },
      { id: '6_11', title: 'Proyecto final guiado',                                      duration: 240, file: 'herramientas_11_proyecto_final_guiado.html' },
    ]
  }
]

export const getTotalLessons = () => MODULES.reduce((a, m) => a + m.lessons.length, 0)
export const getTotalHours = () => MODULES.reduce((a, m) => a + m.hours, 0)
export const getModuleById = (id) => MODULES.find(m => m.id === id)
export const getLessonById = (lessonId) => {
  for (const m of MODULES) {
    const l = m.lessons.find(l => l.id === lessonId)
    if (l) return { lesson: l, module: m }
  }
  return null
}

// Devuelve si un módulo está desbloqueado dado el progreso del alumno
// Regla: módulo N desbloqueado si módulo N-1 tiene todas sus lecciones completadas
export const isModuleUnlocked = (moduleId, completedLessons) => {
  if (moduleId === 1) return true
  const prevModule = MODULES.find(m => m.id === moduleId - 1)
  if (!prevModule) return false
  return prevModule.lessons.every(l => completedLessons.includes(l.id))
}

export const getModuleProgress = (moduleId, completedLessons) => {
  const mod = MODULES.find(m => m.id === moduleId)
  if (!mod) return { completed: 0, total: 0, percent: 0 }
  const completed = mod.lessons.filter(l => completedLessons.includes(l.id)).length
  return { completed, total: mod.lessons.length, percent: Math.round((completed / mod.lessons.length) * 100) }
}
