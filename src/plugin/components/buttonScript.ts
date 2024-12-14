// Types
interface ButtonConfig {
    variant: 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline' | 'destructive' | 'link';
    size: 'sm' | 'md' | 'lg';
    text: string;
    hasIcon: boolean;
    iconPosition: 'left' | 'right';
    state: 'default' | 'loading' | 'disabled';
    width: 'hug' | 'full';
    textColor: 'dark' | 'light';
    borderStyle: 'default' | 'dashed' | 'none';
}

interface ColorConfig {
    primary: string;
    secondary: string;
    tertiary: string;
    success: string;
    warning: string;
    danger: string;
}

// Constants
const LOADING_SPINNER = '<svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>';
const ARROW_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

export const buttonScripts = `
    // Initial configurations
    let buttonConfig = {
        variant: 'primary',
        size: 'md',
        text: 'Button',
        hasIcon: false,
        iconPosition: 'left',
        state: 'default',
        width: 'hug',
        textColor: 'dark',
        borderStyle: 'default'
    };

    const defaultColors = {
        primary: '#0D99FF',
        secondary: '#6C757D',
        tertiary: '#394360',
        success: '#198754',
        warning: '#FFC107',
        danger: '#DC3545'
    };

    let globalColors = { ...defaultColors };

    // Helper Functions
    function updateSelectedOption(section, value) {
        const options = section.querySelectorAll('.variant-option');
        options.forEach(opt => {
            opt.classList.remove('selected');
            if (opt.innerText.toLowerCase() === value.toLowerCase()) {
                opt.classList.add('selected');
            }
        });
    }

    // Button Update Functions
    function updateButtonVariant(variant) {
        buttonConfig.variant = variant;
        updatePreview();
        updateSelectedOption(event.target.closest('.config-section'), variant);
    }

    function updateButtonSize(size) {
        buttonConfig.size = size;
        updatePreview();
        const label = size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large';
        updateSelectedOption(event.target.closest('.config-section'), label);
    }

    function updateButtonState(state) {
        buttonConfig.state = state;
        updatePreview();
        const label = state === 'default' ? 'Default' : state === 'loading' ? 'Loading' : 'Disabled';
        updateSelectedOption(event.target.closest('.config-section'), label);
    }

    function updateButtonWidth(width) {
        buttonConfig.width = width;
        updatePreview();
        updateSelectedOption(event.target.closest('.config-section'), width === 'hug' ? 'Hug' : 'Full');
    }

    function updateButtonText(text) {
        buttonConfig.text = text;
        updatePreview();
    }

    function toggleIcon() {
        const iconPositionSelect = document.getElementById('iconPosition');
        buttonConfig.hasIcon = document.getElementById('hasIcon').checked;
        iconPositionSelect.disabled = !buttonConfig.hasIcon;
        updatePreview();
    }

    function updateIconPosition() {
        buttonConfig.iconPosition = document.getElementById('iconPosition').value;
        updatePreview();
    }

    function updateTextColor(color, element) {
        buttonConfig.textColor = color;
        updateTextColorSelection(element);
        updatePreview();
    }

    function updateTextColorSelection(selectedElement) {
        const allOptions = selectedElement.parentElement.querySelectorAll('.variant-option');
        allOptions.forEach(opt => opt.classList.remove('selected'));
        selectedElement.classList.add('selected');
    }

    function updateBorderStyle(style) {
        buttonConfig.borderStyle = style;
        updatePreview();
        updateSelectedOption(event.target.closest('.config-section'), style);
    }

    // Preview Update Function
    function updatePreview() {
        const preview = document.getElementById('buttonPreview');
        if (!preview) return;
        
        // Reset and apply base classes
        preview.className = '';
        preview.classList.add(
            'preview-button',
            buttonConfig.size,
            buttonConfig.variant,
            buttonConfig.state,
            \`border-\${buttonConfig.borderStyle}\`
        );
        
        preview.setAttribute('data-text-color', buttonConfig.textColor);
        preview.style.width = buttonConfig.width === 'full' ? '100%' : 'auto';
        
        // Build content
        let content = '';
        if (buttonConfig.state === 'loading') {
            content += '${LOADING_SPINNER}';
        }
        
        if (buttonConfig.hasIcon && buttonConfig.iconPosition === 'left') {
            content += '${ARROW_ICON}';
        }
        
        content += buttonConfig.text;
        
        if (buttonConfig.hasIcon && buttonConfig.iconPosition === 'right') {
            content += '${ARROW_ICON}';
        }
        
        preview.innerHTML = content;
        
        // Apply variant-specific styles
        applyVariantStyles(preview);
    }

    function applyVariantStyles(preview) {
        const style = preview.style;
        const variantStyles = {
            primary: {
                background: globalColors.primary,
                color: 'white',
                borderColor: 'transparent'
            },
            secondary: {
                background: globalColors.secondary,
                color: 'white',
                borderColor: 'transparent'
            },
            'primary-outline': {
                background: 'none',
                borderColor: globalColors.primary,
                color: globalColors.primary
            },
            'secondary-outline': {
                background: 'none',
                borderColor: globalColors.secondary,
                color: globalColors.secondary
            },
            destructive: {
                background: globalColors.danger,
                color: 'white',
                borderColor: 'transparent'
            },
            link: {
                background: 'none',
                color: globalColors.primary,
                borderColor: 'transparent'
            }
        };

        const styles = variantStyles[buttonConfig.variant];
        Object.assign(style, styles);
    }

    function generateFinalButton() {
        parent.postMessage({ 
            pluginMessage: { 
                type: 'create-button',
                config: buttonConfig,
                colors: globalColors
            }
        }, '*');
    }
`;