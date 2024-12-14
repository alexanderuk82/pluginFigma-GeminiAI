// AI Service for handling API calls securely
export interface AIResponse {
    success: boolean;
    data?: any;
    error?: string;
}

// Configuration for the AI service
const AI_CONFIG = {
    PROXY_URL: 'https://api.gemini-proxy.onrender.com/api/generate',  // URL del servidor proxy
    MAX_RETRIES: 3,
    TIMEOUT: 30000, // 30 seconds
};

export class AIService {
    private static async makeSecureRequest(prompt: string): Promise<AIResponse> {
        try {
            console.log('Making request to proxy server with prompt:', prompt);
            
            const response = await fetch(AI_CONFIG.PROXY_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseText = await response.text();
            console.log('Raw Proxy Response:', responseText);

            try {
                const data = JSON.parse(responseText);
                console.log('Parsed Proxy Response:', data);
                
                // Verificar si la respuesta contiene los datos esperados
                if (data.candidates && data.candidates[0]?.content?.parts) {
                    return {
                        success: true,
                        data: data
                    };
                } else {
                    throw new Error('Invalid response format from AI service');
                }
            } catch (parseError) {
                console.error('Error parsing proxy response:', parseError);
                return {
                    success: false,
                    error: 'Invalid response from proxy service'
                };
            }
        } catch (error) {
            console.error('Proxy Service Error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to generate component'
            };
        }
    }

    public static async generateComponent(prompt: string): Promise<AIResponse> {
        console.log('Starting component generation with prompt:', prompt);
        
        let retries = 0;
        while (retries < AI_CONFIG.MAX_RETRIES) {
            try {
                const response = await this.makeSecureRequest(prompt);
                if (response.success) {
                    return response;
                }
                retries++;
                console.log(`Retry attempt ${retries}`);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo entre intentos
            } catch (error) {
                console.error(`Attempt ${retries + 1} failed:`, error);
                if (retries === AI_CONFIG.MAX_RETRIES - 1) {
                    return {
                        success: false,
                        error: 'Maximum retry attempts reached. Please try again later.'
                    };
                }
                retries++;
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        return {
            success: false,
            error: 'Service temporarily unavailable. Please try again later.'
        };
    }
}
