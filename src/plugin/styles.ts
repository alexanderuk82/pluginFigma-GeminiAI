import { buttonStyles } from "./components/buttonStyle";
import { brandingStyles } from "./modals/brandingStyles";
import { homeStyle } from "./templates/homeStyle";


export const styles = `
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            margin: 0;
            padding: 0;
            font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--figma-color-bg);
            color: var(--figma-color-text);
            width: 100%;
            height: 100vh;
            overflow-x: hidden;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        #root {
            width: 100%;
            height: 100%;
            padding: 20px;
            overflow-y: auto;
            overflow-x: hidden;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        .header {
            padding-bottom: 20px;
            border-bottom: 1px solid var(--figma-color-border);
            margin-bottom: 20px;
        }
        .title {
            font-size: 24px;
            font-weight: 600;
            margin: 0 0 12px 0;
            color: var(--figma-color-text);
        }
        .description {
            font-size: 14px;
            color: var(--figma-color-text-secondary);
            margin: 0;
            line-height: 1.5;
            max-width: 100%;
        }
       /* Styles for home boxes */

       ${homeStyle}

        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .modal {
            background: var(--figma-color-bg);
            border-radius: 12px;
            padding: 24px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .modal-title {
            font-size: 20px;
            font-weight: 600;
        }
        .close-button {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--figma-color-text);
            padding: 4px;
        }
        .atoms-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 16px;
            margin-top: 16px;
        }
        .atom-card {
            background: var(--figma-color-bg-secondary);
            border: 1px solid var(--figma-color-border);
            border-radius: 8px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .atom-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--figma-color-text);
        }
        .atom-description {
            font-size: 12px;
            color: var(--figma-color-text-secondary);
            line-height: 1.4;
        }
        .generate-button {
            background-color: #0D99FF;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.2s;
        }
        .generate-button:hover {
            background-color: #0B87E3;
        }
        .modal.show {
            animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
            from {
                transform: translateY(10px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        .empty-state {
            color: var(--figma-color-text-tertiary);
            font-size: 13px;
            text-align: center;
            padding: 12px;
            background: var(--figma-color-bg);
            border-radius: 8px;
            border: 1px dashed var(--figma-color-border);
            width: 100%;
        }
        
        /* Estilos para el configurador de botones */
        .component-config {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            background: var(--figma-color-bg);
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
            z-index: 1000;
            display: flex;
        }
        
        .component-config.show {
            transform: translateX(0);
        }

        .preview-panel {
            flex: 1;
            padding: 32px;
            border-right: 1px solid var(--figma-color-border);
            display: flex;
            flex-direction: column;
        }

        .preview-header {
            margin-bottom: 24px;
        }

        .preview-title {
            font-size: 20px;
            font-weight: 600;
        }

        .preview-subtitle {
            color: var(--figma-color-text-secondary);
            font-size: 13px;
        }

        .preview-canvas {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #FFFFFF;
            border-radius: 8px;
            margin: 16px 0;
            position: relative;
            box-shadow: inset 0 0 0 1px var(--figma-color-border);
        }

        .preview-canvas::before {
            content: '';
            position: absolute;
            inset: 0;
            
            opacity: 0.4;
            border-radius: 8px;
        }

        .settings-panel {
            width: 320px;
            padding: 24px;
            overflow-y: auto;
        }
        
        .config-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }
        
        .config-title {
            font-size: 16px;
            font-weight: 600;
        }
        
        .config-section {
            margin-bottom: 24px;
        }
        
        .config-section-title {
            font-size: 13px;
            font-weight: 500;
            margin-bottom: 12px;
            color: var(--figma-color-text-secondary);
        }
        
        .variant-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            margin-bottom: 16px;
        }
        
        .variant-option {
            padding: 8px;
            border: 1px solid var(--figma-color-border);
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            text-align: center;
            transition: all 0.2s;
        }
        
        .variant-option:hover {
            background: var(--figma-color-bg-hover);
        }
        
        .variant-option.selected {
            background: var(--figma-color-bg-brand);
            color: white;
            border-color: var(--figma-color-bg-brand);
        }
        
        .config-row {
            margin-bottom: 16px;
        }
        
        .config-label {
            font-size: 12px;
            margin-bottom: 8px;
            display: block;
        }
        
        .config-input {
            width: 100%;
            padding: 8px;
            border: 1px solid var(--figma-color-border);
            border-radius: 4px;
            font-size: 13px;
            background: var(--figma-color-bg);
            color: var(--figma-color-text);
        }
        
        .config-select {
            width: 100%;
            padding: 8px;
            border: 1px solid var(--figma-color-border);
            border-radius: 4px;
            font-size: 13px;
            background: var(--figma-color-bg);
            color: var(--figma-color-text);
        }
        
        .config-checkbox {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
        }
        
        .preview-section {
            padding: 24px;
            border: 1px solid var(--figma-color-border);
            border-radius: 8px;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--figma-color-bg-secondary);
        }
        
        /*  Styles here for button components*/

        ${buttonStyles}
        

        /* Estilos para el modal de branding */
        
        ${brandingStyles}

        /* Configuración global de texto */
        :root {
            --min-font-size: 15px;
        }

        /* Estilos para el footer */
        .footer {
            text-align: center;
            padding: 20px 0;
            margin-top: auto;
            width: 100%;
            color: var(--figma-color-text);
            font-size: 14px;
            opacity: 0.8;
        }

        .footer a {
            color: var(--figma-color-text);
            text-decoration: none;
            transition: opacity 0.2s ease;
        }

        .footer a:hover {
            opacity: 0.7;
        }

        /* Estilos para el botón de regreso */
        .back-button {
            background: none;
            border: none;
            color: var(--figma-color-text);
            padding: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            transition: opacity 0.2s;
            margin-bottom: 16px;
        }

        .back-button:hover {
            opacity: 0.7;
        }

        .back-button svg {
            width: 20px;
            height: 20px;
        }
    </style>
    `