// AI Service for handling API calls securely
import { AIConfig } from '../config/aiConfig';

export interface AIResponse {
    success: boolean;
    data?: any;
    error?: string;
}

export class AIService {
    static async generateComponent(prompt: string): Promise<any> {
        try {
            console.log('Starting AI component generation...');
            
            const enhancedPrompt = `
                Create a Figma component following these structures based on the component type.
                Available component types: "input", "button", "text", "icon"

                For BUTTON components:
                {
                    "type": "button",
                    "text": "Button text",
                    "variant": "primary",
                    "size": "medium",
                    "state": "default",
                    "style": {
                        "padding": { "top": 12, "right": 24, "bottom": 12, "left": 24 },
                        "margin": { "top": 0, "right": 0, "bottom": 0, "left": 0 },
                        "cornerRadius": 8,
                        "fill": {
                            "type": "gradient",
                            "gradient": {
                                "type": "linear",
                                "angle": 45,
                                "stops": [
                                    { "position": 0, "color": { "r": 0.2, "g": 0.4, "b": 1 } },
                                    { "position": 1, "color": { "r": 0.6, "g": 0.2, "b": 0.8 } }
                                ]
                            }
                        },
                        "textColor": { "r": 1, "g": 1, "b": 1 },
                        "fontSize": 16
                    }
                }

                For INPUT components with states:
                {
                    "type": "input",
                    "label": "Password",
                    "placeholder": "••••••••",
                    "caption": "Must be at least 8 characters",
                    "size": "medium",
                    "state": "error",
                    "stateMessage": "Password is too weak",
                    "style": {
                        "padding": { "top": 16, "right": 24, "bottom": 16, "left": 24 },
                        "margin": { "top": 8, "right": 0, "bottom": 4, "left": 0 },
                        "cornerRadius": 8,
                        "fill": {
                            "type": "solid",
                            "color": { "r": 1, "g": 1, "b": 1 }
                        },
                        "textColor": { "r": 0.1, "g": 0.1, "b": 0.1 },
                        "borderColor": { "r": 1, "g": 0.302, "b": 0.302 },
                        "borderWidth": 2,
                        "fontSize": 16,
                        "error": {
                            "message": "Password is too weak",
                            "color": { "r": 1, "g": 0.302, "b": 0.302 }
                        }
                    }
                }

                For GRADIENT buttons:
                {
                    "type": "button",
                    "text": "Create Account",
                    "variant": "primary",
                    "size": "medium",
                    "state": "default",
                    "style": {
                        "padding": { "top": 12, "right": 24, "bottom": 12, "left": 24 },
                        "margin": { "top": 0, "right": 0, "bottom": 0, "left": 0 },
                        "cornerRadius": 12,
                        "fill": {
                            "type": "gradient",
                            "gradient": {
                                "type": "linear",
                                "angle": 45,
                                "stops": [
                                    { "position": 0, "color": { "r": 0.745, "g": 0.647, "b": 0.325 } },
                                    { "position": 1, "color": { "r": 0.576, "g": 0.2, "b": 0.917 } }
                                ]
                            }
                        },
                        "textColor": { "r": 1, "g": 1, "b": 1 },
                        "fontSize": 16
                    }
                }

                Notes for gradients:
                1. Yellow (#BEAC53) = { "r": 0.745, "g": 0.647, "b": 0.325 }
                2. Purple (#9333EA) = { "r": 0.576, "g": 0.2, "b": 0.917 }
                3. Success Green = { "r": 0.34, "g": 0.84, "b": 0.42 }
                4. All RGB values must be between 0-1 (divide hex by 255)

                Notes for colors:
                1. Error Red (#FF4D4D) = { "r": 1, "g": 0.302, "b": 0.302 }
                2. Success Green (#22C55E) = { "r": 0.133, "g": 0.773, "b": 0.369 }
                3. Default Gray = { "r": 0.6, "g": 0.6, "b": 0.6 }

                Rules:
                1. Return ONLY the JSON object
                2. No code blocks, no explanations
                3. All color values must be numbers between 0-1
                4. All measurements must be numbers
                5. The structure must match EXACTLY for the chosen component type
                6. Choose the appropriate component type based on the user request
                7. Modify values based on the user request but maintain the structure
                8. Size options: "small", "medium", "large"
                9. States: "default", "hover", "active", "disabled", "error"
                10. Button variants: "primary", "secondary", "text", "outlined"
                11. Fill types: "solid", "gradient"
                12. For gradients, always include both gradient and solid fill fallback

                Rules for states:
                1. Error state: use borderColor and error.color in red
                2. Success state: use borderColor and success.color in green
                3. Default state: use borderColor in gray
                4. Caption shows above error/success message
                5. Error/Success messages use their respective colors

                Color Reference Guide:
                Hex to RGB Conversion Examples:
                - Forest Green (#2F855A): { "r": 0.18, "g": 0.52, "b": 0.35 }
                - Sea Blue (#2B6CB0): { "r": 0.17, "g": 0.42, "b": 0.69 }
                - Purple (#6B46C1): { "r": 0.42, "g": 0.27, "b": 0.76 }
                - Electric Blue (#60A5FA): { "r": 0.38, "g": 0.65, "b": 0.98 }
                - Coral (#FF6B6B): { "r": 1, "g": 0.42, "b": 0.42 }
                - Warm Yellow (#FFB344): { "r": 1, "g": 0.70, "b": 0.27 }

                Example of nature gradient:
                  "gradient": {
                    "type": "linear",
                    "angle": 90,
                    "stops": [
                      { "position": 0, "color": { "r": 0.18, "g": 0.52, "b": 0.35 } },
                      { "position": 1, "color": { "r": 0.17, "g": 0.42, "b": 0.69 } }
                    ]
                  }

                Note: All hex colors must be converted to RGB values between 0-1
                Example: #FF (255) becomes 1.0, #80 (128) becomes 0.5, #00 (0) becomes 0

                User request: ${prompt}
            `;
            
            console.log('Sending request to AI service...');
            
            const requestBody = {
                contents: [{
                    parts: [{
                        text: enhancedPrompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: 1000
                }
            };
            
            const response = await fetch(AIConfig.PROXY_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`AI service error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Raw AI response:', data);
            
            if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new Error('Invalid AI response format');
            }

            const responseText = data.candidates[0].content.parts[0].text.trim();
            console.log('AI response text:', responseText);
            
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No valid JSON found in AI response');
            }
            
            const componentData = JSON.parse(jsonMatch[0]);
            console.log('Parsed component data:', componentData);
            
            if (!componentData.type || !componentData.style) {
                throw new Error('Missing required fields in component data');
            }

            // Base style defaults for all components
            const baseStyle = {
                padding: { top: 12, right: 24, bottom: 12, left: 24 },
                margin: { top: 0, right: 0, bottom: 0, left: 0 },
                cornerRadius: 8,
                fill: {
                    type: "solid",
                    color: { r: 1, g: 1, b: 1 }
                },
                textColor: { r: 0.1, g: 0.1, b: 0.1 },
                borderColor: { r: 0.8, g: 0.8, b: 0.8 },
                borderWidth: 1,
                fontSize: 16
            };

            // Component-specific style defaults
            const styleDefaults = {
                input: {
                    ...baseStyle,
                    error: {
                        message: "",
                        color: { r: 1, g: 0, b: 0 }
                    }
                },
                button: {
                    ...baseStyle,
                    hover: {
                        fill: {
                            type: "solid",
                            color: { r: 0.3, g: 0.5, b: 1 }
                        }
                    },
                    active: {
                        fill: {
                            type: "solid",
                            color: { r: 0.1, g: 0.3, "b": 0.9 }
                        }
                    },
                    disabled: {
                        fill: {
                            type: "solid",
                            color: { r: 0.9, g: 0.9, b: 0.9 }
                        },
                        textColor: { r: 0.6, g: 0.6, b: 0.6 }
                    }
                }
            };

            // Merge component-specific defaults with AI response
            const defaultStyle = styleDefaults[componentData.type] || baseStyle;
            componentData.style = {
                ...defaultStyle,
                ...componentData.style,
                // Deep merge for nested objects
                padding: { ...defaultStyle.padding, ...componentData.style?.padding },
                margin: { ...defaultStyle.margin, ...componentData.style?.margin },
                fill: { ...defaultStyle.fill, ...componentData.style?.fill },
                textColor: { ...defaultStyle.textColor, ...componentData.style?.textColor },
                borderColor: { ...defaultStyle.borderColor, ...componentData.style?.borderColor }
            };

            // Add component-specific nested styles
            if (componentData.type === 'button') {
                componentData.style.hover = { 
                    ...defaultStyle.hover, 
                    ...componentData.style?.hover,
                    fill: { ...defaultStyle.hover.fill, ...componentData.style?.hover?.fill }
                };
                componentData.style.active = { 
                    ...defaultStyle.active, 
                    ...componentData.style?.active,
                    fill: { ...defaultStyle.active.fill, ...componentData.style?.active?.fill }
                };
                componentData.style.disabled = { 
                    ...defaultStyle.disabled, 
                    ...componentData.style?.disabled,
                    fill: { ...defaultStyle.disabled.fill, ...componentData.style?.disabled?.fill }
                };
            } else if (componentData.type === 'input') {
                componentData.style.error = { ...defaultStyle.error, ...componentData.style?.error };
            }
            
            return componentData;

        } catch (error) {
            console.error('Error in AI component generation:', error);
            throw error;
        }
    }
}
