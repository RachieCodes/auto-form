import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FormBuilder from './components/FormBuilder';
import LivePreview from './components/LivePreview';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Editor</Link> | <Link to="/preview">Preview</Link>
      </nav>
      <DndProvider backend={HTML5Backend}>
        <Switch>
          <Route exact path="/" component={FormBuilder} />
          <Route path="/preview" component={LivePreview} />
        </Switch>
      </DndProvider>
    </Router>
  );
};

export default App;
