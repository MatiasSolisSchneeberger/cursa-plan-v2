import React, { useState } from 'react';
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

const AñoCarrera = ({ año, children }) => {
    const obtenerSufijo = (año) => {
        if (año === 1) return "ro";
        if (año === 2) return "do";
        if (año === 3) return "ro";
        return "to"; // Para 4 o más
    };

    const sufijo = obtenerSufijo(año);
    const [isVisible, setIsVisible] = useState(false); // Estado para manejar la visibilidad

    const toggleVisibility = () => {
        setIsVisible(!isVisible); // Alternar visibilidad
    };

    return (
        <section className="bg-primary-fixed-dim rounded-[36px] p-3 flex flex-col gap-2.5 items-center justify-center self-stretch shrink-0 relative overflow-hidden">
        {/* encabezado año */}
        <header className="flex flex-row items-center justify-between self-stretch shrink-0 relative">
            <h3 className="text-headline-medium text-on-primary text-center w-full">
                {año}<span>{sufijo}</span>
            </h3>

            <button onClick={toggleVisibility} className="item-center flex justify-center content-center focus:outline-none">
                {isVisible ? <IconChevronUp size={24} /> : <IconChevronDown size={24} />}
            </button>
        </header>

        {/* Contenido del slot */}
        {isVisible && (
            <div className="w-full transition-all duration-300 ease-in-out">
                {children}
            </div>
        )}
        </section>
    );
};

export default AñoCarrera; 