import React, { useState } from 'react';
import { FormField } from '../types';

interface MultiStepFormProps {
    steps: FormField[];
    onSubmit: () => void;
}

type FormData = {
    [key: string]: string;
};

const MultiStepForm: React.FC<MultiStepFormProps> = ({ steps, onSubmit }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({});

    if (!steps || steps.length === 0) {
        return <div>No steps available</div>;
    }

    const currentField = steps[currentStep];

    return (
        <div>
            <h3>Step {currentStep + 1} of {steps.length}</h3>
            <div>
                <label>{currentField.label}</label>
                <input
                    type={currentField.type}
                    placeholder={currentField.placeholder}
                    value={formData[currentField.id] || ''}
                    onChange={e =>
                        setFormData({ ...formData, [currentField.id]: e.target.value })
                    }
                />
            </div>
            <div>
                <button
                    onClick={() => setCurrentStep(Math.max(currentStep - 1, 0))}
                    disabled={currentStep === 0}
                >
                    Previous
                </button>
                {currentStep < steps.length - 1 ? (
                    <button onClick={() => setCurrentStep(currentStep + 1)}>
                        Next
                    </button>
                ) : (
                    <button onClick={onSubmit}>Submit</button>
                )}
            </div>
        </div>
    );
};

export default MultiStepForm;