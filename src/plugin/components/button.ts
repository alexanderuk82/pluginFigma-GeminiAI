export async function createButton(msg: { config?: any; colors?: any }) {
    const config = msg.config || {};
    const colors = msg.colors || {
        primary: '#0D99FF',    // Azul brillante para acciones principales
        secondary: '#6C757D',  // Gris neutro para acciones secundarias
        tertiary: '#394360',   // Azul oscuro para elementos terciarios
        success: '#198754',    // Verde para éxito
        warning: '#FFC107',    // Amarillo para advertencias
        danger: '#DC3545'      // Rojo para errores/destructivo
    };

    // Helper function to convert hex to RGB
    function hexToRgb(hex: string): { r: number; g: number; b: number } {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        return { r, g, b };
    }

    // Create a single frame for the button
    const button = figma.createFrame();
    button.name = "Button";

    // Set AutoLayout
    button.layoutMode = "HORIZONTAL";
    button.primaryAxisAlignItems = "CENTER";
    button.counterAxisAlignItems = "CENTER";
    button.primaryAxisSizingMode = "AUTO"; // HUG content width
    button.counterAxisSizingMode = "AUTO"; // HUG content height
    button.paddingLeft = 16;
    button.paddingRight = 16;
    button.paddingTop = 10;
    button.paddingBottom = 10;
    button.itemSpacing = 8;
    
    // Apply border style
    switch (config.borderStyle) {
        case 'pill':
            button.cornerRadius = 100; // Valor alto para crear efecto pill
            break;
        case 'square':
            button.cornerRadius = 0;
            break;
        default:
            button.cornerRadius = 6;
            break;
    }

    // Apply variant styles
    switch (config.variant) {
        case 'primary':
            button.fills = [{ type: 'SOLID', color: hexToRgb(colors.primary) }];
            button.strokes = [];
            break;
        case 'secondary':
            button.fills = [{ type: 'SOLID', color: hexToRgb(colors.secondary) }];
            button.strokes = [];
            break;
        case 'secondary-outline':
            button.fills = [];
            button.strokes = [{ type: 'SOLID', color: hexToRgb(colors.secondary) }];
            button.strokeWeight = 1;
            break;
        case 'primary-outline':
            button.fills = [];
            button.strokes = [{ type: 'SOLID', color: hexToRgb(colors.primary) }];
            button.strokeWeight = 1;
            break;
        case 'destructive':
            button.fills = [{ type: 'SOLID', color: hexToRgb(colors.danger) }];
            button.strokes = [];
            break;
        case 'link':
            button.fills = [];
            button.strokes = [];
            break;
    }

    // Apply size
    switch (config.size) {
        case 'sm':
            button.paddingLeft = 12;
            button.paddingRight = 12;
            button.paddingTop = 6;
            button.paddingBottom = 6;
            button.itemSpacing = 6;
            break;
        case 'lg':
            button.paddingLeft = 20;
            button.paddingRight = 20;
            button.paddingTop = 16;
            button.paddingBottom = 16;
            button.itemSpacing = 10;
            break;
    }

    // Add left icon if needed
    if (config.hasIcon && config.iconPosition === 'left') {
        const icon = figma.createNodeFromSvg(`
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        `);
        icon.findAll(node => node.type === "VECTOR").forEach(vector => {
            (vector as VectorNode).strokes = [{ type: 'SOLID', color: config.textColor === 'dark' ? { r: 0.2, g: 0.2, b: 0.2 } : { r: 1, g: 1, b: 1 } }];
        });
        button.appendChild(icon);
    }

    // Add text
    const text = figma.createText();
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    text.fontName = { family: "Inter", style: "Medium" };
    text.characters = config.text || "Button";
    text.fontSize = config.size === 'sm' ? 13 : config.size === 'lg' ? 16 : 14;
    text.fills = [{ type: 'SOLID', color: config.textColor === 'dark' ? { r: 0.2, g: 0.2, b: 0.2 } : { r: 1, g: 1, b: 1 } }];
    button.appendChild(text);

    // Add right icon if needed
    if (config.hasIcon && config.iconPosition === 'right') {
        const icon = figma.createNodeFromSvg(`
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        `);
        icon.findAll(node => node.type === "VECTOR").forEach(vector => {
            (vector as VectorNode).strokes = [{ type: 'SOLID', color: config.textColor === 'dark' ? { r: 0.2, g: 0.2, b: 0.2 } : { r: 1, g: 1, b: 1 } }];
        });
        button.appendChild(icon);
    }

    // Set width
    if (config.width === 'full') {
        button.resize(320, button.height);
    }

    // Add loading state if needed
    if (config.state === 'loading') {
        button.opacity = 0.7;
    }

    // Add disabled state if needed
    if (config.state === 'disabled') {
        button.opacity = 0.5;
    }

    figma.currentPage.appendChild(button);
    figma.viewport.scrollAndZoomIntoView([button]);
}
