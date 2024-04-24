import React, { useState } from 'react';
import './App.css'; 

// Child component
const Child = ({ name, isParentHighlighted }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`child ${isHovered || isParentHighlighted ? 'highlighted' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {name}
    </div>
  );
};

// Parent component
const Parent = ({ name, children, isSuperParentHighlighted }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`parent ${isHovered || isSuperParentHighlighted ? 'highlighted' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="parent-name">{name}</div>
      <div className="children">
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            isParentHighlighted: isHovered || isSuperParentHighlighted,
          });
        })}
      </div>
    </div>
  );
};

// App component
const App = () => {
  const data = {
    name: 'Super Parent',
    children: [
      {
        name: 'Parent 1',
        children: [
          { name: 'Child 1.1' },
          { name: 'Child 1.2' },
        ],
      },
      {
        name: 'Parent 2',
        children: [
          { name: 'Child 2.1' },
          { name: 'Child 2.2' },
        ],
      },
    ],
  };

  const [isSuperParentHighlighted, setIsSuperParentHighlighted] = useState(false);

  const handleSuperParentMouseEnter = () => {
    setIsSuperParentHighlighted(true);
  };

  const handleSuperParentMouseLeave = () => {
    setIsSuperParentHighlighted(false);
  };

  return (
    <div className="app">
      <Parent
        name={data.name}
        isSuperParentHighlighted={isSuperParentHighlighted}
        handleMouseEnter={handleSuperParentMouseEnter}
        handleMouseLeave={handleSuperParentMouseLeave}
      >
        {data.children.map((child, index) => (
          <Parent key={index} name={child.name}>
            {child.children.map((grandchild, index) => (
              <Child key={index} name={grandchild.name} />
            ))}
          </Parent>
        ))}
      </Parent>
    </div>
  );
};

export default App;
