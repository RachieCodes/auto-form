import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../types';
import { FormField } from '../types';

interface DragDropUIProps {
    fields: FormField[];
    setFields: (fields: FormField[]) => void;
}

interface DraggableFieldProps {
    field: FormField;
    index: number;
    moveField: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
    index: number;
    type: string;
}

const DragDropUI: React.FC<DragDropUIProps> = ({ fields, setFields }) => {
    const moveField = (dragIndex: number, hoverIndex: number) => {
        const draggedField = fields[dragIndex];
        const updatedFields = [...fields];
        updatedFields.splice(dragIndex, 1);
        updatedFields.splice(hoverIndex, 0, draggedField);
        setFields(updatedFields);
    };

    return (
        <div>
            {fields.map((field, index) => (
                <DraggableField
                    key={field.id}
                    index={index}
                    field={field}
                    moveField={moveField}
                />
            ))}
        </div>
    );
};

const DraggableField: React.FC<DraggableFieldProps> = ({ field, index, moveField }) => {
    const [, ref] = useDrag<DragItem>({
        type: ItemTypes.FIELD,
        item: { index, type: ItemTypes.FIELD },
    });

    const [, drop] = useDrop<DragItem>({
        accept: ItemTypes.FIELD,
        hover(item) {
            if (item.index !== index) {
                moveField(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => ref(drop(node))}
            style={{ padding: '8px', border: '1px solid gray', margin: '4px', background: '#fafafa' }}
        >
            {field.label}
        </div>
    );
};

export default DragDropUI;