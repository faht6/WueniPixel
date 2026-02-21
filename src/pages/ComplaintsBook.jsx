import { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageTransition from '../components/PageTransition';
import { BookOpen, Send, CheckCircle } from 'lucide-react';
import './ComplaintsBook.css';

const ComplaintsBook = () => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        fullName: '',
        address: '',
        documentType: 'DNI',
        documentNumber: '',
        phone: '',
        email: '',
        productType: 'Producto', // Producto or Servicio
        amount: '',
        description: '',
        detail: '',
        claimType: 'Reclamo' // Reclamo or Queja
    });

    const [submitted, setSubmitted] = useState(false);

    // Force scroll to top on mount
    useState(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct the complaint message
        const message = `HOJA DE RECLAMACIÓN VIRTUAL - WueniPixel\n` +
            `----------------------------------\n` +
            `Fecha: ${formData.date}\n` +
            `Cliente: ${formData.fullName}\n` +
            `Documento: ${formData.documentType} ${formData.documentNumber}\n` +
            `Email: ${formData.email}\n` +
            `Teléfono: ${formData.phone}\n\n` +
            `DETALLE DEL RECLAMO:\n` +
            `Tipo: ${formData.claimType}\n` +
            `Bien: ${formData.productType}\n` +
            `Monto: S/ ${formData.amount}\n` +
            `Producto: ${formData.description}\n` +
            `Detalle: ${formData.detail}`;

        // Send via WhatsApp (central contact)
        const waUrl = `https://wa.me/51941126123?text=${encodeURIComponent(message)}`;

        // Also prepare mailto link as fallback/alternative
        const mailtoUrl = `mailto:wuenipixel@gmail.com?subject=Libro de Reclamaciones - ${formData.fullName}&body=${encodeURIComponent(message)}`;

        // Open WhatsApp
        window.open(waUrl, '_blank');

        setSubmitted(true);
        window.scrollTo(0, 0);
    };

    if (submitted) {
        return (
            <PageTransition>
                <div className="complaints-container container" style={{ padding: '4rem 1rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle size={64} color="#50C878" style={{ marginBottom: '1rem' }} />
                    <h1>Reclamo Registrado</h1>
                    <p style={{ maxWidth: '600px', margin: '1rem auto', color: 'var(--color-text-secondary)' }}>
                        Hemos recibido tu hoja de reclamación. Se ha enviado una copia a tu correo electrónico: <strong>{formData.email}</strong>.
                        Nos pondremos en contacto contigo en un plazo máximo de 15 días hábiles conforme a ley.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="btn-primary" style={{ marginTop: '2rem' }}>Volver al Inicio</button>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="complaints-container container">
                <Helmet>
                    <title>Libro de Reclamaciones | WueniPixel</title>
                </Helmet>

                <div className="complaints-header">
                    <BookOpen size={48} className="complaints-icon" />
                    <h1>Libro de Reclamaciones Virtual</h1>
                    <p>Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, este establecimiento pone a su disposición este Libro de Reclamaciones Virtual.</p>
                </div>

                <div className="legal-info">
                    <p><strong>Razón Social:</strong> WueniPixel - Venta de Equipos Tecnológicos</p>
                    <p><strong>Ubicación:</strong> San Vicente de Cañete, Lima, Perú</p>
                    <p><strong>Email:</strong> wuenipixel@gmail.com</p>
                </div>

                <form className="complaints-form" onSubmit={handleSubmit}>
                    {/* SECTION 1: CONSUMER DATA */}
                    <div className="form-section">
                        <h3>1. Identificación del Consumidor Reclamante</h3>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Fecha</label>
                                <input type="date" name="date" value={formData.date} disabled />
                            </div>
                            <div className="form-group span-2">
                                <label>Nombre Completo</label>
                                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} placeholder="Nombres y Apellidos" />
                            </div>
                            <div className="form-group span-2">
                                <label>Domicilio</label>
                                <input type="text" name="address" required value={formData.address} onChange={handleChange} placeholder="Dirección completa" />
                            </div>
                            <div className="form-group">
                                <label>Tipo Doc.</label>
                                <select name="documentType" value={formData.documentType} onChange={handleChange}>
                                    <option value="DNI">DNI</option>
                                    <option value="CE">C.E.</option>
                                    <option value="RUC">RUC</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Nro. Documento</label>
                                <input type="text" name="documentNumber" required value={formData.documentNumber} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Teléfono / Celular</label>
                                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: PRODUCT/SERVICE DATA */}
                    <div className="form-section">
                        <h3>2. Identificación del Bien Contratado</h3>
                        <div className="form-grid">
                            <div className="form-group radio-group span-2">
                                <label className="radio-label">
                                    <input type="radio" name="productType" value="Producto" checked={formData.productType === 'Producto'} onChange={handleChange} />
                                    Producto
                                </label>
                                <label className="radio-label">
                                    <input type="radio" name="productType" value="Servicio" checked={formData.productType === 'Servicio'} onChange={handleChange} />
                                    Servicio
                                </label>
                            </div>
                            <div className="form-group span-2">
                                <label>Monto Reclamado (S/)</label>
                                <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="0.00" />
                            </div>
                            <div className="form-group span-2">
                                <label>Descripción del Producto/Servicio</label>
                                <textarea name="description" required value={formData.description} onChange={handleChange} placeholder="Ej: iPhone 14 Pro Max 256GB" rows={2}></textarea>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: CLAIM DETAIL */}
                    <div className="form-section">
                        <h3>3. Detalle de la Reclamación</h3>
                        <div className="form-grid">
                            <div className="form-group radio-group span-2">
                                <label className="radio-label">
                                    <input type="radio" name="claimType" value="Reclamo" checked={formData.claimType === 'Reclamo'} onChange={handleChange} />
                                    <strong>Reclamo:</strong> Disconformidad con el producto o servicio.
                                </label>
                                <label className="radio-label">
                                    <input type="radio" name="claimType" value="Queja" checked={formData.claimType === 'Queja'} onChange={handleChange} />
                                    <strong>Queja:</strong> Disconformidad no relacionada directamente al producto (ej: mala atención).
                                </label>
                            </div>
                            <div className="form-group span-2">
                                <label>Detalle</label>
                                <textarea name="detail" required value={formData.detail} onChange={handleChange} placeholder="Describa los hechos..." rows={5}></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="form-footer">
                        <button type="submit" className="btn-submit-complaint">
                            Enviar Hoja de Reclamación <Send size={18} />
                        </button>
                        <p className="declaration">
                            Al enviar este formulario acepto que la información es verdadera y acepto la Política de Privacidad.
                        </p>
                    </div>

                </form>
            </div>
        </PageTransition>
    );
};

export default ComplaintsBook;
