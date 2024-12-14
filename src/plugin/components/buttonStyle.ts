export const buttonStyles = `
    .preview-button {
        padding: 8px 16px; /* Tamaño medium por defecto */
        border-radius: 6px;
        font-size: var(--min-font-size);
        font-weight: 500;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        transition: all 0.2s;
        border: 1px solid transparent;
        height: 36px; /* Altura medium por defecto */
        line-height: 20px;
    }

    /* Small */
    .preview-button.sm {
        padding: 6px 12px;
        font-size: max(13px, var(--min-font-size));
        height: 32px;
        gap: 6px;
    }
    .preview-button.sm svg {
        width: 14px;
        height: 14px;
    }

    /* Medium - ya definido en .preview-button */

    /* Large */
    .preview-button.lg {
        padding: 16px 20px;
        font-size: max(16px, var(--min-font-size));
        height: 48px;
        gap: 10px;
    }
    .preview-button.lg svg {
        width: 18px;
        height: 18px;
    }

    /* Ajuste especial para Link variant */
    .preview-button.link {
        padding: 0;
        height: auto;
    }
    .preview-button.link.sm {
        font-size: max(13px, var(--min-font-size));
    }
    .preview-button.link.lg {
        font-size: max(16px, var(--min-font-size));
    }

    /* Primary Button */
    .preview-button.primary {
        background-color: var(--primary-color, #0c8ce9);
        color: white;
        border-color: transparent;
    }
    .preview-button.primary:hover {
        background-color: var(--primary-color, #0c8ce9);
        opacity: 1;
    }

    /* Secondary Button */
    .preview-button.secondary {
        background: var(--secondary-color, #6c757d);
        color: white;
        border-color: transparent;
    }
    .preview-button.secondary:hover {
        background: var(--secondary-color, #6c757d);
        opacity: 1;
    }

    /* Secondary Outline Button */
    .preview-button.secondary-outline {
        background: none;
        border: 1px solid var(--secondary-color, #6c757d);
        color: var(--secondary-color, #6c757d);
    }
    .preview-button.secondary-outline:hover {
        background: none;
    }

    /* Primary Outline Button */
    .preview-button.primary-outline {
        background: none;
        border: 1px solid var(--primary-color, #0c8ce9);
        color: var(--primary-color, #0c8ce9);
    }
    .preview-button.primary-outline:hover {
        background: none;
    }

    /* Destructive Button */
    .preview-button.destructive {
        background-color: var(--danger-color, #e03e1a);
        color: white;
        border-color: transparent;
    }
    .preview-button.destructive:hover {
        background-color: var(--danger-color, #e03e1a);
        opacity: 1;
    }

    /* Link Button */
    .preview-button.link {
        background: none;
        color: var(--primary-color, #0c8ce9);
        border: none;
        padding: 0;
        text-decoration: underline;
    }
    .preview-button.link:hover {
        opacity: 1;
    }

    /* Estados comunes para todos los botones */
    .preview-button.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .preview-button.loading {
        cursor: wait;
    }

    .preview-button .spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    /* Estilos específicos para el color del texto */
    .preview-button[data-text-color="dark"] {
        color: #333333 !important;
    }
    
    .preview-button[data-text-color="dark"] svg {
        stroke: #333333 !important;
    }
    
    .preview-button[data-text-color="light"] {
        color: #FFFFFF !important;
    }
    
    .preview-button[data-text-color="light"] svg {
        stroke: #FFFFFF !important;
    }
    
    /* Estilos para los border styles */
    .preview-button.border-default {
        border-radius: 6px;
    }
    
    .preview-button.border-square {
        border-radius: 0;
    }
    
    .preview-button.border-pill {
        border-radius: 100px;
    }
    
    .generate-button-fixed {
        position: sticky;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 16px 24px;
        background: var(--figma-color-bg);
        border-top: 1px solid var(--figma-color-border);
        margin: 0 -24px;
    }
    
    .spinner {
        animation: spin 1s linear infinite;
        margin-right: 8px;
    }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
`