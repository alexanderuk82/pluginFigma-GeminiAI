import { styles } from "./styles";
import { script } from "./script";
import { home } from "./templates/home";
import { atoms } from "./modals/atoms";
import { buttonConfig } from "./modals/modalSettingsConfig";
import { branding } from "./modals/branding";
import { createButton } from "./components/button";
import { AIService } from './services/aiService';

const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Atomic Design Components</title>
    ${styles}
</head>
<body>
   
    <!-- Home -->
    ${home}

   <!-- Modal for atoms -->
    ${atoms}

    <!-- Configurador settings de Botón -->
    
    ${buttonConfig}

    <!-- Modal de branding -->
    
    ${branding}

    <!-- Footer con copyright -->
    <footer class="footer">
        &copy; 2024 Designed and developed by <a href="https://www.linkedin.com/in/alexandersstudio/" target="_blank" rel="noopener noreferrer">Alexander</a> with &hearts;
    </footer>

    ${script}
</body>
</html>
`;

figma.showUI(html, { 
  width: 600, 
  height: 700,
  themeColors: true
});

figma.ui.onmessage = async (msg: { type: string, config?: any, colors?: any, prompt?: string }) => {
    if (msg.type === 'create-button') {
        await createButton(msg);
    } else if (msg.type === 'generate-component' && msg.prompt) {
        try {
            console.log('Received generate-component request with prompt:', msg.prompt);
            
            // Realizar la llamada a la API desde el lado del plugin
            const response = await AIService.generateComponent(msg.prompt);
            console.log('AI Service Response:', response);

            // Enviar el resultado de vuelta a la UI
            figma.ui.postMessage({
                type: 'generation-complete',
                success: response.success,
                error: response.error,
                data: response.success ? response.data : null
            });

            if (response.success && response.data) {
                // Aquí procesaremos la respuesta para crear el componente
                console.log('Successful AI Response:', JSON.stringify(response.data, null, 2));
            }
        } catch (error) {
            console.error('Error in generate-component handler:', error);
            figma.ui.postMessage({
                type: 'generation-complete',
                success: false,
                error: 'An unexpected error occurred while generating the component'
            });
        }
    }
};
