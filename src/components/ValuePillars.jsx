import { Award, Battery, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import './ValuePillars.css';

const ValuePillars = () => {
    const pillars = [
        {
            id: 1,
            icon: <Award size={40} />,
            title: "Calidad Grado A+",
            desc: "Dispositivos impecables, seleccionados manualmente para garantizar estética 10/10.",
            color: "#FFD700" // Gold
        },
        {
            id: 2,
            icon: <Battery size={40} />,
            title: "Batería 85%-100%",
            desc: "Máxima autonomía asegurada. Nunca te entregaremos un equipo degradado.",
            color: "#50C878" // Emerald
        },
        {
            id: 3,
            icon: <MapPin size={40} />,
            title: "Entregas en Cañete",
            desc: "Puntos de entrega seguros en San Vicente. Equipos importados bajo pedido (~2 semanas).",
            color: "#800020" // Vino Tinto
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="pillars-section container">
            <motion.div
                className="pillars-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {pillars.map((pillar) => (
                    <motion.div key={pillar.id} className="pillar-card" variants={itemVariants}>
                        <div className="pillar-icon-wrapper" style={{ color: pillar.color }}>
                            {pillar.icon}
                        </div>
                        <h3 className="pillar-title">{pillar.title}</h3>
                        <p className="pillar-desc">{pillar.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default ValuePillars;
