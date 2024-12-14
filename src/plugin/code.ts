import { styles } from "./styles";
import { script } from "./script";
import { home } from "./templates/home";
import { atoms } from "./modals/atoms";
import { buttonConfig } from "./modals/modalSettingsConfig";
import { branding } from "./modals/branding";
import { createButton } from "./components/button";
import { AIService } from './services/aiService';
import { generateUIComponent } from './services/componentGenerator';

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
    } else if (msg.type === 'generate-component') {
        try {
            console.log('Received generate-component message:', msg.prompt);
            
            // Generate component data using AI
            const componentData = await AIService.generateComponent(msg.prompt || '');
            console.log('Component data received:', componentData);
            
            // Generate the UI component in Figma
            await generateUIComponent(componentData);
            
            // Notify UI of success
            figma.ui.postMessage({ 
                type: 'generation-complete',
                success: true 
            });
            
        } catch (error) {
            console.error('Error in component generation:', error);
            figma.ui.postMessage({ 
                type: 'generation-error',
                error: error.message 
            });
        }
    }
};
