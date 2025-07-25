import { useState } from 'react';

export default function BuscadorMaterias({ placeholder = "Buscar materia", targetClass = "materia-card", searchInAttribute = null }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        const normalizedSearchTerm = normalizeText(value);
        const elements = document.getElementsByClassName(targetClass);

        Array.from(elements).forEach(element => {
            let searchableText = searchInAttribute
                ? element.getAttribute(searchInAttribute) || ''
                : element.querySelector('h3')?.textContent || element.textContent || '';

            const normalizedText = normalizeText(searchableText);
            element.style.display = normalizedText.includes(normalizedSearchTerm) ? '' : 'none';
        });
    };

    return (

        <div className="relative group flex flex-row rounded-md focus-within:ring-2 focus-within:ring-tertiary transition-all duration-300">
            {/* Contenedor de la lupa con z-index para superponer el ring */}
            <div className='p-2.5 bg-primary rounded-l-md text-on-primary z-[1]'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>
            </div>

            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleSearch}
                className='w-full px-4 py-2 rounded-r-md bg-background border border-outline focus:outline-none focus:bg-surface-variant focus:ring-2 focus:ring-tertiary text-on-surface focus:text-on-surface-variant transition-all duration-300'

            />

            {searchTerm && (
                <button
                    onClick={() => {
                        setSearchTerm('');
                        handleSearch({ target: { value: '' } });
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-outline"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>

    );
}