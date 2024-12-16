import { ComponentData } from '../types/componentTypes';
import { remToPixels } from '../utils/unitConversion';

// Function to create input component
export async function createInput(data: ComponentData): Promise<FrameNode> {
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
        mainFrame.itemSpacing = 8;
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
        
        if (cornerStyle === 'pill') {
            cornerRadius = inputFrame.height / 2;
        } else if (cornerStyle === 'sharp') {
            cornerRadius = 0;
        } else if (cornerStyle === 'subtle') {
            cornerRadius = 4;
        }
        
        inputFrame.cornerRadius = cornerRadius;
        
        // Set background and border
        if (data.style.fill) {
            if (data.style.fill.type === 'gradient' && data.style.fill.gradient) {
                const angle = (data.style.fill.gradient.angle || 45) * Math.PI / 180;
                const gradientTransform: Transform = [
                    [Math.cos(angle), -Math.sin(angle), 0.5],
                    [Math.sin(angle), Math.cos(angle), 0.5]
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
        
        // Set border based on state
        const borderColor = data.state === 'error'
            ? { r: 0.86, g: 0.15, b: 0.15 }
            : data.state === 'success'
                ? { r: 0.13, g: 0.77, b: 0.37 }
                : { r: 0.8, g: 0.8, b: 0.8 };
        
        inputFrame.strokes = [{
            type: 'SOLID',
            color: borderColor
        }];
        inputFrame.strokeWeight = 1;
        
        // Create placeholder text
        if (data.placeholder) {
            const placeholder = figma.createText();
            placeholder.characters = data.placeholder;
            placeholder.fontSize = data.style.fontSize || 14;
            placeholder.fills = [{
                type: 'SOLID',
                color: { r: 0.6, g: 0.6, b: 0.6 }
            }];
            inputFrame.appendChild(placeholder);
        }
        
        mainFrame.appendChild(inputFrame);

        // Create caption or state message
        if (data.state && data.stateMessage) {
            const messageNode = figma.createText();
            messageNode.characters = data.stateMessage;
            messageNode.fontSize = (data.style.fontSize || 14) - 2;
            messageNode.fills = [{
                type: 'SOLID',
                color: data.state === 'error'
                    ? { r: 0.86, g: 0.15, b: 0.15 }
                    : data.state === 'success'
                        ? { r: 0.13, g: 0.77, b: 0.37 }
                        : { r: 0.4, g: 0.4, b: 0.4 }
            }];
            mainFrame.appendChild(messageNode);
        } else if (data.caption) {
            const captionNode = figma.createText();
            captionNode.characters = data.caption;
            captionNode.fontSize = (data.style.fontSize || 14) - 2;
            captionNode.fills = [{
                type: 'SOLID',
                color: { r: 0.4, g: 0.4, b: 0.4 }
            }];
            mainFrame.appendChild(captionNode);
        }

        return mainFrame;
    } catch (error) {
        console.error('Error creating input:', error);
        throw error;
    }
}
