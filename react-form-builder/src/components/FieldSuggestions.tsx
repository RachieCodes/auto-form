import React from 'react';
import { ValidationRule } from '../types';

interface FieldSuggestionsProps {
    onSuggest: (rules: ValidationRule[]) => void;
}

const FieldSuggestions: React.FC<FieldSuggestionsProps> = ({ onSuggest }) => {
    const handleSuggest = () => {
        // Example: suggest some validation rules
        onSuggest([
            { rule: 'required', message: 'This field is required' }
        ]);
    };

    return (
        <div>
            <h3>Field Suggestions</h3>
            <button onClick={handleSuggest}>Suggest Validation Rules</button>
        </div>
    );
};

export default FieldSuggestions;