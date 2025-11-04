import { destroy, primary } from '@/src/css';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import useDropDownInput from './useDropDownInput';
import { TransactionForm } from './useNewTransaction';

export default function DropDownInput({ object, isDeposit, setObject }: { object: TransactionForm, isDeposit: boolean, setObject: React.Dispatch<React.SetStateAction<TransactionForm>> }) {


  const presetsList = useDropDownInput(object, isDeposit, setObject);
  return (
    <View className='gap-[2px]'>
      <Text className='ml-5 text-[25px] '>Select a Preset:</Text>
      <View className='bg-white rounded-[30px] justify-center px-5 h-[55px] '>

        <Dropdown
          data={presetsList}
          labelField="label"
          searchQuery={(keyword, value) => value.toLowerCase().includes(keyword.toLocaleLowerCase())}
          valueField="value"
          activeColor={isDeposit ? primary : destroy
          }
          placeholder="Select Preset"
          value={object.presetID ?? 0}
          onChange={(item) => {
            setObject(o => ({ ...o, presetID: +item.value }))
          }}

          search
          searchPlaceholder="Search..."
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholder}
          selectedTextStyle={styles.selectedText}
          itemTextStyle={styles.itemTextStyle}
          containerStyle={styles.dropdownContainer}
          iconStyle={styles.icon}

        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 30,
    height: 55,
    paddingHorizontal: 20,

  },
  placeholder: {
    fontSize: 22,
    color: '#999',

  },
  selectedText: {
    fontSize: 22,

  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 8,

  },
  itemTextStyle: {
    fontSize: 16,

  },
  dropdownContainer: {
    borderRadius: 8,

  },
  icon:
  {
    width: 30
  }
});