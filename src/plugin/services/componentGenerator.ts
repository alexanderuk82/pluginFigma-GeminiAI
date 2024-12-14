interface ComponentStyle {
    padding?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    cornerRadius?: number;
    backgroundColor?: {
        r: number;
        g: number;
        b: number;
    };
    textColor?: {
        r: number;
        g: number;
        b: number;
    };
    fontSize?: number;
    fontWeight?: number;
    width?: number;
    height?: number;
}

interface ComponentData {
    type: 'input' | 'button' | 'checkbox' | 'radio';
    text: string;
    placeholder?: string;
    size: 'small' | 'medium' | 'large';
    state: 'default' | 'hover' | 'active' | 'disabled';
    style: ComponentStyle;
}

// Function to extract component data from AI response
function extractComponentData(aiResponse: any): ComponentData | null {
    try {
        console.log('Raw AI Response:', JSON.stringify(aiResponse, null, 2));
        
        if (!aiResponse?.candidates?.[0]?.content?.parts?.[0]?.text) {
            console.log('Invalid response structure');
            return null;
        }

        const responseText = aiResponse.candidates[0].content.parts[0].text.trim();
        console.log('Response Text:', responseText);
        
        // Try to parse JSON from response
        let componentData;
        try {
            // First try direct JSON parse
            componentData = JSON.parse(responseText);
        } catch {
            // If direct parse fails, try to find JSON in the text
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                console.log('No JSON found in response');
                return null;
            }
            componentData = JSON.parse(jsonMatch[0]);
        }

        console.log('Parsed Component Data:', componentData);
        
        // Validate component structure
        if (!componentData.type || !componentData.text || !componentData.style) {
            console.log('Missing required fields in component data');
            return null;
        }

        // Convert padding values from rem to pixels and ensure they are numbers
        const defaultPadding = {
            top: remToPixels(1),
            right: remToPixels(1),
            bottom: remToPixels(1),
            left: remToPixels(1)
        };

        const padding = componentData.style.padding || {};
        const convertedPadding = {
            top: remToPixels(Number(padding.top)) || defaultPadding.top,
            right: remToPixels(Number(padding.right)) || defaultPadding.right,
            bottom: remToPixels(Number(padding.bottom)) || defaultPadding.bottom,
            left: remToPixels(Number(padding.left)) || defaultPadding.left
        };

        // Ensure all required style properties exist with defaults if missing
        componentData.style = {
            padding: convertedPadding,
            cornerRadius: Number(componentData.style.cornerRadius) || 8,
            backgroundColor: {
                r: Number(componentData.style.backgroundColor?.r) || 0.2,
                g: Number(componentData.style.backgroundColor?.g) || 0.4,
                b: Number(componentData.style.backgroundColor?.b) || 1
            },
            textColor: {
                r: Number(componentData.style.textColor?.r) || 1,
                g: Number(componentData.style.textColor?.g) || 1,
                b: Number(componentData.style.textColor?.b) || 1
            },
            fontSize: Number(componentData.style.fontSize) || 16,
            fontWeight: Number(componentData.style.fontWeight) || 500
        };

        return componentData;
    } catch (error) {
        console.error('Error extracting component data:', error);
        return null;
    }
}

// Function to convert rem to pixels
export function remToPixels(rem: number): number {
    const baseFontSize = 16; // Base font size in pixels
    return rem * baseFontSize;
}

// Function to create frame with auto-layout
export async function createFrameWithAutoLayout(data: ComponentData): Promise<FrameNode> {
    try {
        // Load the Inter font before creating the text
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
        
        const frame = figma.createFrame();
        frame.name = `${data.type}-component`;
        
        // Set up auto-layout
        frame.layoutMode = "HORIZONTAL";
        frame.counterAxisSizingMode = "AUTO";
        frame.primaryAxisSizingMode = "AUTO";
        frame.layoutAlign = "STRETCH";
        frame.fills = [{
            type: 'SOLID',
            color: data.style.backgroundColor || { r: 0.2, g: 0.4, b: 1 }
        }];
        
        // Set padding
        frame.paddingTop = data.style.padding?.top || 16;
        frame.paddingRight = data.style.padding?.right || 24;
        frame.paddingBottom = data.style.padding?.bottom || 16;
        frame.paddingLeft = data.style.padding?.left || 24;
        
        // Set corner radius
        frame.cornerRadius = data.style.cornerRadius || 8;
        
        // Create text node
        const text = figma.createText();
        text.characters = data.text || "Button";
        text.fontSize = data.style.fontSize || 16;
        
        // Set text color
        text.fills = [{
            type: 'SOLID',
            color: data.style.textColor || { r: 1, g: 1, b: 1 }
        }];
        
        // Add text to frame
        frame.appendChild(text);
        
        return frame;
    } catch (error) {
        console.error('Error creating frame:', error);
        throw error;
    }
}

// Main function to generate UI components
export async function generateUIComponent(componentData: ComponentData): Promise<void> {
    try {
        console.log('Starting component generation...');
        console.log('Creating component with data:', componentData);
        
        let component: FrameNode;
        
        switch (componentData.type) {
            case 'button':
                component = await createFrameWithAutoLayout(componentData);
                break;
            default:
                throw new Error('Unsupported component type');
        }
        
        // Center the component in the viewport
        const { x, y } = figma.viewport.center;
        component.x = x - component.width / 2;
        component.y = y - component.height / 2;
        
        // Select the new component
        figma.currentPage.selection = [component];
        
        console.log('Component generated successfully');
        
    } catch (error) {
        console.error('Error generating component:', error);
        throw error;
    }
}
