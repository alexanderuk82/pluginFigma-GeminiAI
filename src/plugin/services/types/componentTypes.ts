// Types for component generation
export interface ComponentData {
    type: string;
    text?: string;
    label?: string;
    placeholder?: string;
    caption?: string;
    state?: 'default' | 'error' | 'success';
    stateMessage?: string;
    inputs?: ComponentData[];
    button?: ComponentData;
    style?: {
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
        fill?: {
            type: 'solid' | 'gradient';
            color?: {
                r: number;
                g: number;
                b: number;
            };
            gradient?: {
                type: 'linear';
                angle: number;
                stops: Array<{
                    position: number;
                    color: {
                        r: number;
                        g: number;
                        b: number;
                    };
                }>;
            };
        };
        textColor?: {
            r: number;
            g: number;
            b: number;
        };
        fontSize?: number;
        textAlign?: 'left' | 'center' | 'right';
    };
    variant?: 'primary' | 'secondary' | 'text' | 'outlined';
    title?: {
        text: string;
        style?: {
            fontSize?: number;
            fontWeight?: number;
            textColor?: {
                r: number;
                g: number;
                b: number;
            };
        }
    };
}
