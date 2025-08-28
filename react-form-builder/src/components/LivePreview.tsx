import React from 'react';
import { FormField } from '../types';

interface LivePreviewProps {
    formData: FormField[];
}

const LivePreview: React.FC<LivePreviewProps> = ({ formData }) => {
    return (
        <div>
            <h3>Live Preview</h3>
            <ul>
                {formData.map(field => (
                    <li key={field.id}>
                        <strong>{field.id}</strong> ({field.type}) {field.required ? '[required]' : ''}
                        {field.options && field.options.length > 0 && (
                            <ul>
                                {field.options.map((opt, idx) => (
                                    <li key={idx}>{opt}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LivePreview;