import { Preset } from '@/backend/business-layer/presets/Preset';
import ROUTES from '@/src/dicts/routes';
import getMode from '@/src/util/getMode';
import { numberToMoney } from '@/src/util/numberToMoney';
import { ExternalPathString, router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Button from '../util/buttons/Button';
import Label from '../util/ui/Label';
import Title from '../util/ui/Title';
import DeleteModal from './presetDetails/DeleteModal';
import usePresetDetails from './presetDetails/usePresetDetails';

export default function PresetDetails({ isDeposit = false, preset }: { isDeposit?: boolean, preset: Preset }) {

  const { id, isLBP, amount, title } = preset;

  const { isOpen, setIsOpen, deleteFn } = usePresetDetails(isDeposit, id);

  const mode = getMode(isDeposit)





  return (
    <>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1">
        <View className='gap-3 justify-between  flex-1 '>
          <View className='gap-3 flex-1'>

            <Title >{mode} Details:</Title>

            <View className='gap-3'>
              <View>

                <Label>Title:</Label>
                <Text className='text-xl'>{title}</Text>
              </View>
              <View>

                <Label>Amount:</Label>
                <Text className='text-xl'>{numberToMoney(amount)} {isLBP ? "LBP" : "USD"}</Text>
              </View>

            </View>
          </View>
          <View className='gap-2'>

            <Button pressableProps={{ className: "w-full justify-center items-center bg-edit rounded-3xl h-20", onPress: () => { router.push(ROUTES.presets.of.edit(isDeposit, id) as ExternalPathString) } }} textProps={{ className: "text-4xl text-secondary" }}>Edit</Button>
            <Button pressableProps={{ className: "w-full justify-center items-center bg-destroy rounded-3xl h-20", onPress: () => { setIsOpen(true) } }} textProps={{ className: "text-4xl text-secondary" }}>Delete</Button>
          </View>
        </View>
      </ScrollView>
      <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} deleteFn={deleteFn} />
    </>
  )
}