import { ComponentData } from '../types/componentTypes';
import { createInput } from '../components/inputComponent';
import { createButton } from '../components/buttonComponent';

export async function createForm(data: ComponentData): Promise<FrameNode> {
    try {
        // Load required fonts first
        await Promise.all([
            figma.loadFontAsync({ family: "Inter", style: "Regular" }),
            figma.loadFontAsync({ family: "Inter", style: "Medium" }),
            figma.loadFontAsync({ family: "Inter", style: "Bold" })
        ]);

        // Create main form frame
        const formFrame = figma.createFrame();
        formFrame.name = "form-molecule";
        formFrame.layoutMode = "VERTICAL";
        formFrame.counterAxisSizingMode = "AUTO";
        formFrame.primaryAxisSizingMode = "AUTO";
        formFrame.itemSpacing = 16;
        formFrame.fills = [];

        // Add title if provided
        if (data.title) {
            const titleText = figma.createText();
            titleText.characters = data.title.text;
            
            // Load font before setting it
            await figma.loadFontAsync({ family: "Inter", style: "Bold" });
            titleText.fontName = { family: "Inter", style: "Bold" };
            titleText.fontSize = data.title.style?.fontSize || 24;
            
            if (data.title.style?.textColor) {
                titleText.fills = [{
                    type: 'SOLID',
                    color: data.title.style.textColor
                }];
            }
            
            formFrame.appendChild(titleText);
        }

        // Create form components based on data
        if (data.inputs) {
            for (const inputData of data.inputs) {
                const input = await createInput(inputData);
                formFrame.appendChild(input);
            }
        }

        // Create button if provided
        if (data.button) {
            const button = await createButton(data.button);
            formFrame.appendChild(button);
        }

        return formFrame;
    } catch (error) {
        console.error('Error creating form:', error);
        throw error;
    }
}
