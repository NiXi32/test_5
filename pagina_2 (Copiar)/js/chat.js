document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const icon = document.getElementById('chatbot-icon');
    const window = document.getElementById('chatbot-window');
    const messagesContainer = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    
    // Mostrar/ocultar ventana
    icon.addEventListener('click', function() {
        window.classList.toggle('visible');
    });

    // Respuestas del bot (catastro)
    const botResponses = {
    // Saludos institucionales
    "hola": "Buen día. Soy su asistente virtual de la Tesorería Municipal. ¿En qué trámite o consulta tributaria necesita ayuda? Puedo asistirle con:\n\n• Pagos de impuestos\n• Consulta de adeudos\n• Facturación municipal\n• Beneficios fiscales",
    
    "buenos días": "Buenos días. ¿Desea realizar algún trámite tributario hoy? Le puedo guiar en:\n\n• Calendario de pagos\n• Requisitos para declaraciones\n• Ubicación de módulos de atención",

    // Consultas de pagos
    "cómo pagar mis impuestos": "**Opciones para pagar sus impuestos municipales:**\n\n1. **En línea:**\n   - Portal [Pagos Digitales](https://pagos.municipio.gob.mx)\n   - App MiMunicipio (disponible en iOS/Android)\n2. **Presencial:**\n   - Tesorería Municipal (horario: 8:00-15:00 hrs)\n   - Bancos autorizados (consulte lista en [Bancos Autorizados](https://ejemplo.com/bancos))\n\n*Todos los pagos generan comprobante fiscal válido.*",

    "fechas para pagar predial": "**Calendario de pagos 2024 - Impuesto Predial:**\n\n• **Pago anticipado (10% descuento):** 1 enero - 31 marzo\n• **Pago normal:** 1 abril - 31 diciembre\n• **Pagos parciales:** Máximo 4 pagos al año\n\n*Evite recargos del 3% mensual por pagos extemporáneos.*",

    // Trámites y documentos
    "sacar una factura municipal": "**Para generar facturas municipales:**\n\n1. Registre su negocio en el [Sistema de Facturación](https://facturas.municipio.gob.mx)\n2. Requisitos:\n   - RFC\n   - Comprobante de domicilio\n   - Firma electrónica (FIEL)\n3. Costo: $25 por folio o paquete de 100 folios por $1,800\n\n*Tiempo de procesamiento:* 48 horas hábiles.",

    "consultar mis pagos anteriores": "**Para ver su historial de pagos:**\n\n1. Ingrese a [Mi Cuenta Fiscal](https://micuenta.municipio.gob.mx)\n2. Proporcione:\n   - RFC o CURP\n   - Clave catastral (para predial)\n3. Seleccione el año a consultar\n\n*Podrá descargar comprobantes en PDF desde 2015.*",

    // Beneficios y descuentos
    "descuentos para adultos mayores": "**Beneficios fiscales para adultos mayores:**\n\n• 50% de descuento en:\n  - Predial\n  - Derechos por servicios\n• Requisitos:\n   - INE que acredite 65+ años\n   - Comprobante de domicilio\n   - Solicitud llena (Formato DESC-AM-2024)\n\n*Válido para uso habitacional único.*",

    "programas de apoyo fiscal": "**Incentivos fiscales 2024:**\n\n1. **PyMEs:**\n   - 25% descuento en ISR primer año\n   - Ampliación a 3 años para negocios sustentables\n2. **Reactivación económica:**\n   - 6 meses sin multas por pagos tardíos\n   - Planes de pagos a 12 meses sin intereses\n\n*Más información:* [Programas de Apoyo](https://ejemplo.com/programas)",

    // Multas y regularización
    "qué pasa si no pago a tiempo": "**Consecuencias por mora en pagos:**\n\n1. **Recargos:**\n   - 3% mensual sobre el adeudo\n   - Máximo acumulable: 36%\n2. **Multas:**\n   - 10-30% del valor omitido\n3. **Restricciones:**\n   - Bloqueo de trámites municipales\n   - Embargo de cuentas después de 1 año\n\n*Regularice su situación sin multas este trimestre.*",

    "cómo regularizar mis impuestos": "**Proceso de regularización fiscal:**\n\n1. Solicite diagnóstico en Tesorería\n2. Opciones:\n   - **Pago único** (con 15% descuento en multas)\n   - **Plan de pagos** (hasta 24 meses)\n3. Documentación:\n   - Identificación oficial\n   - Comprobantes de ingresos\n   - RFC\n\n*Asesoría gratuita en módulos de regularización.*",

    // Información general
    "horarios de atención": "**Atención al contribuyente:**\n\n• **Oficinas centrales:**\n   - Lunes a viernes: 8:00 - 15:00 hrs\n   - Sábados: 9:00 - 13:00 hrs (solo pagos)\n• **Teléfono:** 555-100-2000\n• **WhatsApp:** 55-1234-5678\n\n*Módulos especiales en temporada de pago predial.*",

    "dónde están las oficinas": "**Ubicación de módulos de atención:**\n\n1. **Tesorería Principal:**\n   - Av. Juárez #100, Centro\n   - Estacionamiento gratuito\n2. **Módulos periféricos:**\n   - Consulta el más cercano en [Mapa de Oficinas](https://ejemplo.com/mapa)\n\n*Citas previas disponibles en línea.*",

    // Consultas técnicas
    "cómo se calcula el predial": "**Fórmula de cálculo del predial:**\n\n1. Determine:\n   - Valor catastral del inmueble\n   - Tasa aplicable (0.5%-1.8% según zona)\n2. Aplique:\n   - Descuentos por pronto pago\n   - Recargos por mora (si aplica)\n\n*Simule su pago:* [Calculadora Predial](https://ejemplo.com/calculadora)",

    "qué documentos necesito para un trámite": "**Documentación básica para trámites:**\n\n• **Personas físicas:**\n   - INE\n   - RFC\n   - Comprobante de domicilio\n• **Personas morales:**\n   - Acta constitutiva\n   - Poder notarial\n   - Identificación del representante\n\n*Consulte requisitos específicos por trámite.*",

    // Default
    "default": "No reconocí su consulta. Por favor seleccione una opción:\n\n• 'Pagos de impuestos'\n• 'Facturación'\n• 'Multas y recargos'\n• 'Beneficios fiscales'\n\nO contacte a un asesor al 555-123-4567 de lunes a viernes de 8:00 a 15:00 hrs."
};

    // Añadir mensaje al chat
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Manejar envío de mensajes
    function handleSendMessage() {
        const userText = userInput.value.trim();
        if (!userText) return;
        
        addMessage(userText, true);
        userInput.value = '';
        
        setTimeout(() => {
            const botText = botResponses[userText.toLowerCase()] || botResponses["default"];
            addMessage(botText, false);
        }, 500);
    }

    // Eventos
    sendButton.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleSendMessage());

    // Mensaje inicial (solo primera vez)
    let firstOpen = true;
    icon.addEventListener('click', () => {
        if (firstOpen) {
            setTimeout(() => {
                addMessage("¡Hola! Pregúntame sobre trámites catastrales. Ejemplo: '¿Cómo pagar el predial?'", false);
            }, 300);
            firstOpen = false;
        }
    }, { once: true });
});