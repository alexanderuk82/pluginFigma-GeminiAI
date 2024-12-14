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
            console.log(' Starting connection to Render Proxy...');
            console.log(' Proxy URL:', AIConfig.PROXY_URL);
            
            const enhancedPrompt = `
                Create a Figma component with EXACTLY this JSON structure:
                {
                    "type": "button",
                    "text": "Click me",
                    "size": "medium",
                    "state": "default",
                    "style": {
                        "padding": {
                            "top": 16,
                            "right": 24,
                            "bottom": 16,
                            "left": 24
                        },
                        "cornerRadius": 8,
                        "backgroundColor": {
                            "r": 0.2,
                            "g": 0.4,
                            "b": 1
                        },
                        "textColor": {
                            "r": 1,
                            "g": 1,
                            "b": 1
                        },
                        "fontSize": 16
                    }
                }

                Rules:
                1. Return ONLY the JSON object
                2. No code blocks, no explanations
                3. All color values must be numbers between 0-1
                4. All measurements must be numbers
                5. The structure must match EXACTLY

                User request: ${prompt}
            `;
            
            console.log(' Enhanced prompt created');
            
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
            
            console.log(' Sending request to Render...');
            
            const response = await fetch(AIConfig.PROXY_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(' Render proxy error:', {
                    status: response.status,
                    statusText: response.statusText,
                    errorText
                });
                throw new Error(`Request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(' Render response received');
            
            if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new Error('Invalid response format from AI service');
            }

            const responseText = data.candidates[0].content.parts[0].text.trim();
            console.log(' Processing AI response');
            
            // Extract JSON object
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No valid JSON found in response');
            }
            
            const componentData = JSON.parse(jsonMatch[0]);
            console.log(' Component data parsed successfully:', componentData);
            
            // Validate required fields
            if (!componentData.type || !componentData.text || !componentData.style) {
                throw new Error('Missing required fields in component data');
            }
            
            return componentData;

        } catch (error) {
            console.error(' Error in component generation:', error);
            throw error;
        }
    }
}
