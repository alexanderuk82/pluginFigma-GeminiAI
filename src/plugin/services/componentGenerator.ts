import { createButton } from './components/buttonComponent';
import { createInput } from './components/inputComponent';
import { createForm } from './molecules/formMolecule';
import { ComponentData } from './types/componentTypes';

// Main function to generate UI components
export async function generateUIComponent(data: ComponentData): Promise<FrameNode> {
    try {
        console.log('Starting component generation with data type:', data.type);
        console.log('Generating component with data:', data);
        
        // Validate required data
        if (!data || !data.type) {
            console.error('Invalid component data');
            throw new Error('Invalid component data');
        }

        // Generate component based on type
        let component;
      switch (data.type.toLowerCase()) {
          case 'button':
              console.log('Creating button component');
              component = await createButton(data);
              break;  // Agregar break
              
          case 'input':
              console.log('Creating input component');
              component = await createInput(data);
              break;  // Agregar break
              
          case 'form':
              console.log('Creating form component');
              component = await createForm(data);
              break;  // Agregar break
              
          default:
              console.error('Unsupported component type:', data.type);
              throw new Error(`Unsupported component type: ${data.type}`);
      }

        // Get current viewport center
        const bounds = figma.viewport.bounds;
        const cursorX = bounds.x + bounds.width / 2;
        const cursorY = bounds.y + bounds.height / 2;
        
        // Position the component at viewport center
        component.x = cursorX;
        component.y = cursorY;
        
        // Select and focus on the new component
        figma.currentPage.selection = [component];
        figma.viewport.scrollAndZoomIntoView([component]);

        return component;
    } catch (error) {
        console.error('Error generating component:', error);
        throw error;
    }
}