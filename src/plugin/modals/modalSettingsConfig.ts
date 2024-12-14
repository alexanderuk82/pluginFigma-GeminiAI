export const buttonConfig = `
 <div class="component-config" id="buttonConfig">
        <div class="preview-panel">
            <button class="back-button" onclick="closeButtonConfig()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Menu
            </button>
            <div class="preview-header">
                <div class="preview-title">Button Preview</div>
                <div class="preview-subtitle">Interactive preview of your button component</div>
            </div>
            <div class="preview-canvas">
                <button id="buttonPreview" class="preview-button default">
                    Button
                </button>
            </div>
        </div>
        
        <div class="settings-panel">
            <div class="config-header">
                <h3 class="config-title">Settings</h3>
                <button class="close-button" onclick="closeButtonConfig()">
                   <svg class="svg" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path fill="#fff" fill-opacity="1" fill-rule="nonzero" stroke="none" d="m6 5.293 4.789-4.79.707.708-4.79 4.79 4.79 4.789-.707.707-4.79-4.79-4.789 4.79-.707-.707L5.293 6 .502 1.211 1.21.504z"></path></svg>
                </button>
            </div>

            <div class="config-section">
                <h4 class="config-section-title">Variant</h4>
                <div class="variant-grid">
                    <div class="variant-option selected" onclick="updateButtonVariant('primary')">Primary</div>
                    <div class="variant-option" onclick="updateButtonVariant('secondary')">Secondary</div>
                    <div class="variant-option" onclick="updateButtonVariant('secondary-outline')">Secondary Outline</div>
                    <div class="variant-option" onclick="updateButtonVariant('primary-outline')">Primary Outline</div>
                    <div class="variant-option" onclick="updateButtonVariant('destructive')">Destructive</div>
                    <div class="variant-option" onclick="updateButtonVariant('link')">Link</div>
                </div>
            </div>

            <div class="config-section">
                <h4 class="config-section-title">Size</h4>
                <div class="variant-grid">
                    <div class="variant-option" onclick="updateButtonSize('sm')">Small</div>
                    <div class="variant-option selected" onclick="updateButtonSize('md')">Medium</div>
                    <div class="variant-option" onclick="updateButtonSize('lg')">Large</div>
                </div>
            </div>

            <div class="config-section">
                <h4 class="config-section-title">Text Color</h4>
                <div class="variant-grid">
                    <div class="variant-option selected" onclick="updateTextColor('dark', this)">Dark Text</div>
                    <div class="variant-option" onclick="updateTextColor('light', this)">Light Text</div>
                </div>
            </div>

            <div class="config-section">
                <h4 class="config-section-title">Content</h4>
                <div class="config-row">
                    <label class="config-label">Button Text</label>
                    <input type="text" class="config-input" value="Button" onchange="updateButtonText(this.value)">
                </div>
            </div>

            <div class="config-section">
                <h4 class="config-section-title">Icon</h4>
                <div class="config-row">
                    <div class="config-checkbox">
                        <input type="checkbox" id="hasIcon" onchange="toggleIcon()">
                        <label for="hasIcon">Add Icon</label>
                    </div>
                    <select class="config-select" id="iconPosition" onchange="updateIconPosition()" disabled>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                    </select>
                </div>
            </div>

            <div class="config-section">
                <h4 class="config-section-title">State</h4>
                <div class="variant-grid">
                    <div class="variant-option selected" onclick="updateButtonState('default')">Default</div>
                    <div class="variant-option" onclick="updateButtonState('loading')">Loading</div>
                    <div class="variant-option" onclick="updateButtonState('disabled')">Disabled</div>
                </div>
            </div>

            <div class="config-section">
                <h4 class="config-section-title">Width</h4>
                <div class="variant-grid">
                    <div class="variant-option selected" onclick="updateButtonWidth('hug')">Hug</div>
                    <div class="variant-option" onclick="updateButtonWidth('full')">Full</div>
                </div>
            </div>

            <div class="config-section">
                <h4 class="config-section-title">Border Style</h4>
                <div class="variant-grid">
                    <div class="variant-option selected" onclick="updateBorderStyle('default')">Default</div>
                    <div class="variant-option" onclick="updateBorderStyle('square')">Square</div>
                    <div class="variant-option" onclick="updateBorderStyle('pill')">Pill</div>
                </div>
            </div>

            <div class="generate-button-fixed">
                <button class="generate-button" onclick="generateFinalButton()" style="width: 100%">
                    Generate Button
                </button>
            </div>
        </div>
    </div>
`