import { createButton } from './components/buttonComponent';
import { createInput } from './components/inputComponent';
import { ComponentData } from './types/componentTypes';

// Main function to generate UI components
export async function generateUIComponent(data: ComponentData): Promise<FrameNode | null> {
    try {
        console.log('Generating component with data:', data);
        
        // Validate required data
        if (!data || !data.type) {
            console.error('Invalid component data');
            return null;
        }

        // Generate component based on type
        switch (data.type.toLowerCase()) {
            case 'button':
                console.log('Creating button component');
                return await createButton(data);
                
            case 'input':
                console.log('Creating input component');
                return await createInput(data);
                
            default:
                console.error('Unsupported component type:', data.type);
                return null;
        }
    } catch (error) {
        console.error('Error generating component:', error);
        return null;
    }
}