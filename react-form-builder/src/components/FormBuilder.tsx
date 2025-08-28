import React, { useState, useEffect } from 'react';
import { FormField, ValidationRule } from '../types';
import DragDropUI from './DragDropUI';
import LivePreview from './LivePreview';
import MultiStepForm from './MultiStepForm';
import ConditionalLogic from './ConditionalLogic';
import FieldSuggestions from './FieldSuggestions';
import ExportJSONSchema from './ExportJSONSchema';
import EmbedCode from './EmbedCode';

const INPUT_TYPES = [
  "button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden",
  "image", "month", "number", "password", "radio", "range", "reset", "search",
  "submit", "tel", "text", "time", "url", "week"
];

const FormBuilder: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [validationRules, setValidationRules] = useState<ValidationRule[]>([]);
  const [newFieldId, setNewFieldId] = useState('');
  const [newFieldType, setNewFieldType] = useState('text');
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [editField, setEditField] = useState<FormField | null>(null);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/fields');
        const data = await res.json();
        setFields(data);
      } catch (err) {
        console.error('Failed to load fields', err);
      }
    };
    fetchFields();
  }, []);

 const addField = async () => {
    const trimmedId = newFieldId.trim();
    if (!trimmedId) return;

    const idExists = fields.some(field => field.id === trimmedId);
    if (idExists) {
        alert(`Field ID "${trimmedId}" already exists. Please choose a unique ID.`);
        return;
    }

    const newField: FormField = {
        id: trimmedId,
        label: trimmedId,
        type: newFieldType,
        required: newFieldRequired,
        placeholder: '',
        options: [],
        validationRules: []
    };

    try {
        await fetch('http://localhost:4000/api/fields', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newField)
        });
        const res = await fetch('http://localhost:4000/api/fields');
        const updated = await res.json();
        setFields(updated);
        setNewFieldId('');
        setNewFieldRequired(false);
    } catch (err) {
        console.error('Failed to add field', err);
    }
};


  const removeField = async (fieldId: string) => {
    try {
      await fetch(`http://localhost:4000/api/fields/${fieldId}`, {
        method: 'DELETE'
      });
      const res = await fetch('http://localhost:4000/api/fields');
      const updated = await res.json();
      setFields(updated);
    } catch (err) {
      console.error('Failed to remove field', err);
    }
  };

  const startEditField = async (field: FormField) => {
    try {
      const res = await fetch(`http://localhost:4000/api/options/${field.id}`);
      const options = await res.json();
      setEditField({ ...field, options });
    } catch (err) {
      console.error(`Failed to fetch options for ${field.id}`, err);
      setEditField({ ...field });
    }
  };

  const saveEditField = () => {
    if (editField) {
      setFields(fields.map(f => f.id === editField.id ? editField : f));
      setEditField(null);
    }
  };

  const cancelEditField = () => setEditField(null);

  const addOption = async () => {
    if (!editField) return;
    try {
      await fetch(`http://localhost:4000/api/options/${editField.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ option: 'New Option' })
      });
      const res = await fetch(`http://localhost:4000/api/options/${editField.id}`);
      const options = await res.json();
      setEditField({ ...editField, options });
    } catch (err) {
      console.error("Failed to add option", err);
    }
  };

  const updateOption = async (idx: number, value: string) => {
    if (!editField) return;
    try {
      await fetch(`http://localhost:4000/api/options/${editField.id}/${idx}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ option: value })
      });
      const res = await fetch(`http://localhost:4000/api/options/${editField.id}`);
      const options = await res.json();
      setEditField({ ...editField, options });
    } catch (err) {
      console.error("Failed to update option", err);
    }
  };

  const removeOption = async (idx: number) => {
    if (!editField) return;
    try {
      await fetch(`http://localhost:4000/api/options/${editField.id}/${idx}`, {
        method: 'DELETE'
      });
      const res = await fetch(`http://localhost:4000/api/options/${editField.id}`);
      const options = await res.json();
      setEditField({ ...editField, options });
    } catch (err) {
      console.error("Failed to remove option", err);
    }
  };

  return (
    <div>
      <h3>Add Field</h3>
      <input
        type="text"
        placeholder="Field ID"
        value={newFieldId}
        onChange={e => setNewFieldId(e.target.value)}
      />
      <select value={newFieldType} onChange={e => setNewFieldType(e.target.value)}>
        {INPUT_TYPES.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <label>
        Required:
        <input
          type="checkbox"
          checked={newFieldRequired}
          onChange={e => setNewFieldRequired(e.target.checked)}
        />
      </label>
      <button onClick={addField}>Add Field</button>

      <hr />
      <h3>Fields</h3>
      <ul>
        {fields.map(field => (
          <li key={field.id}>
            <strong>{field.id}</strong> ({field.type})
            <button onClick={() => startEditField(field)}>Edit</button>
            <button onClick={() => removeField(field.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editField && (
        <div style={{ border: '1px solid #ccc', padding: '1em', marginTop: '1em' }}>
          <h4>Edit Field</h4>
          <label>
            ID:
            <input
              type="text"
              value={editField.id}
              onChange={e => setEditField({ ...editField, id: e.target.value })}
            />
          </label>
          <br />
          <label>
            Type:
            <select
              value={editField.type}
              onChange={e => setEditField({ ...editField, type: e.target.value })}
            >
              {INPUT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Required:
            <input
              type="checkbox"
              checked={editField.required}
              onChange={e => setEditField({ ...editField, required: e.target.checked })}
            />
          </label>
          <br />
          <label>
            Placeholder:
            <input
              type="text"
              value={editField.placeholder}
              onChange={e => setEditField({ ...editField, placeholder: e.target.value })}
            />
          </label>
          <br />
          <label>
            Options:
            <button type="button" onClick={addOption}>Add Option</button>
            <ul>
              {(editField.options || []).map((opt, idx) => (
                <li key={idx}>
                  <input
                    type="text"
                    value={opt}
                    onChange={e => updateOption(idx, e.target.value)}
                  />
                  <button type="button" onClick={() => removeOption(idx)}>Remove</button>
                </li>
              ))}
            </ul>
          </label>
          <br />
          <button onClick={saveEditField}>Save</button>
          <button onClick={cancelEditField}>Cancel</button>
        </div>
      )}

      <DragDropUI fields={fields} setFields={setFields} />
      <LivePreview formData={fields} />
      <MultiStepForm steps={fields} onSubmit={() => {}} />
      <ConditionalLogic fields={fields} onUpdate={setFields} />
      <FieldSuggestions onSuggest={setValidationRules} />
      <ExportJSONSchema formConfig={{ fields, validationRules }} />
      <EmbedCode formCode={JSON.stringify({ fields, validationRules }, null, 2)} />
    </div>
  );
};

export default FormBuilder;
