import { useState } from 'react';

export default function BuscadorMaterias() {
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
        
        // Get all materia cards
        const materiaCards = document.getElementsByClassName('materia-card');
        
        // Filter cards based on search term
        Array.from(materiaCards).forEach(card => {
            const materiaText = card.querySelector('h3')?.textContent || '';
            const codigo = card.getAttribute('data-codigo');
            
            const normalizedMateriaText = normalizeText(materiaText);
            
            if (normalizedMateriaText.includes(normalizedSearchTerm) || 
                (codigo && codigo.toString().includes(normalizedSearchTerm))) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <div className="relative">
                <svg 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--md-sys-color-outline)]"
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                        fill="currentColor"
                    />
                </svg>
                <input
                    type="text"
                    placeholder="Buscar por nombre de materia o código..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--md-sys-color-outline)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)] focus:border-transparent bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)]"
                />
            </div>
        </div>
    );
} 