export const enhancedPrompt = (prompt: string) => `
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