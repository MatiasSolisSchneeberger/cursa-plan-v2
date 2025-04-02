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
        <div className="w-full flex justify-center">
            <div className="relative flex-grow">
                {/* Lupa - SVG original */}
                <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--md-sys-color-outline)]"
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

                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--md-sys-color-outline)] focus:outline-none focus:bg-[var(--md-sys-color-surface-variant)] focus:ring-2 focus:ring-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-surface)] focus:text-[var(--md-sys-color-on-surface-variant)] transition-all duration-300 ${(isFocused || searchTerm) ? 'max-w-full' : 'max-w-[220px]'}`}
                />



                {searchTerm && (
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            handleSearch({ target: { value: '' } });
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--md-sys-color-outline)]"
                    >
                        {/* X - SVG original */}
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
        </div>
    );
}