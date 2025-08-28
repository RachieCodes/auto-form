import React from 'react';

interface EmbedCodeProps {
    formCode: string;
}

const EmbedCode: React.FC<EmbedCodeProps> = ({ formCode }) => (
    <div>
        <h3>Embed Code</h3>
        <pre>{formCode}</pre>
    </div>
);

export default EmbedCode;