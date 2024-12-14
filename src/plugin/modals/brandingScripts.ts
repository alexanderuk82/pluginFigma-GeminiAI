// Types
interface ColorConfig {
    primary: string;
    secondary: string;
    tertiary: string;
    success: string;
    warning: string;
    danger: string;
}

interface ColorUpdateEvent {
    id: string;
    value: string;
    type: string;
}

// Utility Functions
const hexColorValidator = {
    isValid: (color: string): boolean => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(color),
    normalize: (color: string): string => {
        if (color.length === 4) {
            return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
        }
        return color.toUpperCase();
    },
    addHash: (color: string): string => color.charAt(0) !== '#' ? `#${color}` : color
};

export const brandingScripts = `
    // Modal Control Functions
    function viewAtoms() {
        const brandingModal = document.getElementById('brandingModal');
        if (brandingModal) {
            brandingModal.style.display = 'flex';
        } else {
            console.error('Branding modal not found');
        }
    }

    function closeBrandingModal() {
        const brandingModal = document.getElementById('brandingModal');
        if (brandingModal) {
            brandingModal.style.display = 'none';
        }
    }

    // Branding Options Management
    function selectBrandingOption(event, option) {
        const options = document.querySelectorAll('.branding-option');
        options.forEach(opt => opt.classList.remove('selected'));
        event.target.classList.add('selected');
        
        const colorFields = document.getElementById('colorFields');
        if (colorFields) {
            colorFields.style.display = option === 'yes' ? 'flex' : 'none';
        }

        if (option === 'no') {
            globalColors = { ...defaultColors };
            updatePreview();
        }
    }

    function confirmBranding() {
        const selectedOption = document.querySelector('.branding-option.selected');
        
        if (selectedOption) {
            handleBrandingConfirmation(selectedOption);
            updateColorPreviews();
            saveAndUpdateColors();
        }
        
        closeBrandingModal();
        openAtomsModal();
    }

    function handleBrandingConfirmation(selectedOption) {
        if (selectedOption.textContent === 'Yes') {
            globalColors = {
                primary: document.getElementById('primary-color')?.value || defaultColors.primary,
                secondary: document.getElementById('secondary-color')?.value || defaultColors.secondary,
                tertiary: document.getElementById('tertiary-color')?.value || defaultColors.tertiary,
                success: defaultColors.success,
                warning: defaultColors.warning,
                danger: defaultColors.danger
            };
        } else {
            globalColors = { ...defaultColors };
        }
    }

    function updateColorPreviews() {
        Object.keys(globalColors).forEach(key => {
            const preview = document.getElementById(key + '-color-preview');
            if (preview) {
                preview.style.backgroundColor = globalColors[key];
            }
        });
    }

    function saveAndUpdateColors() {
        parent.postMessage({ 
            pluginMessage: { 
                type: 'save-colors',
                colors: globalColors
            }
        }, '*');
    }

    // Color Picker Management
    function updateColorPreview(input) {
        const colorType = input.id;
        const preview = document.getElementById(colorType + '-preview');
        const picker = document.getElementById(colorType + '-picker');
        
        if (preview && picker) {
            preview.style.backgroundColor = input.value;
            picker.value = input.value;
        }
    }

    function openColorPicker(colorType) {
        const picker = document.getElementById(colorType + '-picker');
        if (picker) {
            picker.addEventListener('input', function() {
                updateColorFromPicker(this);
            }, { once: true });
            picker.click();
        }
    }

    function updateColorFromPicker(input) {
        if (!input?.value) return;

        const colorType = input.id.replace('-picker', '-color');
        const elements = {
            textInput: document.getElementById(colorType),
            preview: document.getElementById(colorType + '-preview')
        };
        
        if (elements.textInput && elements.preview) {
            const hexColor = input.value.toUpperCase();
            updateColorElements(elements, hexColor, colorType);
            updatePreviewButton(colorType, hexColor);
        }
    }

    function updateColorElements(elements, hexColor, colorType) {
        elements.textInput.value = hexColor;
        elements.preview.style.backgroundColor = hexColor;
        
        const colorKey = colorType.replace('-color', '').toLowerCase();
        if (colorKey in globalColors) {
            globalColors[colorKey] = hexColor;
        }
    }

    function updatePreviewButton(colorType, hexColor) {
        requestAnimationFrame(() => {
            const previewButton = document.querySelector('.preview-button');
            if (!previewButton) return;

            const colorKey = colorType.replace('-color', '').toLowerCase();
            const variantStyle = getVariantStyle(buttonConfig.variant, colorKey, hexColor);
            Object.assign(previewButton.style, variantStyle);
        });
    }

    function getVariantStyle(variant, colorKey, hexColor) {
        const styles = {
            'primary': {
                backgroundColor: colorKey === 'primary' ? hexColor : null
            },
            'secondary': {
                backgroundColor: colorKey === 'secondary' ? hexColor : null
            },
            'secondary-outline': {
                borderColor: colorKey === 'secondary' ? hexColor : null,
                color: colorKey === 'secondary' ? hexColor : null
            }
        };
        return styles[variant] || {};
    }

    // Color Input Handling
    function handleColorPickerInput(event) {
        updateColorFromPicker(event.target);
    }

    function handleColorInput(input) {
        let value = input.value.trim();
        value = value.charAt(0) !== '#' ? '#' + value : value;
        
        if (isValidHexColor(value)) {
            value = normalizeHexColor(value);
            updateColorValues(input.id, value);
        }
    }

    function isValidHexColor(color) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
    }

    function normalizeHexColor(value) {
        if (value.length === 4) {
            return '#' + value[1] + value[1] + value[2] + value[2] + value[3] + value[3];
        }
        return value.toUpperCase();
    }

    function updateColorValues(inputId, value) {
        const colorType = inputId.replace('-color', '');
        const elements = {
            preview: document.getElementById(colorType + '-color-preview'),
            picker: document.getElementById(colorType + '-picker')
        };

        if (elements.preview && elements.picker) {
            elements.preview.style.backgroundColor = value;
            elements.picker.value = value;
            
            if (colorType in globalColors) {
                globalColors[colorType] = value;
                updatePreviewButton(inputId, value);
            }
        }
    }
`;