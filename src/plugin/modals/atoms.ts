export const atoms =`
 <!-- Modal for Atoms -->
    <div class="modal-overlay" id="atomsModal">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Atomic Components</h3>
                <button class="close-button" onclick="closeAtomsModal()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M12 5l7 7-7 7"/>
                    </svg>
                </button>
            </div>
            <div class="atoms-grid">
                <div class="atom-card">
                    <h4 class="atom-title">Button</h4>
                    <p class="atom-description">A versatile button component with various states and styles. Perfect for actions and form submissions.</p>
                    <button class="generate-button" onclick="createButton()">Start Generating</button>
                </div>
                <div class="atom-card">
                    <h4 class="atom-title">Input Field</h4>
                    <p class="atom-description">A clean and functional input field for text entry. Includes states for focus, error, and disabled.</p>
                    <button class="generate-button" onclick="createInput()">Start Generating</button>
                </div>
                <div class="atom-card">
                    <h4 class="atom-title">Checkbox</h4>
                    <p class="atom-description">A customizable checkbox component for binary choices. Includes checked, unchecked, and indeterminate states.</p>
                    <button class="generate-button" onclick="createCheckbox()">Start Generating</button>
                </div>
                <div class="atom-card">
                    <h4 class="atom-title">Radio Button</h4>
                    <p class="atom-description">A radio button component for single selection from multiple options. Includes selected and unselected states.</p>
                    <button class="generate-button" onclick="createRadio()">Start Generating</button>
                </div>
            </div>
        </div>
    </div>

`