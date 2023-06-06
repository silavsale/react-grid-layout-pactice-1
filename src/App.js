import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  VStack,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const CardComponent = ({ header, body, footer }) => (
  <Card
    borderWidth={1}
    borderRadius="lg"
    overflow="hidden"
    backgroundColor="olive"
    padding="10px"
  >
    <CardHeader>{header}</CardHeader>
    <CardBody>{body}</CardBody>
    <CardFooter>{footer}</CardFooter>
  </Card>
);

function App() {
  const [layouts, setLayouts] = useState({ lg: [] });
  const [count, setCount] = useState(0);
  const [scale, setScale] = useState(0);
  const [children, setChildren] = useState({});
  const [showDragHandle, setShowDragHandle] = useState(true);

  const toggleDragHandle = () => {
    setShowDragHandle(!showDragHandle);
  };

  const addBox = () => {
    const i = `box${count}`;
    setCount(count + 1);
    setLayouts({
      lg: [...layouts.lg, createLayoutItem(i, scale)],
    });
  };

  const addChild = (parent) => {
    console.log('parent', parent);
    setChildren({
      ...children,
      [parent]: [
        ...(children[parent] || []),
        `child${(children[parent] || []).length}`,
      ],
    });
  };

  const createLayoutItem = (i, scale) => ({
    i,
    x: (layouts.lg.length * 2) % (12 - 2 * scale),
    y: Infinity,
    w: 2 + scale,
    h: 2 + scale,
  });

  const onLayoutChange = (layout, layouts) => {
    setLayouts(layouts);
  };

  return (
    <Box p={5}>
      <VStack spacing={5}>
        <Button onClick={addBox}>Add Box</Button>
        <Button onClick={toggleDragHandle}>
          {showDragHandle ? 'Hide' : 'Show'} Drag Handle
        </Button>
        <Slider min={0} max={10} value={scale} onChange={setScale}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Box style={{ width: '100%', height: 'calc(100vh - 100px)' }}>
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            onLayoutChange={onLayoutChange}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={80}
            draggableHandle=".dragHandle"
            preventCollision={true} // Add this line
          >
            {layouts.lg.map((layout) => (
              <div key={layout.i} data-grid={layout}>
                <Box
                  w="100%"
                  h="100%"
                  bg="teal.500"
                  padding="10px"
                  // backgroundColor="green"
                  // borderColor="black"
                  // borderWidth={2}
                  // borderStyle="solid"
                >
                  {showDragHandle && (
                    <div
                      className="dragHandle"
                      style={{
                        cursor: 'move',
                        backgroundColor: 'lightgray',
                        padding: '5px',
                        marginBottom: '10px',
                      }}
                    >
                      Drag from here
                    </div>
                  )}
                  <CardComponent
                    header={<Heading size="md">Parent: {layout.i}</Heading>}
                    body={
                      <SimpleGrid
                        spacing={4}
                        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                      >
                        {(children[layout.i] || []).map((child) => (
                          <CardComponent
                            key={child}
                            header={<Heading size="sm">Child: {child}</Heading>}
                            body={<Text>Child content</Text>}
                            footer={
                              <Button
                                size="xs"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  console.log('Child action');
                                }}
                              >
                                Child action
                              </Button>
                            }
                          />
                        ))}
                      </SimpleGrid>
                    }
                    footer={
                      <>
                        <Button
                          size="sm"
                          onClick={(event) => {
                            event.stopPropagation();
                            console.log('Parent action');
                          }}
                        >
                          Parent action
                        </Button>
                        <Button
                          size="sm"
                          onClick={(event) => {
                            event.stopPropagation();
                            addChild(layout.i);
                          }}
                        >
                          Add child
                        </Button>
                      </>
                    }
                  />
                </Box>
              </div>
            ))}
          </ResponsiveGridLayout>
        </Box>
      </VStack>
    </Box>
  );
}

export default App;
