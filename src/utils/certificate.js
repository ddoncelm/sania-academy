export function generateCertificate({ moduleTitle, moduleId, verificationCode, color, userName = 'Participante' }) {
  // Carga jsPDF dinámicamente
  import('jspdf').then(({ jsPDF }) => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
    const W = 297, H = 210

    // Fondo
    doc.setFillColor(12, 13, 18)
    doc.rect(0, 0, W, H, 'F')

    // Borde decorativo
    doc.setDrawColor(...hexToRgb(color))
    doc.setLineWidth(1.5)
    doc.rect(8, 8, W - 16, H - 16)
    doc.setLineWidth(0.3)
    doc.rect(11, 11, W - 22, H - 22)

    // Cabecera
    doc.setTextColor(...hexToRgb(color))
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('SanIA DoncelProject Academy', W / 2, 28, { align: 'center' })

    doc.setTextColor(176, 190, 197)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text('Formación en Inteligencia Artificial para Sanitarios', W / 2, 35, { align: 'center' })

    // Línea separadora
    doc.setDrawColor(...hexToRgb(color))
    doc.setLineWidth(0.5)
    doc.line(40, 42, W - 40, 42)

    // Título del certificado
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.text('CERTIFICADO DE SUPERACIÓN', W / 2, 65, { align: 'center' })

    // Texto principal
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(176, 190, 197)
    doc.text('Se certifica la superación satisfactoria del', W / 2, 82, { align: 'center' })

    // Módulo
    doc.setTextColor(...hexToRgb(color))
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text(`Módulo ${moduleId}: ${moduleTitle}`, W / 2, 100, { align: 'center', maxWidth: W - 60 })

    // Descripción
    doc.setTextColor(176, 190, 197)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(
      'incluidos los conocimientos teóricos, casos prácticos y evaluaciones correspondientes.',
      W / 2, 116, { align: 'center' }
    )

    // Fecha
    const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    doc.setTextColor(84, 110, 122)
    doc.setFontSize(9)
    doc.text(`Emitido el ${fecha}`, W / 2, 135, { align: 'center' })

    // Línea inferior
    doc.setDrawColor(...hexToRgb(color))
    doc.setLineWidth(0.3)
    doc.line(40, 145, W - 40, 145)

    // Firma / emisor
    doc.setTextColor(...hexToRgb(color))
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('DoncelProject', 70, 162, { align: 'center' })
    doc.setTextColor(84, 110, 122)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.text('doncel.project@gmail.com', 70, 168, { align: 'center' })

    // Código de verificación
    doc.setFillColor(19, 21, 30)
    doc.roundedRect(W - 120, 152, 100, 22, 4, 4, 'F')
    doc.setTextColor(84, 110, 122)
    doc.setFontSize(7)
    doc.text('CÓDIGO DE VERIFICACIÓN', W - 70, 158, { align: 'center' })
    doc.setTextColor(...hexToRgb(color))
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(verificationCode, W - 70, 167, { align: 'center' })

    // Pie
    doc.setTextColor(55, 71, 79)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text('SanIA DoncelProject Academy · Formación en IA para Sanitarios · doncel.project@gmail.com', W / 2, 196, { align: 'center' })

    doc.save(`certificado-modulo-${moduleId}-sania-academy.pdf`)
  })
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}
