import React, { useState } from 'react';

const ConditionalLogic: React.FC<{ fields: any[]; onUpdate: (updatedFields: any[]) => void }> = ({ fields, onUpdate }) => {
    const [selectedField, setSelectedField] = useState<string>('');
    const [condition, setCondition] = useState<string>('');
    const [targetField, setTargetField] = useState<string>('');

    const handleAddCondition = () => {
        if (selectedField && condition && targetField) {
            const updatedFields = fields.map(field => {
                if (field.id === targetField) {
                    return { ...field, conditionalLogic: { ...field.conditionalLogic, [selectedField]: condition } };
                }
                return field;
            });
            onUpdate(updatedFields);
            resetFields();
        }
    };

    const resetFields = () => {
        setSelectedField('');
        setCondition('');
        setTargetField('');
    };

    return (
        <div>
            <h3>Conditional Logic</h3>
            <div>
                <label>Select Field:</label>
                <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
                    <option value="">Select a field</option>
                    {fields.map(field => (
                        <option key={field.id} value={field.id}>{field.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Condition:</label>
                <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Enter condition" />
            </div>
            <div>
                <label>Target Field:</label>
                <select value={targetField} onChange={(e) => setTargetField(e.target.value)}>
                    <option value="">Select target field</option>
                    {fields.map(field => (
                        <option key={field.id} value={field.id}>{field.label}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleAddCondition}>Add Condition</button>
        </div>
    );
};

export default ConditionalLogic;