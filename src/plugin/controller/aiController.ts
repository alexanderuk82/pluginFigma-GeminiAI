import { AIService } from '../services/aiService';
import { generateUIComponent } from '../services/componentGenerator';

export async function handleAIComponentGeneration(prompt: string) {
    try {
        console.log('Starting AI component generation with prompt:', prompt);
        
        // Step 1: Generate component data using AI
        const aiResponse = await AIService.generateComponent(prompt);
        console.log('AI Response received:', aiResponse);
        
        // Step 2: Create the component in Figma
        await generateUIComponent(aiResponse);
        console.log('Component created in Figma');
        
        // Step 3: Return success
        return {
            success: true,
            message: 'Component generated successfully'
        };
        
    } catch (error) {
        console.error('Error in AI component generation:', error);
        throw error;
    }
}
