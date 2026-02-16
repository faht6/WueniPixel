import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import './WhatsAppFloat.css';

const WhatsAppFloat = () => {
    return (
        <motion.a
            href="https://wa.me/51900000000?text=Hola%20WueniPixel,%20tengo%20una%20consulta."
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <MessageCircle size={32} />
            <span className="wa-notification-dot"></span>
        </motion.a>
    );
};

export default WhatsAppFloat;
