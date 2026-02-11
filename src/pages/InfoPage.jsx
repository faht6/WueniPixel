import React from 'react';
import { useParams } from 'react-router-dom';
import { Shield, Truck, RefreshCw, FileText, Map, HelpCircle, Mail } from 'lucide-react';
import './InfoPage.css';

const contentMap = {
    // AYUDA
    'order-status': {
        title: 'Estado de mi Pedido',
        icon: <Truck size={48} />,
        content: (
            <>
                <p>Para consultar el estado de tu pedido, por favor revisa el correo de confirmación que te enviamos. Allí encontrarás un enlace de seguimiento en tiempo real.</p>
                <h3>Tiempos de Procesamiento</h3>
                <p>Los pedidos se procesan en un plazo de 24 horas hábiles. Una vez despachado, recibirás un segundo correo con el número de tracking.</p>
            </>
        )
    },
    'shipping': {
        title: 'Envíos y Entregas',
        icon: <Truck size={48} />,
        content: (
            <>
                <p>Realizamos envíos a todo el Perú a través de nuestros partners logísticos certificados.</p>
                <h3>Lima Metropolitana</h3>
                <p>Entrega Same-Day para pedidos antes de las 12:00 PM. Pedidos posteriores llegan al día siguiente.</p>
                <h3>Provincias</h3>
                <p>El tiempo estimado es de 2 a 4 días hábiles dependiendo del destino.</p>
            </>
        )
    },
    'returns': {
        title: 'Políticas de Devolución',
        icon: <RefreshCw size={48} />,
        content: (
            <>
                <p>Queremos que ames tu nuevo dispositivo. Si no estás satisfecho, tienes hasta 7 días calendario para solicitar una devolución.</p>
                <h3>Requisitos</h3>
                <ul>
                    <li>El producto debe estar sellado y en su empaque original.</li>
                    <li>Presentar el comprobante de pago.</li>
                </ul>
                <p>Contáctanos a devoluciones@wuenipixel.pe para iniciar el proceso.</p>
            </>
        )
    },
    'contact': {
        title: 'Contacto',
        icon: <Mail size={48} />,
        content: (
            <>
                <p>Estamos aquí para ayudarte. Nuestro equipo de soporte está disponible de Lunes a Sábado de 9:00 AM a 6:00 PM.</p>
                <h3>Canales de Atención</h3>
                <ul>
                    <li><strong>Email:</strong> contacto@wuenipixel.pe</li>
                    <li><strong>WhatsApp:</strong> +51 987 654 321</li>
                    <li><strong>Teléfono:</strong> (01) 123-4567</li>
                </ul>
            </>
        )
    },
    // LEGAL
    'privacy': {
        title: 'Política de Privacidad',
        icon: <Shield size={48} />,
        content: (
            <>
                <p>En WueniPixel, nos tomamos tu privacidad muy en serio. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.</p>
                <h3>Recopilación de Datos</h3>
                <p>Solo recopilamos la información necesaria para procesar tus pedidos y mejorar tu experiencia de compra (Nombre, Dirección, Email).</p>
                <h3>Seguridad</h3>
                <p>Tus datos están encriptados y nunca compartimos información financiera con terceros.</p>
            </>
        )
    },
    'terms': {
        title: 'Términos de Uso',
        icon: <FileText size={48} />,
        content: (
            <>
                <p>Bienvenido a WueniPixel. Al usar nuestro sitio web, aceptas cumplir con los siguientes términos y condiciones.</p>
                <h3>Uso del Sitio</h3>
                <p>El contenido de este sitio es para tu información general y uso personal. Está sujeto a cambios sin previo aviso.</p>
                <h3>Propiedad Intelectual</h3>
                <p>Todo el material contenido en este sitio web es propiedad de o tiene licencia para nosotros.</p>
            </>
        )
    },
    'sitemap': {
        title: 'Mapa del Sitio',
        icon: <Map size={48} />,
        content: (
            <>
                <ul className="sitemap-list">
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/products">Catálogo Completo</a></li>
                    <li><a href="/products?brand=Apple">iPhone</a></li>
                    <li><a href="/products?brand=Google">Pixel</a></li>
                    <li><a href="/cart">Carrito de Compras</a></li>
                    <li><a href="/help/contact">Contacto</a></li>
                </ul>
            </>
        )
    }
};

const InfoPage = () => {
    const { slug } = useParams();
    const data = contentMap[slug];

    if (!data) {
        return (
            <div className="info-page container error">
                <HelpCircle size={64} />
                <h1>Página no encontrada</h1>
                <p>Lo sentimos, no pudimos encontrar la información que buscas.</p>
            </div>
        );
    }

    return (
        <div className="info-page container">
            <div className="info-header">
                <div className="icon-wrapper">{data.icon}</div>
                <h1>{data.title}</h1>
            </div>
            <div className="info-content">
                {data.content}
            </div>
        </div>
    );
};

export default InfoPage;
