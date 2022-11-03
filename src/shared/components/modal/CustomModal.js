import { Modal } from '@mui/material';
import React from 'react';

const CustomModal = ({ children, open, handleClose }) => {
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <div
                    className="modal-scrollHide"
                    style={{
                        backgroundColor: '#fff',
                        width: '65vw',
                        height: '72vh',
                        padding: '20px 60px',
                        margin: '40px auto',
                        overflowY: 'scroll',
                        borderRadius: 20
                    }}
                >
                    {children}
                </div>
            </Modal>
        </>
    );
};

export default CustomModal;
