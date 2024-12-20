import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

const CommonModal = ({title, content, buttons}) => {
    
    return (
        <>
        <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={true}
        isCentered
        // onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent
         maxW="90vw" // 전체 너비의 80% 사용
         mx="auto"   // 중앙 정렬
         >
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          {content}
          </ModalBody>

          <ModalFooter>
          {buttons}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>  
    )
}

export default CommonModal;