import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Home } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const NotFound = () => {
    return (
        <PageTransition>
            <div className="container" style={{
                padding: '100px 20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
            }}>
                <Smartphone size={80} style={{ opacity: 0.2, marginBottom: '20px' }} />
                <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: 0 }}>404</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '500px' }}>
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                    borderRadius: '999px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    marginTop: '20px',
                    transition: 'all 0.3s ease'
                }}>
                    <Home size={20} />
                    Volver al Inicio
                </Link>
            </div>
        </PageTransition>
    );
};

export default NotFound;
