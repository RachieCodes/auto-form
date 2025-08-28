const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

let formFields = [];

// Get all fields
app.get('/api/fields', (req, res) => {
  res.json(formFields);
});

// Add a new field
app.post('/api/fields', (req, res) => {
  const field = req.body;
  formFields.push(field);
  res.json(formFields);
});

// Update a field
app.put('/api/fields/:fieldId', (req, res) => {
  const { fieldId } = req.params;
  const updatedField = req.body;
  formFields = formFields.map(f => f.id === fieldId ? updatedField : f);
  res.json(formFields);
});

// Delete a field
app.delete('/api/fields/:fieldId', (req, res) => {
  const { fieldId } = req.params;
  formFields = formFields.filter(f => f.id !== fieldId);
  res.json(formFields);
});


app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});