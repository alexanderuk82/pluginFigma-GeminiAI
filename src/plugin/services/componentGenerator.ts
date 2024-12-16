import { createButton } from './components/buttonComponent';
import { createInput } from './components/inputComponent';
import { createForm } from './molecules/formMolecule';
import { ComponentData } from './types/componentTypes';

// Main function to generate UI components
export async function generateUIComponent(data: ComponentData): Promise<FrameNode> {
    try {
        console.log('Generating component with data:', data);
        
        // Validate required data
        if (!data || !data.type) {
            console.error('Invalid component data');
            throw new Error('Invalid component data');
        }

        let component: FrameNode;

        // Generate component based on type
        switch (data.type.toLowerCase()) {
            case 'button':
                console.log('Creating button component');
                component = await createButton(data);
                break;
                
            case 'input':
                console.log('Creating input component');
                component = await createInput(data);
                break;
                
            case 'form':
                console.log('Creating form component');
                component = await createForm(data);
                break;
                
            default:
                console.error('Unsupported component type:', data.type);
                throw new Error(`Unsupported component type: ${data.type}`);
        }

        // Get the current viewport center
        const center = figma.viewport.center;
        
        // Set the position to the current viewport center
        component.x = center.x;
        component.y = center.y;
        
        // Select the new component
        figma.currentPage.selection = [component];
        
        // Zoom to fit the component
        figma.viewport.scrollAndZoomIntoView([component]);

        return component;
    } catch (error) {
        console.error('Error generating component:', error);
        throw error;
    }
}