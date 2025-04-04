"use client";

import React, { useState, ChangeEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Button from "@/common/ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  onConfirm: () => void;
}

const DeleteSavingModal = ({ isOpen, onClose, className, onConfirm }: Props) => {
  const handleCheck = () => {
    onConfirm();
    onClose();
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-200 bg-black/30 flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`w-full bg-white rounded-t-2xl flex flex-col justify-center ${className}`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex flex-col justify-center rounded-t-2xl gap-y-1 mb-10">
              <div onClick={onClose} className="flex justify-start items-center">
                <XMarkIcon className="w-5 h-5 text-gray-600 m-3" />
              </div>
              <div className="flex flex-col justify-center items-center gap-y-10">
                <div>정말로 적금을 해지하시겠습니까?</div>
                <Button text="확인" width="medium" onClick={handleCheck} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteSavingModal;
