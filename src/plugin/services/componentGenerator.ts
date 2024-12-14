interface GradientStop {
    position: number;
    color: {
        r: number;
        g: number;
        b: number;
    };
}

interface Fill {
    type: 'solid' | 'gradient';
    color?: {
        r: number;
        g: number;
        b: number;
    };
    gradient?: {
        type: 'linear';
        angle: number;
        stops: GradientStop[];
    };
}

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
    cornerStyle?: 'default' | 'pill' | 'sharp' | 'subtle';
    fill?: Fill;
    textColor?: {
        r: number;
        g: number;
        b: number;
    };
    borderColor?: {
        r: number;
        g: number;
        b: number;
    };
    borderWidth?: number;
    fontSize?: number;
    fontWeight?: number;
    width?: number;
    height?: number;
    caption?: {
        text?: string;
        color?: {
            r: number;
            g: number;
            b: number;
        };
    };
    success?: {
        message?: string;
        color?: {
            r: number;
            g: number;
            b: number;
        };
    };
    error?: {
        message?: string;
        color?: {
            r: number;
            g: number;
            b: number;
        };
    };
    hover?: {
        fill?: Fill;
    };
    active?: {
        fill?: Fill;
    };
    disabled?: {
        fill?: Fill;
        textColor?: {
            r: number;
            g: number;
            b: number;
        };
    };
    textAlign?: 'left' | 'center' | 'right';
}

interface ComponentData {
    type: 'input' | 'button' | 'checkbox' | 'radio';
    text: string;
    label?: string;
    placeholder?: string;
    size: 'small' | 'medium' | 'large';
    state: 'default' | 'hover' | 'active' | 'disabled' | 'error' | 'success';
    style: ComponentStyle;
    variant?: 'primary' | 'secondary' | 'text' | 'outlined';
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
            fill: {
                type: 'solid',
                color: {
                    r: Number(componentData.style.backgroundColor?.r) || 0.2,
                    g: Number(componentData.style.backgroundColor?.g) || 0.4,
                    b: Number(componentData.style.backgroundColor?.b) || 1
                }
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

// Function to create button component
async function createButton(data: ComponentData): Promise<FrameNode> {
    try {
        // First, load all required fonts
        await Promise.all([
            figma.loadFontAsync({ family: "Inter", style: "Regular" }),
            figma.loadFontAsync({ family: "Inter", style: "Medium" })
        ]);

        // Create frame and text nodes
        const button = figma.createFrame();
        button.name = "button-component";
        button.layoutMode = "HORIZONTAL"; 
        button.counterAxisSizingMode = "AUTO";
        button.primaryAxisSizingMode = "AUTO";
        button.layoutAlign = "STRETCH";
        button.itemSpacing = 8;
        
        // Set primary axis alignment based on text alignment
        button.primaryAxisAlignItems = data.style.textAlign === 'left' 
            ? 'START' 
            : data.style.textAlign === 'right'
            ? 'END'
            : 'CENTER'; // default to center if not specified
        
        // Set counter axis alignment to center (vertical alignment)
        button.counterAxisAlignItems = 'CENTER';
        
        const textNode = figma.createText();
        textNode.fontName = { family: "Inter", style: "Regular" };
        textNode.characters = data.text;
        textNode.name = "button-text";
        textNode.fontSize = data.style.fontSize || 16;
        textNode.fills = [{
            type: "SOLID",
            color: {
                r: data.style.textColor?.r || 1,
                g: data.style.textColor?.g || 1,
                b: data.style.textColor?.b || 1
            }
        }];
        
        // Set button size based on text content
        const padding = data.style.padding || { top: 12, right: 24, bottom: 12, left: 24 };
        const width = textNode.width + padding.left + padding.right;
        const height = textNode.height + padding.top + padding.bottom;
        button.resize(width, height);
        
        // Center text in button
        textNode.x = (button.width - textNode.width) / 2;
        textNode.y = (button.height - textNode.height) / 2;
        
        // Apply button styles
        button.cornerRadius = data.style.cornerRadius || 8;
        
        // Apply fill (solid color or gradient)
        if (data.style.fill) {
            if (data.style.fill.type === 'gradient' && data.style.fill.gradient) {
                const angle = (data.style.fill.gradient.angle || 45) * Math.PI / 180;
                
                // Figma's gradient transform matrix calculation
                const startX = Math.cos(angle - Math.PI / 2);
                const startY = Math.sin(angle - Math.PI / 2);
                const endX = Math.cos(angle + Math.PI / 2);
                const endY = Math.sin(angle + Math.PI / 2);
                
                const gradientTransform: Transform = [
                    [endX - startX, endY - startY, (startX + endX) / 2],
                    [-endY + startY, endX - startX, (startY + endY) / 2]
                ];

                const paint: GradientPaint = {
                    type: "GRADIENT_LINEAR",
                    gradientTransform,
                    gradientStops: data.style.fill.gradient?.stops.map(stop => ({
                        position: stop.position,
                        color: {
                            r: stop.color.r,
                            g: stop.color.g,
                            b: stop.color.b,
                            a: 1
                        }
                    })) || [
                        {
                            position: 0,
                            color: {
                                r: 0.2,
                                g: 0.4,
                                b: 1,
                                a: 1
                            }
                        },
                        {
                            position: 1,
                            color: {
                                r: 0.6,
                                g: 0.2,
                                b: 0.8,
                                a: 1
                            }
                        }
                    ]
                };
                
                button.fills = [paint];
            } else if (data.style.fill.type === 'solid' && data.style.fill.color) {
                button.fills = [{
                    type: "SOLID",
                    color: {
                        r: data.style.fill.color.r,
                        g: data.style.fill.color.g,
                        b: data.style.fill.color.b
                    }
                }];
            }
        }
        
        // Add border if specified
        if (data.style.borderWidth && data.style.borderWidth > 0) {
            button.strokes = [];
            button.strokeWeight = data.style.borderWidth;
        }
        
        // Add text to button
        button.appendChild(textNode);
        
        // Set constraints
        button.constraints = {
            horizontal: "CENTER",
            vertical: "CENTER"
        };
        
        return button;
    } catch (error) {
        console.error('Error creating button:', error);
        throw error;
    }
}

// Function to create input component
async function createInput(data: ComponentData): Promise<FrameNode> {
    try {
        // First, load all required fonts
        await Promise.all([
            figma.loadFontAsync({ family: "Inter", style: "Regular" }),
            figma.loadFontAsync({ family: "Inter", style: "Medium" })
        ]);

        const mainFrame = figma.createFrame();
        mainFrame.name = "input-component";
        mainFrame.layoutMode = "VERTICAL";
        mainFrame.counterAxisSizingMode = "AUTO";
        mainFrame.primaryAxisSizingMode = "AUTO";
        mainFrame.layoutAlign = "STRETCH";
        mainFrame.itemSpacing = 8; // Añadiendo gap por defecto
        mainFrame.fills = [];
        
        // Create label if provided
        if (data.label) {
            const label = figma.createText();
            label.characters = data.label;
            label.fontSize = data.style.fontSize || 14;
            label.fills = [{
                type: 'SOLID',
                color: data.style.textColor || { r: 0.1, g: 0.1, b: 0.1 }
            }];
            mainFrame.appendChild(label);
        }
        
        // Create input frame
        const inputFrame = figma.createFrame();
        inputFrame.name = "input-field";
        inputFrame.layoutMode = "HORIZONTAL";
        inputFrame.counterAxisSizingMode = "AUTO";
        inputFrame.primaryAxisSizingMode = "AUTO";
        inputFrame.layoutAlign = "STRETCH";
        
        // Set padding
        inputFrame.paddingTop = data.style.padding?.top || 16;
        inputFrame.paddingRight = data.style.padding?.right || 24;
        inputFrame.paddingBottom = data.style.padding?.bottom || 16;
        inputFrame.paddingLeft = data.style.padding?.left || 24;
        
        // Set corner radius based on style description
        const cornerStyle = data.style.cornerStyle || 'default';
        let cornerRadius = data.style.cornerRadius || 8;
        
        // Adjust corner radius based on style
        if (cornerStyle === 'pill') {
            cornerRadius = inputFrame.height / 2; // Pill shape
        } else if (cornerStyle === 'sharp') {
            cornerRadius = 0; // Sharp corners
        } else if (cornerStyle === 'subtle') {
            cornerRadius = 4; // Subtle rounded corners
        }
        
        inputFrame.cornerRadius = cornerRadius;
        
        // Set background and border
        if (data.style.fill) {
            if (data.style.fill.type === 'gradient' && data.style.fill.gradient) {
                const angle = (data.style.fill.gradient.angle || 45) * Math.PI / 180;
                
                // Figma's gradient transform matrix calculation
                const startX = Math.cos(angle - Math.PI / 2);
                const startY = Math.sin(angle - Math.PI / 2);
                const endX = Math.cos(angle + Math.PI / 2);
                const endY = Math.sin(angle + Math.PI / 2);
                
                const gradientTransform: Transform = [
                    [endX - startX, endY - startY, (startX + endX) / 2],
                    [-endY + startY, endX - startX, (startY + endY) / 2]
                ];

                const paint: GradientPaint = {
                    type: "GRADIENT_LINEAR",
                    gradientTransform,
                    gradientStops: data.style.fill.gradient?.stops.map(stop => ({
                        position: stop.position,
                        color: {
                            r: stop.color.r,
                            g: stop.color.g,
                            b: stop.color.b,
                            a: 1
                        }
                    }))
                };
                inputFrame.fills = [paint];
            } else {
                inputFrame.fills = [{
                    type: 'SOLID',
                    color: data.style.fill.color || { r: 1, g: 1, b: 1 }
                }];
            }
        }
        
        // Set border based on state and gradient if specified
        if (data.style.fill?.type === 'gradient' && data.style.fill.gradient) {
            const angle = (data.style.fill.gradient.angle || 45) * Math.PI / 180;
            const gradientTransform: Transform = [
                [Math.cos(angle), -Math.sin(angle), 0.5],
                [Math.sin(angle), Math.cos(angle), 0.5]
            ];
            
            const borderPaint: GradientPaint = {
                type: "GRADIENT_LINEAR",
                gradientTransform,
                gradientStops: data.style.fill.gradient?.stops.map(stop => ({
                    position: stop.position,
                    color: {
                        r: stop.color.r,
                        g: stop.color.g,
                        b: stop.color.b,
                        a: 1
                    }
                }))
            };
            inputFrame.strokes = [borderPaint];
        } else {
            const borderColor = data.state === 'error' 
                ? { r: 0.86, g: 0.15, b: 0.15 } // Red for error
                : data.state === 'success'
                    ? { r: 0.13, g: 0.77, b: 0.37 } // Green for success
                    : { r: 0.8, g: 0.8, b: 0.8 }; // Default gray
            
            inputFrame.strokes = [{
                type: 'SOLID',
                color: borderColor
            }];
        }
        
        inputFrame.strokeWeight = 1;
        
        mainFrame.appendChild(inputFrame);

        // Create placeholder text
        if (data.placeholder) {
            const placeholder = figma.createText();
            placeholder.characters = data.placeholder;
            placeholder.fontSize = data.style.fontSize || 14;
            placeholder.fills = [{
                type: 'SOLID',
                color: { r: 0.6, g: 0.6, b: 0.6 } // Placeholder color
            }];
            inputFrame.appendChild(placeholder);
        }

        // Create caption if provided
        if (data.caption) {
            const captionNode = figma.createText();
            captionNode.characters = data.caption;
            captionNode.fontSize = (data.style.fontSize || 14) - 2; // Slightly smaller than input text
            captionNode.fills = [{
                type: 'SOLID',
                color: { r: 0.4, g: 0.4, b: 0.4 } // Caption color - gray
            }];
            mainFrame.appendChild(captionNode);
        }

        // Create state message if provided
        if (data.state && data.stateMessage) {
            const messageNode = figma.createText();
            messageNode.characters = data.stateMessage;
            messageNode.fontSize = (data.style.fontSize || 14) - 2;
            
            // Set color based on state
            const messageColor = data.state === 'error' 
                ? { r: 0.86, g: 0.15, b: 0.15 } // Red for error
                : { r: 0.13, g: 0.77, b: 0.37 }; // Green for success
            
            messageNode.fills = [{
                type: 'SOLID',
                color: messageColor
            }];
            
            mainFrame.appendChild(messageNode);
        }

        return mainFrame;
    } catch (error) {
        console.error('Error creating input:', error);
        throw error;
    }
}

// Main function to generate UI components
export async function generateUIComponent(componentData: ComponentData): Promise<void> {
    try {
        console.log('Starting component generation...');
        
        // Ensure required fields have default values
        componentData = {
            ...componentData,
            size: componentData.size || 'medium',
            state: componentData.state || 'default',
            style: {
                padding: {
                    top: 16,
                    right: 24,
                    bottom: 16,
                    left: 24,
                    ...componentData.style?.padding
                },
                margin: {
                    top: 8,
                    right: 0,
                    bottom: 4,
                    left: 0,
                    ...componentData.style?.margin
                },
                fontSize: componentData.style?.fontSize || 16,
                cornerRadius: componentData.style?.cornerRadius || 8,
                fill: {
                    type: 'solid',
                    color: componentData.style?.fill?.color || { r: 1, g: 1, b: 1 },
                    ...componentData.style?.fill
                },
                textColor: componentData.style?.textColor || { r: 0.1, g: 0.1, b: 0.1 },
                borderColor: componentData.style?.borderColor || { r: 0.8, g: 0.8, b: 0.8 },
                borderWidth: componentData.style?.borderWidth || 1,
                ...componentData.style
            }
        };
        
        console.log('Creating component with data:', componentData);
        
        let component: FrameNode;
        
        switch (componentData.type) {
            case 'button':
                component = await createButton(componentData);
                break;
            case 'input':
                component = await createInput(componentData);
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
