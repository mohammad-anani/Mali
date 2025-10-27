import React from 'react';
import { Text } from 'react-native';
import Button from '../../util/buttons/Button';
import Modal from '../../util/containers/Modal';

export default function DeleteModal({ isOpen, setIsOpen, deleteFn }: { isOpen: boolean, setIsOpen: (s: boolean) => void, deleteFn: () => void }) {


  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className='p-6 gap-2'>
      <Text className='text-destroy underline text-[30px] font-bold'>Confirm Delete?</Text>
      <Text className='text-xl'>Deleting this transaction will permanently change the balance. Confirm deletion?</Text>
      <Button pressableProps={{ className: "w-full h-20 border-[1px] border-destroy rounded-xl justify-center items-center", onPress: () => { setIsOpen(false) } }} textProps={{ className: "text-destroy text-3xl " }}>
        Cancel
      </Button>
      <Button pressableProps={{
        className: "w-full h-20 bg-destroy rounded-xl justify-center items-center", onPress: deleteFn
      }} textProps={{ className: "text-secondary text-3xl " }}>
        Confirm
      </Button>
    </Modal>
  )
}