export const brandingStyles = `
    .branding-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .branding-modal-content {
        background: var(--figma-color-bg);
        padding: 24px;
        border-radius: 8px;
        width: 400px;
        max-width: 90%;
    }

    .branding-modal h2 {
        margin: 0 0 16px 0;
        font-size: 20px;
        font-weight: 600;
    }

    .branding-options {
        display: flex;
        gap: 12px;
        margin-bottom: 24px;
    }

    .branding-option {
        flex: 1;
        padding: 12px;
        border: 1px solid var(--figma-color-border);
        border-radius: 6px;
        cursor: pointer;
        text-align: center;
        transition: all 0.2s;
    }

    .branding-option:hover {
        background: var(--figma-color-bg-hover);
    }

    .branding-option.selected {
        border-color: var(--figma-color-border-brand);
        background: var(--figma-color-bg-brand);
        color: var(--figma-color-text-onbrand);
    }

    .color-fields {
        display: none;
        gap: 12px;
        flex-direction: column;
    }
    
    .color-field {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .color-field label {
        flex: 1;
    }

    .color-field .input-group {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .color-field input {
        width: 100px;
        padding: 4px 8px;
        border: 1px solid var(--figma-color-border);
        border-radius: 4px;
        background: var(--figma-color-bg);
        color: var(--figma-color-text);
    }

    .color-picker {
        opacity: 0;
        width: 0;
        height: 0;
        padding: 0;
        margin: 0;
        position: absolute;
        pointer-events: none;
    }

    .color-preview {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        border: 1px solid var(--figma-color-border);
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
    }

    .color-preview:hover {
        transform: scale(1.1);
    }

    .branding-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 24px;
    }

    .branding-actions button {
        padding: 8px 16px;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        font-weight: 500;
    }

    .btn-secondary {
        background: var(--figma-color-bg-secondary);
        color: var(--figma-color-text);
    }

    .btn-primary {
        background: var(--figma-color-bg-brand);
        color: var(--figma-color-text-onbrand);
    }
`;