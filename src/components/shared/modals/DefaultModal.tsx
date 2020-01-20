import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement("#root")

const customModalStyles = {
  content : {
    top: '70px',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    color: 'black',
    position: 'relative',
    minWidth: '280px'
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)',
    boxSizing: 'border-box',
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
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
      style={customModalStyles}>

        {props.children}
    </Modal>
  )
}

export default DefaultModal


