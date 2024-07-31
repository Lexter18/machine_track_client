import React, { useState, useEffect } from 'react';

export const OwnerSearchModal = ({ isOpen, onClose, onSelectOwner }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      // Llama a la API para buscar propietarios basados en el término de búsqueda
      // fetchOwners(searchTerm).then((data) => setOwners(data));
      console.log("BUSCAR OWNERS")
    }
  }, [searchTerm]);

  const handleSelectOwner = (owner) => {
    onSelectOwner(owner);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Buscar Propietario</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre o identificación"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="list-group mt-3">
              {owners.map((owner) => (
                <li
                  key={owner.id}
                  className="list-group-item"
                  onClick={() => handleSelectOwner(owner)}
                >
                  {owner.name} - {owner.identification}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
