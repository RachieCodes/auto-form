import axios from 'axios';
import { AIFieldSuggestion, ValidationRule } from '../types';

const AI_SERVICE_URL = 'https://api.example.com/ai'; // Replace with actual AI service URL

export const generateValidationRules = async (fieldType: string): Promise<ValidationRule[]> => {
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/validation-rules`, { fieldType });
        return response.data.rules;
    } catch (error) {
        console.error('Error generating validation rules:', error);
        throw error;
    }
};

export const suggestFieldTypes = async (input: string): Promise<AIFieldSuggestion[]> => {
    try {
        const response = await axios.post(`${AI_SERVICE_URL}/field-suggestions`, { input });
        return response.data.suggestions;
    } catch (error) {
        console.error('Error fetching field suggestions:', error);
        throw error;
    }
};

// Synchronous example for local/demo use
export function getFieldSuggestions(input: string): AIFieldSuggestion[] {
    // Simple demo logic, replace with your own
    if (input.toLowerCase().includes('email')) {
        return [
            {
                label: 'Email',
                type: 'email',
                validationRules: [
                    {
                        rule: 'required',
                        message: 'Email is required',
                        regex: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'
                    }
                ]
            }
        ];
    }
    return [
        {
            label: 'Name',
            type: 'text',
            validationRules: [
                {
                    rule: 'required',
                    message: 'Name is required'
                }
            ]
        }
    ];
}