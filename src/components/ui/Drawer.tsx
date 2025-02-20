import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XCircleIcon } from 'lucide-react';

interface RightDrawerProps {
  children: React.ReactNode;
  openTrigger: boolean;
  setOpenTrigger: (value: boolean) => void;  // Function from parent
  title?: string;
}

const RightDrawer: React.FC<RightDrawerProps> = ({ children, openTrigger, setOpenTrigger, title = 'Shopping Cart' }) => {
  const [open, setOpen] = useState(openTrigger);

  useEffect(() => {
    setOpen(openTrigger);
  }, [openTrigger]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpenTrigger}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content
          className="fixed top-0 right-0 h-full bg-white shadow-lg p-4 transition-transform transform"
          style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-2xl font-bold text-black">{title}</Dialog.Title>
            <Dialog.Close
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setOpenTrigger(false)} // Close from parent
            >
              <XCircleIcon className="w-6 h-6" />
            </Dialog.Close>
          </div>

          {/* Drawer Content */}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RightDrawer;
