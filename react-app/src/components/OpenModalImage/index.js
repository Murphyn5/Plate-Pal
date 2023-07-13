import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalImage({
  modalComponent, // component to render inside the modal
  imageUrl, // text of the button that opens the modal
  onImageClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onImageClick) onImageClick();
  };

  return (
    <img onClick={onClick} src={imageUrl}/>
  );
}

export default OpenModalImage;
