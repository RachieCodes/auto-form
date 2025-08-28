import React from 'react';

const ExportJSONSchema: React.FC<{ formConfig: any }> = ({ formConfig }) => {
    const handleExport = () => {
        const jsonSchema = JSON.stringify(formConfig, null, 2);
        const blob = new Blob([jsonSchema], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'form-schema.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <h2>Export JSON Schema</h2>
            <button onClick={handleExport}>Export</button>
        </div>
    );
};

export default ExportJSONSchema;