export default function ConfirmModal({ isOpen, onClose, onConfirm, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> {/* Overlay with z-index */}
      <div className="bg-white p-4 rounded-lg shadow-lg z-50"> {/* Content with z-index */}
        <div className="mb-4">{children}</div>
        <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Yes</button>
        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">No</button>
      </div>
    </div>
  );
}