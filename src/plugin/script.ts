import { buttonScripts } from './components/buttonScript';
import { brandingScripts } from './modals/brandingScripts';

export const script = `
<script>
        // Make generateComponent available globally
        window.generateComponent = async function() {
            const promptElement = document.getElementById('ai-prompt');
            const generateButton = document.getElementById('generate-btn');
            const messageElement = document.getElementById('ai-message');
            
            if (!promptElement || !generateButton || !messageElement) {
                console.error('Required elements not found');
                return;
            }

            const prompt = promptElement.value.trim();
            if (!prompt) {
                messageElement.textContent = 'Por favor, ingresa una descripción del componente que deseas generar.';
                messageElement.className = 'message error';
                return;
            }

            try {
                // Update UI to loading state
                generateButton.disabled = true;
                const btnText = generateButton.querySelector('.btn-text');
                const loadingText = generateButton.querySelector('.loading-text');
                if (btnText) btnText.style.display = 'none';
                if (loadingText) loadingText.style.display = 'inline';
                messageElement.textContent = 'Generando componente...';
                messageElement.className = 'message info';

                // Send message to the plugin
                parent.postMessage({ 
                    pluginMessage: { 
                        type: 'generate-component',
                        prompt: prompt
                    }
                }, '*');

                // Listen for the response
                window.onmessage = (event) => {
                    const message = event.data.pluginMessage;
                    if (message && message.type === 'generation-complete') {
                        // Reset UI state
                        generateButton.disabled = false;
                        if (btnText) btnText.style.display = 'inline';
                        if (loadingText) loadingText.style.display = 'none';

                        if (message.success) {
                            messageElement.textContent = 'Componente generado exitosamente!';
                            messageElement.className = 'message success';
                            // Aquí podrías mostrar la respuesta en la UI si lo deseas
                            console.log('Generation successful:', message.data);
                        } else {
                            messageElement.textContent = message.error || 'Error al generar el componente';
                            messageElement.className = 'message error';
                        }
                    }
                };
            } catch (error) {
                console.error('Error in generateComponent:', error);
                messageElement.textContent = 'Error inesperado al generar el componente';
                messageElement.className = 'message error';
                generateButton.disabled = false;
                if (btnText) btnText.style.display = 'inline';
                if (loadingText) loadingText.style.display = 'none';
            }
        };

        // Funciones para el modal de átomos
        function openAtomsModal() {
            console.log('Opening atoms modal...');
            const modal = document.getElementById('atomsModal');
            if (modal) {
                modal.style.display = 'flex';
                modal.querySelector('.modal').classList.add('show');
            } else {
                console.error('Atoms modal not found');
            }
        }

        function closeAtomsModal() {
            console.log('Closing atoms modal...');
            const modal = document.getElementById('atomsModal');
            if (modal) {
                modal.style.display = 'none';
                modal.querySelector('.modal').classList.remove('show');
            }
        }

        function createButton() {
            closeAtomsModal();
            const config = document.getElementById('buttonConfig');
            if (config) {
                config.style.display = 'block';
            }
        }

        // Listen for messages from the plugin
        window.onmessage = async (event) => {
            const message = event.data.pluginMessage;
            if (!message) return;

            if (message.type === 'generation-complete') {
                const generateButton = document.getElementById('generate-btn');
                const messageElement = document.getElementById('ai-message');
                
                if (generateButton && messageElement) {
                    // Reset button state
                    generateButton.disabled = false;
                    const btnText = generateButton.querySelector('.btn-text');
                    const loadingText = generateButton.querySelector('.loading-text');
                    if (btnText) btnText.style.display = 'inline';
                    if (loadingText) loadingText.style.display = 'none';

                    // Show result message
                    if (message.success) {
                        messageElement.textContent = 'Component generated successfully!';
                        messageElement.className = 'message success';
                    } else {
                        messageElement.textContent = message.error || 'Failed to generate component.';
                        messageElement.className = 'message error';
                    }
                }
            }
        };

        ${buttonScripts}
        ${brandingScripts}
    </script>
`