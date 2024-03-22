import React from 'react';

function DetailsModal({setOpen, children }) {

    return (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
            <div className="modal-content" onClick={event => event.stopPropagation()}>
                <button className="modal-close" onClick={() => setOpen(false)}>&times;</button>
                {children}
            </div>
        </div>
    );
}

export default DetailsModal;
