import type { Meta, StoryObj } from '@storybook/react-vite';
 
import Invoice from './Invoice';
 
const meta = {

  component: Invoice,
} satisfies Meta<typeof Invoice>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
export const Invoice_story: Story = {
  args: {},
};