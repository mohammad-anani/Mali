import ModalLib from 'react-native-modal';

import React, { ReactNode } from 'react';
import ContentView from './ContentView';

export default function Modal({ children, isOpen, setIsOpen, className }: { children: ReactNode; isOpen: boolean, setIsOpen: (open: boolean) => void; className?: string }) {
  return (
    <ModalLib
      isVisible={isOpen}
      onBackdropPress={() => { setIsOpen(false) }}
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={400}
      animationOutTiming={400}
      backdropOpacity={0.6}



    >
      <ContentView className={'self-center w-[90%] min-h-[200px] ' + className}>{children}</ContentView>
    </ModalLib>
  )
}