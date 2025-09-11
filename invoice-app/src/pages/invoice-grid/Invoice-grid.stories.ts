import type { Meta, StoryObj } from '@storybook/react-vite';
 
import InvoiceGrid from './Invoice-grid';
 
const meta = {

  component: InvoiceGrid,
} satisfies Meta<typeof InvoiceGrid>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
export const Invoice_Grid: Story = {
  args: {},
};