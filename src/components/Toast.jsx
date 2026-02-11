import React, { useEffect } from 'react';
import './Toast.css';
import { CheckCircle } from 'lucide-react';

const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast-notification">
            <CheckCircle size={20} className="toast-icon" />
            <span className="toast-message">{message}</span>
        </div>
    );
};

export default Toast;
