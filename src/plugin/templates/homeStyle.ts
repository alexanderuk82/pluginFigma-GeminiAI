export const homeStyle = `
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 16px;
        width: 100%;
    }

    .section {
        background: var(--figma-color-bg-secondary);
        border-radius: 12px;
        padding: 16px;
        transition: all 0.2s;
        border: 1px solid var(--figma-color-border);
        width: 100%;
    }

    .section:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .section-title {
        font-size: 16px;
        font-weight: 600;
        margin: 0 0 8px 0;
        color: var(--figma-color-text);
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .section-title .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .atoms .dot { background: #0D99FF; }
    .molecules .dot { background: #00C853; }
    .organisms .dot { background: #FF6B00; }
    .templates .dot { background: #8E24AA; }
    
    .section-description {
        font-size: 13px;
        color: var(--figma-color-text-secondary);
        margin: 0 0 16px 0;
        line-height: 1.4;
    }

    .view-all-button {
        background-color: var(--figma-color-bg);
        color: var(--figma-color-text);
        border: 1px solid var(--figma-color-border);
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
    }

    .view-all-button:hover {
        background-color: var(--figma-color-bg-hover);
        transform: translateY(-1px);
    }

    .view-all-button svg {
        width: 16px;
        height: 16px;
    }

    .view-atoms-btn {
        background-color: var(--figma-color-bg);
        color: var(--figma-color-text);
        border: 1px solid var(--figma-color-border);
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
    }

    .view-atoms-btn:hover {
        background-color: var(--figma-color-bg-hover);
        transform: translateY(-1px);
    }

    .view-atoms-btn svg {
        width: 16px;
        height: 16px;
    }
        
    .empty-state {
        color: #999;
        font-style: italic;
    }

    .ai-section {
        padding: 24px;
        background: var(--figma-color-bg-secondary);
        border-radius: 12px;
        margin-top: 24px;
    }

    .ai-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
        
    }

    #ai-prompt {
        width: 100%;
        min-height: 100px;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        resize: vertical;
        font-family: inherit;
    }

    #generate-btn {
        align-self: flex-start;
        padding: 12px 24px;
        background: #6366f1;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.2s;
    }

    #generate-btn:hover {
        background: #4f46e5;
    }

    #generate-btn:disabled {
        background: #c7d2fe;
        cursor: not-allowed;
    }

    .message {
        padding: 12px;
        border-radius: 6px;
        display: none;
    }

    .message.success {
        background: #dcfce7;
        color: #166534;
        display: block;
    }

    .message.error {
        background: #fee2e2;
        color: #991b1b;
        display: block;
    }

    /* Component Config Modal */
    #buttonConfig {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #1E1E1E;
        z-index: 1000;
        flex-direction: row;
    }
`;