import { useState } from 'react';

export default function BuscadorMaterias({ placeholder = "Buscar por nombre de materia o código...", targetClass = "materia-card", searchInAttribute = null }) {
    const [searchTerm, setSearchTerm] = useState('');

    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""); // Eliminar acentos
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        const normalizedSearchTerm = normalizeText(value);

        // Get all target elements
        const elements = document.getElementsByClassName(targetClass);

        // Filter elements based on search term
        Array.from(elements).forEach(element => {
            let searchableText;
            if (searchInAttribute) {
                searchableText = element.getAttribute(searchInAttribute) || '';
            } else {
                searchableText = element.querySelector('h3')?.textContent || element.textContent || '';
            }

            const normalizedText = normalizeText(searchableText);

            if (normalizedText.includes(normalizedSearchTerm)) {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <div className="relative">
                {/* svg Lupa */}
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--md-sys-color-outline)]" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>

                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--md-sys-color-outline)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)] focus:border-transparent bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                />
            </div>
        </div>
    );
} 