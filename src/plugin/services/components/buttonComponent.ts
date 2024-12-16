import { ComponentData } from '../types/componentTypes';
import { remToPixels } from '../utils/unitConversion';

// Function to create button component
export async function createButton(data: ComponentData): Promise<FrameNode> {
    try {
        // Load required fonts
        await Promise.all([
            figma.loadFontAsync({ family: "Inter", style: "Regular" }),
            figma.loadFontAsync({ family: "Inter", style: "Medium" })
        ]);

        // Create main button frame
        const buttonFrame = figma.createFrame();
        buttonFrame.name = "button-component";
        buttonFrame.layoutMode = "HORIZONTAL";
        buttonFrame.primaryAxisAlignItems = "CENTER";
        buttonFrame.counterAxisAlignItems = "CENTER";
        buttonFrame.layoutAlign = "STRETCH";
        buttonFrame.fills = [];
        buttonFrame.layoutSizingVertical = "HUG";

        // Set padding
        buttonFrame.paddingTop = data.style.padding?.top || 12;
        buttonFrame.paddingRight = data.style.padding?.right || 24;
        buttonFrame.paddingBottom = data.style.padding?.bottom || 12;
        buttonFrame.paddingLeft = data.style.padding?.left || 24;

        // Set corner radius
        buttonFrame.cornerRadius = data.style.cornerRadius || 8;

        // Handle gradient or solid fill
        if (data.style.fill?.type === 'gradient' && data.style.fill.gradient) {
            const angle = (data.style.fill.gradient.angle || 45) * Math.PI / 180;
            const gradientTransform: Transform = [
                [Math.cos(angle), -Math.sin(angle), 0.5],
                [Math.sin(angle), Math.cos(angle), 0.5]
            ];

            const paint: GradientPaint = {
                type: "GRADIENT_LINEAR",
                gradientTransform,
                gradientStops: data.style.fill.gradient.stops.map(stop => ({
                    position: stop.position,
                    color: {
                        r: stop.color.r,
                        g: stop.color.g,
                        b: stop.color.b,
                        a: 1
                    }
                }))
            };
            buttonFrame.fills = [paint];
        } else {
            buttonFrame.fills = [{
                type: 'SOLID',
                color: data.style.fill?.color || { r: 0.2, g: 0.4, b: 1 }
            }];
        }

        // Create text node
        const textNode = figma.createText();
        textNode.characters = data.text || "Button";
        textNode.fontSize = data.style.fontSize || 16;
        textNode.fills = [{
            type: 'SOLID',
            color: data.style.textColor || { r: 1, g: 1, b: 1 }
        }];

        // Set text alignment
        if (data.style.textAlign === 'left') {
            buttonFrame.primaryAxisAlignItems = "MIN";
        } else if (data.style.textAlign === 'right') {
            buttonFrame.primaryAxisAlignItems = "MAX";
        }

        buttonFrame.appendChild(textNode);
        return buttonFrame;
    } catch (error) {
        console.error('Error creating button:', error);
        throw error;
    }
}
