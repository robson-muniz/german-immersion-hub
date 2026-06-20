import { useEffect, useState } from 'react';
import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

interface ToastProps {
    title: string;
    description: string;
    icon?: string;
    type?: 'success' | 'info' | 'warning';
    onClose: () => void;
}

export const Toast = ({ title, description, icon, type = 'success', onClose }: ToastProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for exit animation
    };

    const getIcon = () => {
        if (icon === '⭐') return <span className="text-2xl mr-2">⭐</span>;
        if (icon === '🔥') return <span className="text-2xl mr-2">🔥</span>;
        if (icon === '🏆') return <span className="text-2xl mr-2">🏆</span>;
        if (type === 'success') return <CheckCircle className="w-6 h-6 text-emerald-400 mr-3" />;
        if (type === 'warning') return <AlertTriangle className="w-6 h-6 text-amber-400 mr-3" />;
        return <Info className="w-6 h-6 text-blue-400 mr-3" />;
    };

    const getBgColor = () => {
        if (type === 'success') return 'bg-emerald-950/90 border-emerald-500/30';
        if (type === 'warning') return 'bg-amber-950/90 border-amber-500/30';
        return 'bg-blue-950/90 border-blue-500/30';
    };

    return (
        <div className={`fixed bottom-24 left-4 right-4 md:left-auto md:right-8 md:w-96 z-50 transition-all duration-300 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
        }`}>
            <div className={`backdrop-blur-xl border rounded-2xl p-4 shadow-2xl flex items-start ${getBgColor()}`}>
                {getIcon()}
                <div className="flex-1">
                    <h4 className="text-white font-bold text-sm mb-1">{title}</h4>
                    <p className="text-slate-300 text-sm">{description}</p>
                </div>
                <button 
                    onClick={handleClose}
                    className="text-slate-400 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
