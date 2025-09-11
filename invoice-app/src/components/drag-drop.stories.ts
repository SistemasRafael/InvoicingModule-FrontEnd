import type { Meta, StoryObj } from '@storybook/react-vite';
 
import DragAndDrop from './drag-drop';
 
const meta = {

  component: DragAndDrop,
} satisfies Meta<typeof DragAndDrop>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
export const Drag_And_Drop: Story = {
  args: {
    onSummit: () => {}
  },
};