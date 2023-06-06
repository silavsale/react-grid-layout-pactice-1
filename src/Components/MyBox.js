// src/MyBox.js
import React from 'react';
import { Box, Button } from '@chakra-ui/react';

class MyBox extends React.Component {
  state = {
    childBoxes: [],
  };

  addChildBox = () => {
    this.setState((prevState) => ({
      childBoxes: [
        ...prevState.childBoxes,
        `child${prevState.childBoxes.length + 1}`,
      ],
    }));
  };

  removeChildBox = (index) => {
    this.setState((prevState) => ({
      childBoxes: prevState.childBoxes.filter((_, i) => i !== index),
    }));
  };

  render() {
    return (
      <Box borderWidth="1px">
        {this.props.boxKey}
        {this.state.childBoxes.map((childBoxKey, i) => (
          <Box key={childBoxKey} borderWidth="1px" m={2}>
            {childBoxKey}
            <Button onClick={() => this.removeChildBox(i)}>
              Remove Child Box
            </Button>
          </Box>
        ))}
        <Button onClick={this.addChildBox}>Add Child Box</Button>
        <Button onClick={this.props.removeBox}>Remove Box</Button>
      </Box>
    );
  }
}

export default MyBox;
