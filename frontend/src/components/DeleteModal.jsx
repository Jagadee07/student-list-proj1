const DeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <h2>Delete Student?</h2>

        <p>
          Are you sure you want to delete this student?
        </p>

        <div className="modal-actions">
          <button onClick={onCancel}>
            Cancel
          </button>

          <button onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;