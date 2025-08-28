export interface FormField {
    id: string;
    label: string;
    type: string;
    required: boolean;
    placeholder?: string;
    options?: string[];
    validationRules?: ValidationRule[];
}

export interface ValidationRule {
    rule: string;
    message: string;
    regex?: string;
}

export interface FormConfig {
    fields: FormField[];
    conditionalLogic?: ConditionalLogic[];
}

export interface ConditionalLogic {
    fieldId: string;
    condition: string;
    targetFieldId: string;
}

export interface AIFieldSuggestion {
    label: string;
    type: string;
    validationRules: ValidationRule[];
}

export const ItemTypes = {
    FIELD: 'field',
}