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
                Available component types: "input", "button", "text", "icon", "form"

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

                For FORM components (combines inputs and buttons):
                {
                    "type": "form",
                    "style": {
                        "padding": { "top": 12, "right": 16, "bottom": 12, "left": 16 },
                        "margin": { "top": 0, "right": 0, "bottom": 0, "left": 0 },
                        "backgroundColor": { "r": 1, "g": 1, "b": 1 }
                    },
                    "title": {
                        "text": "Sign In",
                        "style": {
                            "fontSize": 24,
                            "textColor": { "r": 0.1, "g": 0.1, "b": 0.1 }
                        }
                    },
                    "inputs": [
                        {
                            "type": "input",
                            "label": "Email",
                            "placeholder": "name@company.com",
                            "caption": "Enter your work email",
                            "style": {
                                "padding": { "top": 12, "right": 16, "bottom": 12, "left": 16 },
                                "margin": { "top": 0, "right": 0, "bottom": 0, "left": 0 },
                                "backgroundColor": { "r": 0.98, "g": 0.98, "b": 0.98 },
                                "borderColor": { "r": 0.9, "g": 0.9, "b": 0.9 },
                                "borderRadius": 8,
                                "fontSize": 14,
                                "textColor": { "r": 0.1, "g": 0.1, "b": 0.1 }
                            }
                        }
                    ],
                    "button": {
                        "type": "button",
                        "text": "Sign in",
                        "style": {
                            "padding": { "top": 12, "right": 24, "bottom": 12, "left": 24 },
                            "margin": { "top": 0, "right": 0, "bottom": 0, "left": 0 },
                            "fill": {
                                "type": "gradient",
                                "gradient": {
                                    "angle": 45,
                                    "stops": [
                                        { "position": 0, "color": { "r": 0.145, "g": 0.388, "b": 0.922 } },
                                        { "position": 1, "color": { "r": 0.310, "g": 0.275, "b": 0.898 } }
                                    ]
                                }
                            },
                            "borderRadius": 8,
                            "fontSize": 16,
                            "textColor": { "r": 1, "g": 1, "b": 1 }
                        }
                    }
                }

                Color conversion notes:
                - #F9FAFB (light gray) = { "r": 0.976, "g": 0.980, "b": 0.984 }
                - #2563EB (blue) = { "r": 0.145, "g": 0.388, "b": 0.922 }
                - #4F46E5 (indigo) = { "r": 0.310, "g": 0.275, "b": 0.898 }

                Rules:
                1. Return ONLY the JSON object
                2. No code blocks, no explanations
                3. All color values must be numbers between 0-1
                4. All measurements must be numbers
                5. The structure must match EXACTLY for the chosen component type
                6. ALL style objects must include ALL fields shown in the example
                7. For forms, both inputs array and button object are REQUIRED
                8. Each input MUST have type, label, placeholder, and complete style object
                9. Button MUST have type, text, and complete style object

                Based on this prompt: ${prompt}
                Return a valid JSON object following the structure above.`;
            
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
            
            // Validate the component data
            if (!componentData || !componentData.type) {
                console.error('Invalid component data: Missing type');
                throw new Error('Missing required fields in component data');
            }

            if (componentData.type === 'form') {
                if (!componentData.inputs || !Array.isArray(componentData.inputs) || componentData.inputs.length === 0) {
                    console.error('Invalid form data: Missing or empty inputs array');
                    throw new Error('Missing required fields in component data');
                }
                if (!componentData.button || !componentData.button.type || !componentData.button.text) {
                    console.error('Invalid form data: Missing or invalid button');
                    throw new Error('Missing required fields in component data');
                }
                // Validate each input
                componentData.inputs.forEach((input, index) => {
                    if (!input.type || !input.style) {
                        console.error(`Invalid input at index ${index}: Missing required fields`);
                        throw new Error('Missing required fields in component data');
                    }
                });
            }

            // Default styles for different component types
            const baseStyle = {
                padding: { top: 8, right: 12, bottom: 8, left: 12 },
                margin: { top: 0, right: 0, bottom: 0, left: 0 },
                fontSize: 14,
                textColor: { r: 0.1, g: 0.1, b: 0.1 },
                backgroundColor: { r: 1, g: 1, b: 1 },
                borderColor: { r: 0.9, g: 0.9, b: 0.9 },
                borderRadius: 8
            };

            const styleDefaults = {
                button: {
                    ...baseStyle,
                    text: "",
                    style: {
                        padding: { top: 12, right: 24, bottom: 12, left: 24 },
                        fill: {
                            type: "solid",
                            color: { r: 0.145, g: 0.388, b: 0.922 }
                        },
                        textColor: { r: 1, g: 1, b: 1 },
                        fontSize: 16,
                        borderRadius: 8
                    }
                },
                input: {
                    ...baseStyle,
                    label: "",
                    placeholder: "",
                    style: {
                        padding: { top: 12, right: 16, bottom: 12, left: 16 },
                        backgroundColor: { r: 0.98, g: 0.98, b: 0.98 },
                        borderColor: { r: 0.9, g: 0.9, b: 0.9 },
                        fontSize: 14,
                        borderRadius: 8
                    }
                },
                form: {
                    type: "form",
                    inputs: [],
                    button: {
                        type: "button",
                        text: "",
                        style: {
                            padding: { top: 12, right: 24, bottom: 12, left: 24 },
                            fill: {
                                type: "solid",
                                color: { r: 0.145, g: 0.388, b: 0.922 }
                            },
                            textColor: { r: 1, g: 1, b: 1 },
                            fontSize: 16,
                            borderRadius: 8
                        }
                    },
                    style: {
                        ...baseStyle
                    }
                }
            };

            // Merge component-specific defaults with AI response
            const defaultStyle = styleDefaults[componentData.type] || baseStyle;
            
            if (componentData.type === 'form') {
                // Ensure each input has required fields and styles
                componentData.inputs = (componentData.inputs || []).map(input => ({
                    type: "input",
                    ...styleDefaults.input,
                    ...input,
                    style: {
                        ...styleDefaults.input.style,
                        ...input.style
                    }
                }));

                // Ensure button has required fields and styles
                componentData.button = {
                    type: "button",
                    ...styleDefaults.button,
                    ...componentData.button,
                    style: {
                        ...styleDefaults.button.style,
                        ...componentData.button?.style
                    }
                };

                componentData.style = {
                    ...baseStyle,
                    ...componentData.style
                };
            } else {
                componentData.style = {
                    ...defaultStyle,
                    ...componentData.style
                };
            }
            
            return componentData;

        } catch (error) {
            console.error('Error in AI component generation:', error);
            throw error;
        }
    }
}
