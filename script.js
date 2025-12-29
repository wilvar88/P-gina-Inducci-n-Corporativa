// =============================================================================
// VARIABLES GLOBALES - ESTAS VARIABLES SE USAN EN TODA LA APLICACIÓN
// =============================================================================

// VARIABLE PARA SABER EN QUÉ POSICIÓN ESTÁ EL CARRUSEL
let posicionCarrusel = 0;

// ARRAY QUE CONTIENE TODOS LOS VIDEOS DISPONIBLES
let videos = [];

// VARIABLE PARA SABER QUÉ CATEGORÍA ESTÁ SELECCIONADA ACTUALMENTE
let categoriaActual = 'todos';

// VARIABLE PARA SABER SI EL CAMPO DE URL ESTÁ ABIERTO O CERRADO
let campoUrlAbierto = false;

// VARIABLE PARA SABER SI SE HA VISTO UN VIDEO EN LA CATEGORÍA ACTUAL
let videoVistoEnCategoria = false;

// SET PARA ALMACENAR LOS IDs DE LOS VIDEOS VISTOS (EVITA DUPLICADOS)
let videosVistos = new Set();

// =============================================================================
// CONFIGURACIÓN DE CATEGORÍAS (LINKS Y BOTONES)
// =============================================================================
/*
    INSTRUCCIONES PARA PERSONALIZAR LOS LINKS:
    
    Cada categoría tiene su propia configuración dentro del objeto 'configCategorias'.
    Para cambiar los links de una categoría específica, busca el nombre de la categoría
    (ej: 'capacitacion', 'seguridad') y modifica los valores de 'externalUrl' y 'actionButton'.

    - externalUrl: Es el link que se abre con el botón "Plataforma Externa".
    - externalText: Es el texto que aparece en el botón "Plataforma Externa".
    - actionButton: Configuración del botón secundario (el que se habilita al ver un video).
        - text: Texto del botón secundario.
        - url: Link que se abre con el botón secundario.

    EJEMPLO:
    Si quieres cambiar el link de seguridad a "https://misitio.com/seguridad", modifica:
    'seguridad': {
        externalUrl: 'https://misitio.com/seguridad',
        ...
    }
*/
const configCategorias = {
    'todos': {
        externalUrl: 'https://recaudobogota.buk.co/static_pages/portal',
        externalText: 'Portal Buk',
        actionButton: {
            text: 'Plataforma Buk',
            url: 'https://recaudobogota.buk.co/users/sign_in'
        }
    },
    'hse': {
        externalUrl: 'https://recaudobogota.buk.co/capacitaciones/lms_course/1117791/lms_chapter/12078903/preview#lmsTopicAttendee=15199099',
        externalText: 'Curso Completo en BUK',
        actionButton: {
            text: 'Evaluación Moodle',
            url: 'https://moodle.rbsas.co/login/'
        }
    },
    'tecnologia': { // Seguridad Informática
        externalUrl: 'https://recaudobogota.buk.co/capacitaciones/lms_course/1029084/lms_chapter/10305219/preview#lmsTopicAttendee=12473085',
        externalText: 'Curso Completo en Buk',
        actionButton: {
            text: 'Evaluación Moodle',
            url: 'https://moodle.rbsas.co/login/'
        }
    },
    'seguridad': { // Seguridad Física
        externalUrl: 'https://recaudobogota.buk.co/capacitaciones/lms_course/1110981/lms_chapter/10329478/preview#lmsTopicAttendee=12503867',
        externalText: 'Curso Completo en Buk',
        actionButton: {
            text: 'Evaluación Moodle',
            url: 'https://moodle.rbsas.co/login/'
        }
    },
    'compras': {
        externalUrl: 'https://recaudobogota.buk.co/capacitaciones/lms_course/1111190/lms_chapter/10352326/preview#lmsTopicAttendee=12547223',
        externalText: 'Curso Completo en Buk',
        actionButton: {
            text: 'Evaluación Moodle',
            url: 'https://moodle.rbsas.co/login/'
        }
    },
    'contratos': {
        externalUrl: 'https://recaudobogota.buk.co/capacitaciones/lms_course/1009976/lms_chapter/10328744/preview#lmsTopicAttendee=12502318',
        externalText: 'Curso Completo en Buk',
        actionButton: {
            text: 'Evaluación Moodle',
            url: 'https://moodle.rbsas.co/login/'
        }
    },
    'gobierno': {
        externalUrl: 'https://recaudobogota.buk.co/capacitaciones/lms_course/1110971/lms_chapter/10329454/preview#lmsTopicAttendee=12503770',
        externalText: 'Curso Completo en Buk',
        actionButton: {
            text: 'Evaluación Moodle',
            url: 'https://moodle.rbsas.co/login/'
        }
    },
    'bienestar': {
        externalUrl: 'https://recaudobogota.buk.co/benefits',
        externalText: 'Curso Completo en Buk',
        actionButton: {
            text: 'Evaluación Moodle',
            url: 'https://moodle.rbsas.co/login/'
        }
    },
    'bienvenida': {
        externalUrl: 'https://recaudobogota.buk.co/benefits',
        externalText: 'Curso Completo en Buk',
        actionButton: {
            text: 'Evaluación Moodle',
            url: 'https://moodle.rbsas.co/login/'
        }
    }
};

// =============================================================================
// CONFIGURACIÓN DE VIDEOS - AQUÍ AGREGAS TUS VIDEOS REALES
// =============================================================================

// ARRAY CON TODOS LOS VIDEOS QUE SE MOSTRARÁN EN LA GALERÍA
// PUEDES AGREGAR MÁS VIDEOS SIGUIENDO ESTA ESTRUCTURA
// ARRAY CON TODOS LOS VIDEOS QUE SE MOSTRARÁN EN LA GALERÍA
// CADA VIDEO TIENE UNA LISTA DE 'ROLES' QUE PUEDEN VERLO.
// ROLES DISPONIBLES: 'admin_jefe', 'admin_otro', 'op_tecnico', 'op_otro'
// SI UN VIDEO ES PARA TODOS, AGREGA TODOS LOS ROLES.
const videosBase = [
    // =========================================================================
    // CATEGORÍA: BIENVENIDA (VISIBLE PARA TODOS)
    // =========================================================================
    {
        id: 1,
        titulo: "Inducción Corporativa RB",
        descripcion: "Video introductorio sobre la empresa, misión, visión y valores.",
        categoria: "bienvenida",
        tipo: "drive",
        url: "https://drive.google.com/file/d/1dFfBkMjmj4kT9VCFzPoDiB4hr_CtR-3I/preview",
        thumbnail: "assets/Imagenes bienvenida Inducción Corporativa.jpg",
        roles: ['admin_jefe', 'admin_otro', 'op_tecnico', 'op_otro']
    },

    // =========================================================================
    // CATEGORÍA: HSE (SALUD, SEGURIDAD Y AMBIENTE)
    // =========================================================================
    {
        id: 101,
        titulo: "Política HSE - Administrativos",
        descripcion: "Normas de seguridad y ergonomía en oficinas.",
        categoria: "hse",
        tipo: "drive",
        url: "https://drive.google.com/file/d/1ev-HobeUrzIfvYrfML5iOwRqiTqM2JxU/preview", // REEMPLAZAR LINK
        thumbnail: "assets/HSE Caratula.jpg", // REEMPLAZAR IMAGEN
        roles: ['admin_jefe', 'admin_otro']
    },
    {
        id: 102,
        titulo: "Política HSE - Operativos",
        descripcion: "Protocolos de seguridad en campo y uso de EPP.",
        categoria: "hse",
        tipo: "drive",
        url: "https://drive.google.com/file/d/1ev-HobeUrzIfvYrfML5iOwRqiTqM2JxU/preview", // REEMPLAZAR LINK
        thumbnail: "assets/HSE Caratula.jpg", // REEMPLAZAR IMAGEN
        roles: ['op_tecnico', 'op_otro']
    },

    // =========================================================================
    // CATEGORÍA: SEGURIDAD INFORMÁTICA (TECNOLOGÍA)
    // =========================================================================
    {
        id: 201,
        titulo: "Seguridad de la Información - Líderes",
        descripcion: "Gestión de accesos y clasificación de la información confidencial.",
        categoria: "tecnologia",
        tipo: "drive",
        url: "https://drive.google.com/file/d/19sCFR6ZV7o1WnJibUq2a2Ow0fScai7fZ/preview", // REEMPLAZAR LINK
        thumbnail: "assets/seguridad de la información.jpg", // REEMPLAZAR IMAGEN
        roles: ['admin_jefe']
    },
    {
        id: 202,
        titulo: "Ciberseguridad General",
        descripcion: "Buenas prácticas para contraseñas y phishing.",
        categoria: "tecnologia",
        tipo: "drive",
        url: "https://drive.google.com/file/d/19sCFR6ZV7o1WnJibUq2a2Ow0fScai7fZ/preview", // REEMPLAZAR LINK
        thumbnail: "assets/seguridad de la información.jpg", // REEMPLAZAR IMAGEN
        roles: ['admin_jefe', 'admin_otro', 'op_tecnico', 'op_otro']
    },

    // =========================================================================
    // CATEGORÍA: SEGURIDAD FÍSICA
    // =========================================================================
    {
        id: 301,
        titulo: "Control de Accesos Sede Principal",
        descripcion: "Procedimientos de ingreso y salida de la sede administrativa.",
        categoria: "seguridad",
        tipo: "drive",
        url: "https://drive.google.com/file/d/13HEyB0KikwhXH5IyVqpk7NxFprWVBrLV/preview", // REEMPLAZAR LINK
        thumbnail: "assets/sarlaft.jpg", // REEMPLAZAR IMAGEN
        roles: ['admin_jefe', 'admin_otro']
    },
    {
        id: 302,
        titulo: "Seguridad en Puntos de Recaudo",
        descripcion: "Protocolos de seguridad física en estaciones y taquillas.",
        categoria: "seguridad",
        tipo: "drive",
        url: "https://drive.google.com/file/d/13HEyB0KikwhXH5IyVqpk7NxFprWVBrLV/preview", // REEMPLAZAR LINK
        thumbnail: "assets/sarlaft.jpg", // REEMPLAZAR IMAGEN
        roles: ['op_tecnico', 'op_otro']
    },

    // =========================================================================
    // CATEGORÍA: COMPRAS (SOLO JEFE ADMINISTRATIVO)
    // =========================================================================
    {
        id: 401,
        titulo: "Proceso de Compras",
        descripcion: "Lineamientos para la adquisición de bienes y servicios.",
        categoria: "compras",
        tipo: "drive",
        url: "https://drive.google.com/file/d/1rUm7hXqbpRDlUeOZOpOOOlxRKOfhqToT/preview", // REEMPLAZAR LINK
        thumbnail: "assets/Proceso de Compras.jpg", // REEMPLAZAR IMAGEN
        roles: ['admin_jefe']
    },
    {
        id: 402,
        titulo: "Gestión de Proveedores",
        descripcion: "Proceso de selección y evaluación de proveedores.",
        categoria: "compras",
        tipo: "drive",
        url: "https://drive.google.com/file/d/1LyEMCPDj7Oxvnzf1qMLb_0hHnCoVPAX0/preview", // REEMPLAZAR LINK
        thumbnail: "assets/Gestión de Proveedores.jpg", // REEMPLAZAR IMAGEN
        roles: ['admin_jefe']
    },

    // =========================================================================
    // CATEGORÍA: CONTRATOS (SOLO JEFE ADMINISTRATIVO)
    // =========================================================================
    {
        id: 501,
        titulo: "Manual de Contratación",
        descripcion: "Tipos de contratos y flujos de aprobación.",
        categoria: "contratos",
        tipo: "drive",
        url: "https://drive.google.com/file/d/1SEVt_8HyWUb5aNSBBGryJgq1_lZjgquP/preview", // REEMPLAZAR LINK
        thumbnail: "assets/Gestión de Contratos.jpg", // REEMPLAZAR IMAGEN
        roles: ['admin_jefe']
    },

    // =========================================================================
    // CATEGORÍA: GOBIERNO CORPORATIVO (TODOS)
    // =========================================================================
    {
        id: 601,
        titulo: "Tratamiento de Datos",
        descripcion: "Principios éticos que rigen nuestro comportamiento.",
        categoria: "gobierno",
        tipo: "drive",
        url: "https://drive.google.com/file/d/1yKDC1pNXdG0PZURhBUdlmCGOf6xt3u5X/preview", // REEMPLAZAR LINK
        thumbnail: "assets/Gobierno Corporativo.jpg", // REEMPLAZAR IMAGEN
        roles: ['admin_jefe', 'admin_otro', 'op_tecnico', 'op_otro']
    },
    {
        id: 602,
        titulo: "Acoso Laboral y Sexual",
        descripcion: "Conoce nuestras politícas",
        categoria: "gobierno",
        tipo: "drive",
        url: "https://drive.google.com/file/d/1OptZSqPBHYQ0QV4dqIgj2yttB6uCLS_-/preview", // REEMPLAZAR LINK
        thumbnail: "assets/Acoso laboral y Sexual.jpg", // REEMPLAZAR IMAGEN
        roles: ['admin_jefe', 'admin_otro', 'op_tecnico', 'op_otro']
    },

    // =========================================================================
    // CATEGORÍA: BIENESTAR (TODOS)
    // =========================================================================
    {
        id: 701,
        titulo: "Beneficios Corporativos",
        descripcion: "Conoce los beneficios y convenios disponibles para ti.",
        categoria: "bienestar",
        tipo: "drive",
        url: "https://drive.google.com/file/d/TU_ID_DRIVE_AQUI/preview", // REEMPLAZAR LINK
        thumbnail: "assets/bienestar-beneficios.jpg", // REEMPLAZAR IMAGEN
        roles: ['admin_jefe', 'admin_otro', 'op_tecnico', 'op_otro']
    },
    {
        id: 702,
        titulo: "Actividades de Integración",
        descripcion: "Resumen de nuestras actividades de bienestar.",
        categoria: "bienestar",
        tipo: "drive",
        url: "https://drive.google.com/file/d/TU_ID_DRIVE_AQUI/preview", // REEMPLAZAR LINK
        thumbnail: "assets/bienestar-actividades.jpg", // REEMPLAZAR IMAGEN
        roles: ['admin_jefe', 'admin_otro', 'op_tecnico', 'op_otro']
    }
];

// =============================================================================
// INICIALIZACIÓN - ESTO SE EJECUTA CUANDO LA PÁGINA SE CARGA COMPLETAMENTE
// =============================================================================

// EVENTO QUE SE EJECUTA CUANDO TODO EL HTML ESTÁ CARGADO
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando aplicación de videos...'); // MENSAJE EN CONSOLA PARA DEPURACIÓN

    // INICIALIZAR LOS VIDEOS EN LA GALERÍA
    inicializarVideos();

    // CONFIGURAR EL CARRUSEL PARA QUE FUNCIONE CORRECTAMENTE
    configurarCarrusel();

    // CONFIGURAR LA BÚSQUEDA EN TIEMPO REAL (OPCIONAL)
    configurarBusqueda();

    console.log('✅ Aplicación iniciada correctamente');
});

// =============================================================================
// FUNCIONES DEL CARRUSEL - CONTROLAN EL MOVIMIENTO Y EFECTOS
// =============================================================================

// FUNCIÓN PARA MOVER EL CARRUSEL DE VIDEOS A LA SIGUIENTE POSICIÓN
function siguienteVideo() {
    if (videos.length === 0) return;

    posicionCarrusel = (posicionCarrusel + 1) % videos.length;
    actualizarPosicionCarrusel();
}

// FUNCIÓN PARA MOVER EL CARRUSEL DE VIDEOS A LA POSICIÓN ANTERIOR
function anteriorVideo() {
    if (videos.length === 0) return;

    posicionCarrusel = (posicionCarrusel - 1 + videos.length) % videos.length;
    actualizarPosicionCarrusel();
}

// FUNCIÓN PARA ACTUALIZAR LA POSICIÓN VISUAL DEL CARRUSEL
function actualizarPosicionCarrusel() {
    const track = document.getElementById('videoTrack');
    const cards = track.querySelectorAll('.video-card-carrusel');

    // CALCULAR LA POSICIÓN CENTRAL Y DISTRIBUIR LAS DEMAS
    const totalCards = cards.length;

    cards.forEach((card, index) => {
        // CALCULAR LA DIFERENCIA DE POSICIÓN RESPECTO AL CENTRO
        let diff = index - posicionCarrusel;

        // AJUSTAR PARA QUE SIEMPRE ESTÉ EN EL RANGO -2 A 2 (EFECTO 360°)
        if (diff > 2) diff = diff - totalCards;
        if (diff < -2) diff = diff + totalCards;

        // APLICAR LAS CLASES DE POSICIÓN
        card.className = 'video-card-carrusel';

        if (diff === 0) {
            card.classList.add('posicion-0'); // CENTRO
        } else if (diff === 1 || diff === -4) {
            card.classList.add('posicion-1'); // DERECHA
        } else if (diff === -1 || diff === 4) {
            card.classList.add('posicion-4'); // IZQUIERDA
        } else if (diff === 2 || diff === -3) {
            card.classList.add('posicion-2'); // EXTREMA DERECHA
        } else if (diff === -2 || diff === 3) {
            card.classList.add('posicion-3'); // EXTREMA IZQUIERDA
        }
    });

    // ACTUALIZAR EL CONTADOR DE VIDEOS
    document.getElementById('videoActualNumero').textContent = posicionCarrusel + 1;
}

// FUNCIÓN PARA CONFIGURAR EL COMPORTAMIENTO DEL CARRUSEL
function configurarCarrusel() {
    console.log('Configurando carrusel...');

    // OBTENER EL CONTENEDOR Y TODOS LOS ITEMS DEL CARRUSEL
    const track = document.getElementById('carruselTrack');
    const items = track.querySelectorAll('.categoria-item-vertical');

    // AGREGAR EVENTO CLICK A CADA ITEM DEL CARRUSEL
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            console.log(`Click en categoría: ${item.dataset.categoria}`);

            // ACTUALIZAR LA POSICIÓN ACTUAL
            posicionCarrusel = index;

            // QUITAR ACTIVE DE TODOS Y PONERLO AL ACTUAL
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // FILTRAR VIDEOS POR LA CATEGORÍA SELECCIONADA
            const categoria = item.dataset.categoria;
            filtrarPorCategoria(categoria);
        });
    });

    console.log('Carrusel configurado correctamente');
}

// =============================================================================
// FUNCIONES DE FILTRADO - MUESTRAN SOLO LOS VIDEOS DE LA CATEGORÍA SELECCIONADA
// =============================================================================

// FUNCIÓN PARA FILTRAR VIDEOS POR CATEGORÍA Y ROL
function filtrarPorCategoria(categoria) {
    console.log(`Filtrando videos por categoría: ${categoria} para rol: ${userProfile.subRole}`);

    // GUARDAR LA CATEGORÍA ACTUAL PARA USO POSTERIOR
    categoriaActual = categoria;

    // RESETEAR ESTADO DE VIDEO VISTO
    videoVistoEnCategoria = false;
    actualizarBotonesCategoria();

    // MOSTRAR INDICADOR DE CARGA
    mostrarLoading();

    // SIMULAR CARGA CON SETTIMEOUT PARA DAR EFECTO DE PROCESAMIENTO
    setTimeout(() => {
        // FILTRAR VIDEOS
        videos = videosBase.filter(video => {
            // 1. FILTRO POR CATEGORÍA
            const coincideCategoria = (categoria === 'todos') ? true : (video.categoria === categoria);

            // 2. FILTRO POR ROL (SI EL USUARIO TIENE ROL ASIGNADO)
            let coincideRol = true;
            if (userProfile.subRole) {
                // Si el video tiene roles definidos, verificar si el rol del usuario está incluido
                if (video.roles && Array.isArray(video.roles)) {
                    coincideRol = video.roles.includes(userProfile.subRole);
                }
            }

            return coincideCategoria && coincideRol;
        });

        // VOLVER A RENDERIZAR LOS VIDEOS CON EL FILTRO APLICADO
        renderizarVideos();

        // OCULTAR INDICADOR DE CARGA
        ocultarLoading();

        console.log(`Videos filtrados: ${videos.length}`);
    }, 500); // MEDIO SEGUNDO DE ESPERA PARA EFECTO VISUAL
}

// FUNCIÓN PARA ACTUALIZAR TEXTOS Y ESTADOS DE LOS BOTONES
function actualizarBotonesCategoria() {
    const config = configCategorias[categoriaActual] || configCategorias['todos'];

    // ACTUALIZAR BOTÓN EXTERNO
    const btnExterno = document.getElementById('btnPlataformaExterna');
    const txtExterno = document.getElementById('textoPlataformaExterna');
    txtExterno.textContent = config.externalText;

    // ACTUALIZAR BOTÓN DE ACCIÓN
    const btnAccion = document.getElementById('btnAccion');
    const txtAccion = document.getElementById('textoAccion');
    txtAccion.textContent = config.actionButton.text;

    // RESETEAR ESTADO DEL BOTÓN DE ACCIÓN
    btnAccion.disabled = true;
    btnAccion.style.opacity = '0.5';
    btnAccion.style.pointerEvents = 'none';
}

// =============================================================================
// FUNCIONES DE RENDERIZADO - DIBUJAN LOS ELEMENTOS EN LA PANTALLA
// =============================================================================

// FUNCIÓN PARA INICIALIZAR Y MOSTRAR LOS VIDEOS POR PRIMERA VEZ
function inicializarVideos() {
    console.log('Inicializando videos...');

    // MOSTRAR INDICADOR DE CARGA MIENTRAS SE PREPARAN LOS VIDEOS
    mostrarLoading();

    // SIMULAR CARGA INICIAL CON UN PEQUEÑO RETRASO
    setTimeout(() => {
        // COPIAR TODOS LOS VIDEOS BASE AL ARRAY DE VIDEOS ACTUALES
        videos = [...videosBase];

        // DIBUJAR LOS VIDEOS EN LA PANTALLA
        renderizarVideos();

        // OCULTAR INDICADOR DE CARGA
        ocultarLoading();

        console.log(`Videos inicializados: ${videos.length}`);
    }, 1000); // 1 SEGUNDO DE ESPESA PARA EFECTO DE CARGA
}

// FUNCIÓN PARA DIBUJAR TODOS LOS VIDEOS EN EL CARRUSEL 360°
function renderizarVideos() {
    console.log('Renderizando videos en carrusel 360°...');

    // OBTENER EL CONTENEDOR DEL CARRUSEL DE VIDEOS
    const videoTrack = document.getElementById('videoTrack');
    const indicadores = document.getElementById('indicadores');

    // LIMPIAR CONTENIDO ANTERIOR
    videoTrack.innerHTML = '';
    indicadores.innerHTML = '';

    // SI NO HAY VIDEOS, MOSTRAR MENSAJE AMIGABLE
    if (videos.length === 0) {
        videoTrack.innerHTML = `
            <div class="sin-resultados-carrusel">
                <i class="fas fa-video-slash"></i>
                <p>No hay videos disponibles en esta categoría.</p>
            </div>
        `;
        return;
    }

    // CREAR HTML PARA CADA VIDEO USANDO MAP
    const videosHTML = videos.map((video, index) => {
        // VERIFICAR SI EL VIDEO YA FUE VISTO
        const isWatched = videosVistos.has(video.id);
        const watchedClass = isWatched ? 'watched' : '';

        return `
        <div class="video-card-carrusel ${watchedClass}" onclick="abrirVideo(${video.id}, this)">
            <div class="video-contenido">
                <div class="video-miniatura">
                    <img src="${video.thumbnail}" alt="${video.titulo}" loading="lazy">
                    <div class="play-icon-mini">
                        <i class="fas fa-play"></i>
                    </div>
                    <!-- INDICADOR DE VISTO -->
                    <div class="watched-indicator">
                        <i class="fas fa-check"></i>
                    </div>
                </div>
                <h3 class="video-titulo-mini">${video.titulo}</h3>
                <p class="video-desc-mini">${video.descripcion}</p>
            </div>
        </div>
    `}).join(''); // JOIN PARA CONVERTIR ARRAY A STRING

    // INSERTAR EL HTML EN EL CONTENEDOR
    videoTrack.innerHTML = videosHTML;

    // CREAR INDICADORES PARA CADA VIDEO
    videos.forEach((_, index) => {
        const indicador = document.createElement('div');
        indicador.className = 'indicador';
        if (index === 0) indicador.classList.add('activo');
        indicador.onclick = () => irAVideo(index);
        indicadores.appendChild(indicador);
    });

    // REINICIAR LA POSICIÓN Y ACTUALIZAR EL CARRUSEL
    posicionCarrusel = 0;
    actualizarPosicionCarrusel();

    // REINICIAR LA ROTACIÓN AUTOMÁTICA
    detenerRotacionAutomatica();
    iniciarRotacionAutomatica();

    // ACTUALIZAR EL CONTADOR DE VIDEOS
    document.getElementById('totalVideos').textContent = videos.length;

    console.log(`Videos renderizados en carrusel: ${videos.length}`);
}

// FUNCIÓN PARA IR A UN VIDEO ESPECÍFICO
function irAVideo(index) {
    posicionCarrusel = index;
    actualizarPosicionCarrusel();

    // REINICIAR EL TEMPORIZADOR DE ROTACIÓN
    detenerRotacionAutomatica();
    iniciarRotacionAutomatica();
}

// =============================================================================
// FUNCIONES DE VIDEO - CONTROLAN LA APERTURA Y CIERRE DEL MODAL
// =============================================================================

// FUNCIÓN PARA ABRIR UN VIDEO ESPECÍFICO EN EL MODAL
// FUNCIÓN PARA ABRIR UN VIDEO ESPECÍFICO EN EL MODAL
function abrirVideo(videoId, element) {
    console.log(`Abriendo video con ID: ${videoId}`);

    // SI SE PASÓ EL ELEMENTO, APLICAR ANIMACIÓN
    if (element) {
        // AÑADIR CLASE PARA ANIMACIÓN
        element.classList.add('flipping');

        // ESPERAR A QUE TERMINE LA ANIMACIÓN (800ms)
        setTimeout(() => {
            mostrarModalVideo(videoId);
            // QUITAR LA CLASE DESPUÉS DE QUE SE ABRA EL MODAL
            setTimeout(() => {
                element.classList.remove('flipping');
            }, 500);
        }, 800);
    } else {
        // SI NO HAY ELEMENTO (EJ: LLAMADA DIRECTA), ABRIR INMEDIATAMENTE
        mostrarModalVideo(videoId);
    }
}

// FUNCIÓN AUXILIAR PARA MOSTRAR EL MODAL (LÓGICA ORIGINAL DE abrirVideo)
function mostrarModalVideo(videoId) {
    // BUSCAR EL VIDEO EN EL ARRAY POR SU ID
    const video = videos.find(v => v.id === videoId);

    // SI NO SE ENCUENTRA EL VIDEO, NO HACER NADA
    if (!video) {
        console.error('Video no encontrado:', videoId);
        return;
    }

    // OBTENER ELEMENTOS DEL MODAL
    const modal = document.getElementById('modalVideo');
    const frame = document.getElementById('videoFrame');
    const titulo = document.getElementById('videoTitulo');
    const descripcion = document.getElementById('videoDescripcion');

    // CONFIGURAR EL VIDEO EN EL MODAL
    frame.src = video.url;
    titulo.textContent = video.titulo;
    descripcion.textContent = video.descripcion;

    // MOSTRAR EL MODAL
    modal.style.display = 'flex';

    // EVITAR QUE LA PÁGINA SE PUEDA SCROLLAR MIENTRAS SE VE EL VIDEO
    document.body.style.overflow = 'hidden';

    console.log(`Video abierto: ${video.titulo}`);

    // MARCAR QUE SE HA VISTO UN VIDEO Y HABILITAR EL BOTÓN DE ACCIÓN
    videoVistoEnCategoria = true;

    // AGREGAR EL VIDEO A LA LISTA DE VISTOS
    if (!videosVistos.has(videoId)) {
        videosVistos.add(videoId);
        console.log(`Video ${videoId} marcado como visto`);

        // ACTUALIZAR VISUALMENTE LA TARJETA SI ES POSIBLE (SI NO, SE ACTUALIZA AL RENDERIZAR)
        // BUSCAMOS LA TARJETA EN EL DOM Y LE AGREGAMOS LA CLASE
        // ESTO ES OPCIONAL PORQUE AL CERRAR O CAMBIAR SE PUEDE RENDERIZAR DE NUEVO,
        // PERO AYUDA A QUE SE VEA INMEDIATAMENTE SI EL CARRUSEL ESTÁ VISIBLE DE FONDO
        const cards = document.querySelectorAll('.video-card-carrusel');
        // NO TENEMOS EL ID EN EL DOM DIRECTAMENTE, PERO PODEMOS RE-RENDERIZAR AL CERRAR
        // O SIMPLEMENTE DEJARLO ASÍ YA QUE EL USUARIO ESTÁ VIENDO EL VIDEO
    }

    habilitarBotonAccion();

    // CERRAR AUTOMÁTICAMENTE DESPUÉS DE 1 HORA POR SEGURIDAD
    setTimeout(() => {
        if (modal.style.display === 'flex') {
            cerrarVideo();
            console.log('Video cerrado automáticamente por seguridad');
        }
    }, 3600000); // 1 HORA EN MILISEGUNDOS
}

// FUNCIÓN PARA CERRAR EL MODAL DE VIDEO
function cerrarVideo() {
    console.log('Cerrando video...');

    // OBTENER ELEMENTOS DEL MODAL
    const modal = document.getElementById('modalVideo');
    const frame = document.getElementById('videoFrame');

    // LIMPIAR LA URL DEL VIDEO (IMPORTANTE PARA DETENER LA REPRODUCCIÓN)
    frame.src = '';

    // OCULTAR EL MODAL
    modal.style.display = 'none';

    // RESTAURAR EL SCROLL DE LA PÁGINA
    document.body.style.overflow = 'auto';

    console.log('Video cerrado');

    // VOLVER A RENDERIZAR PARA MOSTRAR LOS INDICADORES DE VISTO ACTUALIZADOS
    renderizarVideos();
}

// =============================================================================
// FUNCIONES DE LOS BOTONES EXTERNOS Y DE ACCIÓN
// =============================================================================

// FUNCIÓN PARA ABRIR LA PLATAFORMA EXTERNA
function abrirPlataformaExterna() {
    const config = configCategorias[categoriaActual] || configCategorias['todos'];
    console.log(`Abriendo plataforma externa: ${config.externalUrl}`);
    window.open(config.externalUrl, '_blank');
}

// FUNCIÓN PARA HABILITAR EL BOTÓN DE ACCIÓN
function habilitarBotonAccion() {
    const btnAccion = document.getElementById('btnAccion');
    btnAccion.disabled = false;
    btnAccion.style.opacity = '1';
    btnAccion.style.pointerEvents = 'all';

    // ANIMACIÓN DE ENTRADA
    btnAccion.style.transform = 'scale(1.05)';
    setTimeout(() => {
        btnAccion.style.transform = 'scale(1)';
    }, 200);

    console.log('Botón de acción habilitado');
}

// FUNCIÓN PARA EJECUTAR LA ACCIÓN DEL BOTÓN SECUNDARIO
function ejecutarAccion() {
    const config = configCategorias[categoriaActual] || configCategorias['todos'];
    console.log(`Ejecutando acción: ${config.actionButton.url}`);
    window.open(config.actionButton.url, '_blank');
}

// =============================================================================
// FUNCIONES AUXILIARES - FUNCIONES DE AYUDA Y UTILIDADES
// =============================================================================

// FUNCIÓN PARA FORMATEAR EL NOMBRE DE LA CATEGORÍA PARA MOSTRAR AL USUARIO
function formatearCategoria(categoria) {
    // OBJETO QUE MAPEA LAS CATEGORÍAS INTERNAS A NOMBRES AMIGABLES
    const categorias = {
        'todos': 'Todos',
        'capacitacion': 'Capacitación',
        'seguridad': 'Seguridad',
        'procesos': 'Procesos',
        'tecnologia': 'Tecnología',
        'operacion': 'Operación',
        'bienvenida': 'Bienvenida'
    };

    // RETORNAR EL NOMBRE AMIGABLE O LA CATEGORÍA ORIGINAL SI NO SE ENCUENTRA
    return categorias[categoria] || categoria;
}

// FUNCIÓN PARA MOSTRAR EL INDICADOR DE CARGA
function mostrarLoading() {
    document.getElementById('loading').style.display = 'flex';
}

// FUNCIÓN PARA OCULTAR EL INDICADOR DE CARGA
function ocultarLoading() {
    document.getElementById('loading').style.display = 'none';
}

// =============================================================================
// FUNCIONES DE BÚSQUEDA - BÚSQUEDA EN TIEMPO REAL (OPCIONAL)
// =============================================================================

// FUNCIÓN PARA CONFIGURAR LA BÚSQUEDA EN TIEMPO REAL
function configurarBusqueda() {
    console.log('Configurando búsqueda...');

    // CREAR EL CONTENEDOR DE BÚSQUEDA
    const searchContainer = document.createElement('div');
    searchContainer.className = 'busqueda-container';
    searchContainer.innerHTML = `
        <div class="busqueda-box">
            <i class="fas fa-search"></i>
            <input type="text" id="busquedaInput" placeholder="Buscar videos..." />
        </div>
    `;

    // INSERTAR DESPUÉS DEL CARRUSEL
    const carrusel = document.querySelector('.carrusel-container');
    carrusel.parentNode.insertBefore(searchContainer, carrusel.nextSibling);

    // CONFIGURAR EL EVENTO DE BÚSQUEDA
    const input = document.getElementById('busquedaInput');
    input.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase(); // CONVERTIR A MINÚSCULAS PARA BÚSQUEDA INSENSIBLE
        buscarVideos(termino);
    });

    console.log('Búsqueda configurada');
}

// FUNCIÓN PARA BÚSQUEDA EN TIEMPO REAL
function buscarVideos(termino) {
    console.log(`Buscando videos con término: ${termino}`);

    // SI NO HAY TÉRMINO DE BÚSQUEDA, MOSTRAR LA CATEGORÍA ACTUAL
    if (!termino.trim()) {
        filtrarPorCategoria(categoriaActual);
        return;
    }

    // FILTRAR VIDEOS QUE COINCIDAN CON EL TÉRMINO EN TÍTULO, DESCRIPCIÓN O CATEGORÍA
    const videosFiltrados = videosBase.filter(video =>
        video.titulo.toLowerCase().includes(termino) ||
        video.descripcion.toLowerCase().includes(termino) ||
        video.categoria.toLowerCase().includes(termino)
    );

    // ACTUALIZAR EL ARRAY DE VIDEOS Y VOLVER A RENDERIZAR
    videos = videosFiltrados;
    renderizarVideos();

    console.log(`Videos encontrados: ${videosFiltrados.length}`);
}

// =============================================================================
// EVENTOS DEL TECLADO - ACCESIBILIDAD Y COMODIDAD
// =============================================================================

// EVENTO GLOBAL PARA DETECTAR TECLAS PRESIONADAS EN TODO EL DOCUMENTO
document.addEventListener('keydown', (e) => {
    // OBTENER EL MODAL DE VIDEO
    const modal = document.getElementById('modalVideo');

    // SI EL MODAL ESTÁ ABIERTO Y EL USUARIO PRESIONA ESCAPE, CERRARLO
    if (modal.style.display === 'flex' && e.key === 'Escape') {
        cerrarVideo();
        console.log('Video cerrado con teclado (ESC)');
    }

    // SI EL CAMPO DE URL ESTÁ ABIERTO Y EL USUARIO PRESIONA ENTER, IR A LA URL
    if (campoUrlAbierto && e.key === 'Enter' && document.activeElement.id === 'inputUrlLateral') {
        irAUrlLateral();
        console.log('URL abierta con teclado (Enter)');
    }

    // CONTROLES DE CARRUSEL CON TECLADO
    if (e.key === 'ArrowRight') {
        siguienteVideo();
        detenerRotacionAutomatica();
        iniciarRotacionAutomatica();
    } else if (e.key === 'ArrowLeft') {
        anteriorVideo();
        detenerRotacionAutomatica();
        iniciarRotacionAutomatica();
    }
});

// =============================================================================
// AUTO-SLIDE DEL CARRUSEL - CAMBIA AUTOMÁTICAMENTE DE CATEGORÍA
// =============================================================================

// INTERVALO QUE SE EJECUTA CADA 5 SEGUNDOS PARA ROTAR EL CARRUSEL DE VIDEOS
let intervaloRotacion;
let carruselActivo = true;

function iniciarRotacionAutomatica() {
    intervaloRotacion = setInterval(() => {
        if (carruselActivo && videos.length > 1) {
            siguienteVideo();
        }
    }, 5000); // 5 SEGUNDOS EN MILISEGUNDOS
}

function detenerRotacionAutomatica() {
    clearInterval(intervaloRotacion);
}

// INICIAR LA ROTACIÓN CUANDO SE CARGA LA PÁGINA
setTimeout(() => {
    iniciarRotacionAutomatica();
}, 2000); // ESPERAR 2 SEGUNDOS PARA QUE TODO ESTÉ CARGADO

// =============================================================================
// FUNCIONES PARA AGREGAR NUEVOS VIDEOS - EXTENSIBILIDAD
// =============================================================================

// FUNCIÓN PARA AGREGAR NUEVOS VIDEOS DINÁMICAMENTE
// USO: agregarVideo({titulo: "Nuevo", descripcion: "Descripción", categoria: "capacitacion", tipo: "youtube", url: "URL", thumbnail: "IMAGEN"});
function agregarVideo(nuevoVideo) {
    console.log('Agregando nuevo video...', nuevoVideo);

    // GENERAR UN NUEVO ID ÚNICO (MAYOR AL ID MÁXIMO EXISTENTE)
    const id = Math.max(...videosBase.map(v => v.id)) + 1;

    // AGREGAR EL NUEVO VIDEO AL ARRAY BASE
    videosBase.push({
        id,
        ...nuevoVideo // COPIAR TODAS LAS PROPIEDADES DEL NUEVO VIDEO
    });

    console.log(`Video agregado con ID: ${id}`);

    // SI LA CATEGORÍA DEL NUEVO VIDEO ES LA MISMA QUE LA ACTUAL, ACTUALIZAR LA VISTA
    if (categoriaActual === 'todos' || nuevoVideo.categoria === categoriaActual) {
        filtrarPorCategoria(categoriaActual);
    }
}

// EJEMPLO DE USO PARA AGREGAR UN VIDEO DE YOUTUBE:
/*
agregarVideo({
    titulo: "Nuevo Video de YouTube",
    descripcion: "Descripción del nuevo video",
    categoria: "capacitacion",  // PUEDES USAR: capacitacion, seguridad, procesos, tecnologia, operacion, bienvenida
    tipo: "youtube",            // PUEDES USAR: youtube o drive
    url: "https://www.youtube.com/embed/TU_VIDEO_ID", // PARA YOUTUBE, USA FORMATO /embed/
    thumbnail: "https://img.youtube.com/vi/TU_VIDEO_ID/maxresdefault.jpg" // IMAGEN AUTOMÁTICA DE YOUTUBE
});
*/

// EJEMPLO DE USO PARA AGREGAR UN VIDEO DE GOOGLE DRIVE:
/*
agregarVideo({
    titulo: "Nuevo Video de Drive",
    descripcion: "Descripción del nuevo video",
    categoria: "seguridad",
    tipo: "drive",
    url: "https://drive.google.com/file/d/TU_ID/preview", // PARA DRIVE, USA FORMATO /preview
    thumbnail: "assets/tu-imagen.jpg" // DEBES TENER LA IMAGEN EN LA CARPETA assets/
});
*/

// =============================================================================
// PERSONALIZACIÓN DE COLORES - INSTRUCCIONES
// =============================================================================

/*
PARA PERSONALIZAR LOS COLORES DE TU PÁGINA, MODIFICA LAS VARIABLES CSS EN :root DE style.css:

--color-primario: #2c3e50;        // AZUL OSCURO - COLOR PRINCIPAL
--color-secundario: #3498db;     // AZUL BRILLANTE - PARA ENFASIS
--color-terciario: #e74c3c;      // ROJO - PARA ACENTOS Y ALERTAS
--color-fondo: rgba(255, 255, 255, 0.95); // FONDO BLANCO CON TRANSPARENCIA
--color-texto: #333;              // COLOR DE TEXTO PRINCIPAL

PARA CAMBIAR LA IMAGEN DE FONDO:
--imagen-fondo: url('URL_DE_TU_IMAGEN');

PARA AJUSTAR LA TRANSPARENCIA DE LOS BOTONES:
--transparencia-fondo: 0.85;      // 0 = TRANSPARENTE, 1 = OPACO

PARA AJUSTAR EL EFECTO DE VIDRIO:
--blur-vidrio: 15px;              // CUÁNTO SE DESENFOCA EL FONDO
*/

// =============================================================================
// NOTAS FINALES - CONSEJOS Y RECOMENDACIONES
// =============================================================================

/*
CONSEJOS PARA PERSONALIZAR TU APLICACIÓN:

1. IMAGEN DE FONDO:
   - USA UNA IMAGEN DE ALTA CALIDAD (AL MENOS 1920x1080)
   - OPTIMIZA LA IMAGEN PARA WEB (MENOS DE 500KB IDEALMENTE)
   - PUEDES USAR SITIOS COMO UNSPLASH O PEXELS PARA IMÁGENES GRATIS

2. LOGO:
   - FORMATO PNG CON FONDO TRANSPARENTE RECOMENDADO
   - TAMAÑO IDEAL: 200x200 PX
   - MENOS DE 100KB PARA CARGA RÁPIDA

3. COLORES:
   - USA HERRAMIENTAS COMO COOLORS.CO PARA CREAR PALETAS DE COLORES ARMONIOSAS
   - MANTÉN CONTRASTE ENTRE TEXTO Y FONDO PARA LEGIBILIDAD
   - NO USES MÁS DE 3-4 COLORES PRINCIPALES

4. VIDEOS:
   - ASEGÚRATE DE QUE TENGAN PERMISOS PÚBLICOS EN GOOGLE DRIVE
   - USA FORMATOS COMPATIBLES (MP4 RECOMENDADO)
   - COMPRIME LOS VIDEOS PARA QUE CARGUEN RÁPIDO

5. RENDIMIENTO:
   - OPTIMIZA LAS IMÁGENES ANTES DE SUBIRLAS
   - NO USES IMÁGENES MAYORES A 500KB
   - LIMITA EL NÚMERO DE VIDEOS A 20-30 PARA MANTENER RENDIMIENTO

PARA CUALQUIER DUDA O PROBLEMA, REVISA LA CONSOLA DEL NAVEGADOR (F12)
*/

console.log('🎉 Script de JavaScript cargado completamente con todas las funcionalidades');

// FUNCIÓN PARA PLAY/PAUSA DEL CARRUSEL AUTOMÁTICO
function togglePlayPause() {
    const btn = document.getElementById('btnPlayPause');
    const icono = btn.querySelector('i');

    if (carruselActivo) {
        // PAUSAR
        detenerRotacionAutomatica();
        carruselActivo = false;
        icono.className = 'fas fa-play';
        btn.style.background = '#e74c3c';
    } else {
        // REANUDAR
        iniciarRotacionAutomatica();
        carruselActivo = true;
        icono.className = 'fas fa-pause';
        btn.style.background = 'var(--color-secundario)';
    }
}

// =============================================================================
// LÓGICA DEL MODAL DE BIENVENIDA Y PERFILAMIENTO
// =============================================================================

// VARIABLES PARA EL FLUJO DE BIENVENIDA
let playerWelcome;
let userProfile = {
    role: null,
    subRole: null
};

// MAPA DE PERMISOS DE CATEGORÍAS (CONFIGURABLE)
// Define qué categorías puede ver cada rol
const categoryPermissions = {
    'admin_jefe': ['hse', 'tecnologia', 'seguridad', 'compras', 'contratos', 'gobierno', 'bienestar', 'bienvenida'],
    'admin_otro': ['hse', 'tecnologia', 'seguridad', 'gobierno', 'bienestar', 'bienvenida'],
    'op_tecnico': ['hse', 'tecnologia', 'seguridad', 'gobierno', 'bienestar', 'bienvenida'],
    'op_otro': ['hse', 'tecnologia', 'seguridad', 'gobierno', 'bienestar', 'bienvenida']
};

// FUNCIÓN REQUERIDA POR LA API DE YOUTUBE (SOLO PARA VIDEOS INTERNOS SI LOS HAY)
function onYouTubeIframeAPIReady() {
    // Ya no usamos YouTube para el video de bienvenida, pero dejamos esto por si acaso
    console.log('API de YouTube lista');
}

// INICIALIZAR EL FLUJO AL CARGAR
document.addEventListener('DOMContentLoaded', () => {
    // REVISAR SI YA EXISTE UN PERFIL GUARDADO
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        try {
            userProfile = JSON.parse(savedProfile);
            console.log('Perfil cargado desde localStorage:', userProfile);

            // Si ya tiene sub-rol, aplicar filtros y no mostrar modal
            if (userProfile.subRole) {
                applyCategoryFilter(userProfile.subRole);
                return; // SALIR PARA NO MOSTRAR EL MODAL
            }
        } catch (e) {
            console.error('Error al cargar perfil:', e);
            localStorage.removeItem('userProfile');
        }
    }

    // MOSTRAR MODAL SI NO HAY PERFIL
    setTimeout(() => {
        const modal = document.getElementById('welcomeModal');
        if (modal) {
            modal.classList.add('active');
            console.log('Modal de bienvenida iniciado');

            // COMO ES GOOGLE DRIVE, NO PODEMOS DETECTAR EL FIN DEL VIDEO
            // HABILITAMOS EL BOTÓN DESPUÉS DE 5 SEGUNDOS PARA NO BLOQUEAR
            setTimeout(() => {
                habilitarBotonSiguiente('Tiempo de espera completado (Drive)');
            }, 5000);
        }
    }, 1000);

    // EVENTO BOTÓN SIGUIENTE
    const btnNext = document.getElementById('btnWelcomeNext');
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            showStep('stepRole');
        });
    }
});

// FUNCIÓN UNIFICADA PARA HABILITAR EL BOTÓN
function habilitarBotonSiguiente(razon) {
    console.log(`Habilitando botón siguiente. Razón: ${razon}`);
    const btn = document.getElementById('btnWelcomeNext');
    if (btn && btn.disabled) {
        btn.disabled = false;
        btn.classList.add('animate-bounce');
        // Texto genérico para Drive
        const footer = document.querySelector('.welcome-footer-text');
        if (footer) footer.textContent = 'Gracias por ver el video. Puedes continuar.';
    }
}

// CAMBIAR ENTRE PASOS DEL MODAL
function showStep(stepId) {
    // SI SALIMOS DEL PASO DE VIDEO, DETENER EL VIDEO
    const currentStep = document.querySelector('.welcome-step.active');
    if (currentStep && currentStep.id === 'stepVideo' && stepId !== 'stepVideo') {
        const iframe = document.getElementById('welcomeVideoFrame');
        if (iframe) {
            // Guardar src, limpiar y restaurar (o dejar vacío si no se vuelve a usar)
            // Para detener video de Drive/YouTube, lo más efectivo es resetear el src
            const src = iframe.src;
            iframe.src = '';
            // iframe.src = src; // Si quisiéramos que estuviera listo de nuevo, pero mejor detenerlo
        }
    }

    // OCULTAR TODOS LOS PASOS
    document.querySelectorAll('.welcome-step').forEach(step => {
        step.classList.remove('active');
    });

    // MOSTRAR EL PASO SOLICITADO
    const step = document.getElementById(stepId);
    if (step) {
        step.classList.add('active');
    }
}

// SELECCIÓN DE ROL PRINCIPAL
function selectRole(role) {
    console.log(`Rol seleccionado: ${role}`);
    userProfile.role = role;

    if (role === 'administrativo') {
        showStep('stepAdminSub');
    } else if (role === 'operativo') {
        showStep('stepOpSub');
    }
}

// SELECCIÓN DE SUB-ROL Y FINALIZACIÓN
function selectSubRole(subRole) {
    console.log(`Sub-rol seleccionado: ${subRole}`);
    userProfile.subRole = subRole;

    // APLICAR FILTROS
    applyCategoryFilter(subRole);

    // CERRAR MODAL
    const modal = document.getElementById('welcomeModal');
    if (modal) {
        modal.classList.remove('active');
    }

    // GUARDAR EN LOCAL STORAGE PARA PERSISTENCIA
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

// APLICAR FILTRO DE CATEGORÍAS
function applyCategoryFilter(subRole) {
    const allowedCategories = categoryPermissions[subRole] || ['todos'];
    console.log('Categorías permitidas:', allowedCategories);

    const categoryItems = document.querySelectorAll('.categoria-item-vertical');
    let firstVisible = null;

    categoryItems.forEach(item => {
        const category = item.dataset.categoria;
        if (allowedCategories.includes(category)) {
            item.style.display = 'flex';
            if (!firstVisible) firstVisible = item;
        } else {
            item.style.display = 'none';
        }
    });

    // SELECCIONAR LA PRIMERA CATEGORÍA DISPONIBLE
    if (firstVisible) {
        firstVisible.click();
    }
}
