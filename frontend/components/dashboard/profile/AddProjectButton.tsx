'use client';
import { useState } from 'react';
import AddProjectForm from './AddProjectForm';

export default function AddProjectButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
  }

  return (
    <>
      <button
        onClick={handleModalOpen}
        className="bg-primary/20 text-primary border border-primary rounded-lg w-full p-2"
      >
        Add Projects
      </button>
      <AddProjectForm 
        modalOpen={modalOpen}
        onClose={handleModalClose}
      />
    </>
  )
}