export const branding = `

   <div id="brandingModal" class="branding-modal">
        <div class="branding-modal-content">
            <h2>Do you have branding colors?</h2>
            <div class="branding-options">
                <div class="branding-option" onclick="selectBrandingOption(event, 'yes')">Yes</div>
                <div class="branding-option" onclick="selectBrandingOption(event, 'no')">No</div>
            </div>
            <div id="colorFields" class="color-fields">
                <div class="color-field">
                    <label>Primary Color</label>
                    <div class="input-group">
                        <input type="text" id="primary-color" placeholder="#0c8ce9" 
                            onchange="updateColorPreview(this)"
                            oninput="handleColorInput(this)"
                            onpaste="handleColorPaste(event)">
                        <input type="color" id="primary-picker" class="color-picker" value="#0c8ce9" 
                            style="display: none;" 
                            oninput="handleColorPickerInput(event)"
                            onchange="handleColorPickerInput(event)">
                        <div class="color-preview" id="primary-color-preview" style="background-color: #0c8ce9" onclick="openColorPicker('primary')"></div>
                    </div>
                </div>
                <div class="color-field">
                    <label>Secondary Color</label>
                    <div class="input-group">
                        <input type="text" id="secondary-color" placeholder="#6c757d" 
                            onchange="updateColorPreview(this)"
                            oninput="handleColorInput(this)"
                            onpaste="handleColorPaste(event)">
                        <input type="color" id="secondary-picker" class="color-picker" value="#6c757d" 
                            style="display: none;" 
                            oninput="handleColorPickerInput(event)"
                            onchange="handleColorPickerInput(event)">
                        <div class="color-preview" id="secondary-color-preview" style="background-color: #6c757d" onclick="openColorPicker('secondary')"></div>
                    </div>
                </div>
                <div class="color-field">
                    <label>Tertiary Color</label>
                    <div class="input-group">
                        <input type="text" id="tertiary-color" placeholder="#394360" 
                            onchange="updateColorPreview(this)"
                            oninput="handleColorInput(this)"
                            onpaste="handleColorPaste(event)">
                        <input type="color" id="tertiary-picker" class="color-picker" value="#394360" 
                            style="display: none;" 
                            oninput="handleColorPickerInput(event)"
                            onchange="handleColorPickerInput(event)">
                        <div class="color-preview" id="tertiary-color-preview" style="background-color: #394360" onclick="openColorPicker('tertiary')"></div>
                    </div>
                </div>
            </div>
            <div class="branding-actions">
                <button class="btn-secondary" onclick="closeBrandingModal()">Cancel</button>
                <button class="btn-primary" onclick="confirmBranding()">Continue</button>
            </div>
        </div>
    </div>

`