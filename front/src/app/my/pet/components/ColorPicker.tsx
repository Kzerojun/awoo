"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ColorPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (color: string) => void;
}

const colors = [
  "#FF00FF",
  "#00FF00",
  "#FF4081",
  "#FFA500",
  "#4169E1",
  "#FFD700",
  "#FF1744",
  "#40E0D0",
  "#FFB6C1",
  "#87CEFA",
  "#A9A9A9",
  "#000000",
];

const ColorPicker = ({ isOpen, onClose, onSelect }: ColorPickerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/30 flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full bg-white rounded-t-2xl p-4 py-5 mb-[54px]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-start text-lg text-gray-500 mb-3">컬러</h2>
            <div className="grid grid-cols-4 gap-3 px-4 border-t-2 border-custom-gray pt-5 w-">
              {colors.map((c) => (
                <div key={c} className="mx-auto w-12">
                  <button
                    onClick={() => {
                      onSelect(c);
                      onClose();
                    }}
                    className="w-12 h-12 rounded-lg"
                    style={{
                      backgroundColor: c,
                      border: "1.5px solid #ccc",
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ColorPicker;
