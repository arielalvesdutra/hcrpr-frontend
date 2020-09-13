import React from 'react'
import Modal from 'react-modal'

const customModalStyles = {
  content : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',    
    background: 'inherits',
    border: 'none',
    padding: '0',
    top: '0',
    left: '0',
    right: '0',
    bottom: 'auto'
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',  
  },
  realContent: {
    flex: 1,
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '2px',
    minWidth: '280px',
    maxWidth: '700px',
    margin: '70px 10px 5px 10px',
    padding: '20px'
  }
}

interface DefaultModalProps {
  children: any
  isOpen: boolean,
  closeCallback(): any
}

const DefaultModal = (props: DefaultModalProps) => {
  
  return (
    <Modal 
      contentLabel="modal"
      isOpen={props.isOpen}
      onRequestClose={props.closeCallback}
      style={customModalStyles}     
      >
        <div style={customModalStyles.realContent}>
          {props.children}
        </div>
    </Modal>
  )
}

export default DefaultModal
