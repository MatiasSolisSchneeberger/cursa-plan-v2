import React, { useEffect } from "react";

function Carrera({ carreraData }) {
    // Función para obtener sufijos
    function obtenerSufijo(p_año) {
        if (p_año === 1) return "ro";
        if (p_año === 2) return "do";
        if (p_año === 3) return "ro";
        return "to"; // Para 4 o más
    }

    useEffect(() => {
        // Configurar eventos dinámicamente para los menús
        carreraData.cursada.forEach(({ año }) => {
            const anchorEl = document.querySelector(`#usage-anchor-${año}`);
            const menuEl = document.querySelector(`#usage-menu-${año}`);
            if (anchorEl && menuEl) {
                menuEl.anchorElement = anchorEl;
                anchorEl.addEventListener("click", () => {
                    menuEl.open = !menuEl.open;
                });
            }
        });
    }, [carreraData]);

    return (
        <div className="flex flex-wrap gap-3 justify-center">
            {carreraData.cursada.map(({ año, orientaciones }) => {
                const sufijo = obtenerSufijo(año);
                const tieneOrientaciones =
                    orientaciones && orientaciones.length > 0;

                return (
                    <div className="relative">
                        <md-outlined-button
                            className="w-min"
                            id={`usage-anchor-${año}`}
                            href={tieneOrientaciones ? null : `#${año}`}
                            trailing-icon
                        >
                            {año}{sufijo} Año
                            {tieneOrientaciones && (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" slot="icon"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z" /></svg>)}

                        </md-outlined-button>
                        {tieneOrientaciones && (
                            <md-menu
                                id={`usage-menu-${año}`}
                                anchor={`usage-anchor-${año}`}
                                className="absolute top-full left-0 mt-2 z-10"
                            >
                                {orientaciones.map((orientacion, index) => (
                                    <md-menu-item href={`#${año}-${orientacion.nombre}`}>
                                        <div slot="headline">{orientacion.nombre}</div>
                                    </md-menu-item>
                                ))}
                            </md-menu>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Carrera;
