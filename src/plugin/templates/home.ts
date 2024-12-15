export const home =`

<div id="root">
        <div class="header">
            <h1 class="title">Atomic Design Components</h1>
            <p class="description">Generate design system components using atomic design principles. Start with basic atoms and combine them into more complex molecules and organisms.</p>
        </div>

        <div class="grid">
            <div class="section atoms">
                <h2 class="section-title">
                    <span class="dot"></span>
                    Atoms
                </h2>
                <p class="section-description">Basic building blocks like buttons, inputs, and labels that form the foundation of your design system.</p>
                <button class="view-atoms-btn" onclick="viewAtoms()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                    View Atoms
                </button>
            </div>

            <div class="section molecules">
                <h2 class="section-title">
                    <span class="dot"></span>
                    Molecules
                </h2>
                <p class="section-description">Simple combinations of atoms working together as a unit, like a form field with label and input.</p>
                <div class="empty-state">Coming soon...</div>
            </div>

            <div class="section organisms">
                <h2 class="section-title">
                    <span class="dot"></span>
                    Organisms
                </h2>
                <p class="section-description">Complex UI components composed of molecules and atoms that form distinct sections of an interface.</p>
                <div class="empty-state">Coming soon...</div>
            </div>

            <div class="section templates">
                <h2 class="section-title">
                    <span class="dot"></span>
                    Templates
                </h2>
                <p class="section-description">Page-level objects that place components into a layout and articulate the design's underlying content structure.</p>
                <div class="empty-state">Coming soon...</div>
            </div>
        </div>

        <div class="divider"></div>

        <div class="ai-section">
            <h2 class="section-title">Generate Component with AI</h2>
            <div class="ai-content">
                <textarea 
                    id="ai-prompt" 
                    placeholder="Describe the component you want to generate... (e.g., 'Create a modern card component with image, title, and description')"
                    rows="4"
                ></textarea>
                <button id="generate-btn" onclick="generateComponent()">
                    <span class="btn-text">Generate</span>
                    <span class="loading-text" style="display: none;">
                        <svg class="spinner" width="16" height="16" viewBox="0 0 50 50">
                            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                        </svg>
                        Generating...
                    </span>
                </button>
                <div id="ai-message" class="message"></div>
            </div>
        </div>
    </div>
`