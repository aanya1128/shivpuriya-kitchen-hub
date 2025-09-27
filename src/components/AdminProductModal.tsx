import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductForm from "@/components/ProductForm";

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  onSuccess?: () => void;
}

const AdminProductModal = ({ isOpen, onClose, productId, onSuccess }: AdminProductModalProps) => {
  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{productId ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        <ProductForm
          productId={productId}
          onSuccess={handleSuccess}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AdminProductModal;