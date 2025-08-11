import { useState } from 'react';

import { IconSearch, IconX } from '@tabler/icons-react'

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

        <div className="relative group flex flex-row rounded-xl dark:bg-background-900 bg-background-100 focus-within:ring-2 focus-within:ring-background-300 dark:focus-within:ring-background-800 transition-all duration-300">
            {/* Contenedor de la lupa con z-index para superponer el ring */}
            <div className='p-2.5 bg-primary-600 dark:bg-primary-400 rounded-l-xl text-primary-100 dark:text-primary-900 z-[1]'>
                <IconSearch />
            </div>

            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleSearch}
                className='w-full px-4 py-2 rounded-r-xl border border-background-300 dark:border-background-700 focus:outline-none focus:bg-background-50 dark:focus:bg-background-800 focus:ring-2 focus:ring-tertiary-300 dark:focus:ring-tertiary-700 text-text-800 dark:text-text-300 focus:text-text-950 dark:focus:text-text-50 transition-all duration-300 texto-label'

            />

            {searchTerm && (
                <button
                    onClick={() => {
                        setSearchTerm('');
                        handleSearch({ target: { value: '' } });
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-700 dark:text-text-300 cursor-pointer"
                >
                    <IconX />
                </button>
            )}
        </div>

    );
}