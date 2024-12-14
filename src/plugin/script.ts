import { buttonScripts } from './components/buttonScript';
import { brandingScripts } from './modals/brandingScripts';

// Declaración global de tipos
declare global {
    interface Window {
        createButton: () => void;
        closeButtonConfig: () => void;
        openAtomsModal: () => void;
        closeAtomsModal: () => void;
    }
}

export const script = `
<script>
        // Esperar a que el DOM esté completamente cargado
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded');
            console.log('Atoms modal:', document.getElementById('atomsModal'));
            console.log('Configuration modal:', document.getElementById('buttonConfig'));
        });

        // Make generateComponent available globally
        window.generateComponent = async function() {
            console.log('Starting component generation...');
            const promptElement = document.getElementById('ai-prompt');
            const generateButton = document.getElementById('generate-btn');
            const messageElement = document.getElementById('ai-message');
            
            if (!promptElement || !generateButton || !messageElement) {
                console.error('Required elements not found');
                return;
            }

            const prompt = promptElement.value.trim();
            if (!prompt) {
                messageElement.textContent = 'Please enter a component description.';
                messageElement.className = 'message error';
                return;
            }

            try {
                console.log('Sending prompt:', prompt);
                
                // Update UI to loading state
                generateButton.disabled = true;
                messageElement.textContent = 'Generating component...';
                messageElement.className = 'message info';

                // Send message to plugin
                parent.postMessage({ 
                    pluginMessage: { 
                        type: 'generate-component',
                        prompt: prompt
                    } 
                }, '*');
                
                console.log('Message sent to plugin');
            } catch (error) {
                console.error('Error:', error);
                messageElement.textContent = 'Error generating component: ' + error.message;
                messageElement.className = 'message error';
                generateButton.disabled = false;
            }
        };

        // Función para manejar la generación del botón
        window.createButton = function() {
            console.log('createButton llamado');
            
            const atomsModal = document.getElementById('atomsModal');
            const configModal = document.getElementById('buttonConfig');
            
            console.log('atomsModal:', atomsModal);
            console.log('configModal:', configModal);
            
            if (atomsModal) {
                atomsModal.style.display = 'none';
            }
            
            if (configModal) {
                configModal.style.display = 'flex';
                configModal.style.position = 'fixed';
                configModal.style.top = '0';
                configModal.style.left = '0';
                configModal.style.width = '100%';
                configModal.style.height = '100%';
                configModal.style.zIndex = '1000';
                console.log('Modal de configuración mostrado');
            } else {
                console.error('No se encontró el modal de configuración');
            }
        };

        window.closeButtonConfig = function() {
            const configModal = document.getElementById('buttonConfig');
            const atomsModal = document.getElementById('atomsModal');
            
            if (configModal) {
                configModal.style.display = 'none';
            }
            
            if (atomsModal) {
                atomsModal.style.display = 'flex';
            }
        };

        // Funciones para el manejo de modales
        window.openAtomsModal = () => {
            const atomsModal = document.getElementById('atomsModal');
            if (atomsModal) {
                atomsModal.style.display = 'flex';
            }
        };

        window.closeAtomsModal = () => {
            const atomsModal = document.getElementById('atomsModal');
            if (atomsModal) {
                atomsModal.style.display = 'none';
            }
        };

        window.confirmBranding = () => {
            const brandingModal = document.getElementById('brandingModal');
            if (brandingModal) {
                brandingModal.style.display = 'none';
            }
            window.openAtomsModal();
        };

        // Listen for messages from the plugin
        window.onmessage = async (event) => {
            const message = event.data.pluginMessage;
            if (!message) return;

            const messageElement = document.getElementById('ai-message');
            const generateButton = document.getElementById('generate-btn');
            
            if (!messageElement || !generateButton) return;
            
            if (message.type === 'generation-complete') {
                messageElement.textContent = 'Component generated successfully!';
                messageElement.className = 'message success';
                generateButton.disabled = false;
                
                // Ocultar el mensaje después de 5 segundos
                setTimeout(() => {
                    messageElement.textContent = '';
                    messageElement.className = 'message';
                }, 5000);
                
            } else if (message.type === 'generation-error') {
                messageElement.textContent = message.error || 'Error generating component';
                messageElement.className = 'message error';
                generateButton.disabled = false;
                
                // Ocultar el mensaje de error después de 5 segundos también
                setTimeout(() => {
                    messageElement.textContent = '';
                    messageElement.className = 'message';
                }, 5000);
            }
        };

        ${buttonScripts}
        ${brandingScripts}
    </script>
`