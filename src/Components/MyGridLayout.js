// src/MyGridLayout.js
import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { Button } from '@chakra-ui/react';
import MyBox from './MyBox';

const ResponsiveGridLayout = WidthProvider(Responsive);

class MyGridLayout extends React.Component {
  state = {
    layouts: { lg: [] },
  };

  addBox = () => {
    const newBox = { i: `box${this.state.layouts.lg.length + 1}`, x: 0, y: 0, w: 1, h: 2 };
    this.setState(prevState => ({
      layouts: {
        ...prevState.layouts,
        lg: [...prevState.layouts.lg, newBox],
      },
    }));
  }

  removeBox = (index) => {
    this.setState(prevState => ({
      layouts: {
        ...prevState.layouts,
        lg: prevState.layouts.lg.filter((_, i) => i !== index),
      },
    }));
  }

  render() {
    return (
      <div>
        <ResponsiveGridLayout
          className="layout"
          layouts={this.state.layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          {this.state.layouts.lg.map((layout, i) => (
            <div key={layout.i} data-gridOops, it seems that the message got cut off. Here's the complete code:

```jsx
            <div key={layout.i} data-grid={layout}>
              <MyBox boxKey={layout.i} removeBox={() => this.removeBox(i)} />
            </div>
          ))}
        </ResponsiveGridLayout>
        <Button onClick={this.addBox}>Add Box</Button>
      </div>
    );
  }
}

export default MyGridLayout;
