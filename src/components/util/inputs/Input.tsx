import React from 'react'
import { TextInput, TextInputProps } from 'react-native'

// Forward refs so parent components can call .focus() / control focus navigation
const Input = React.forwardRef<TextInput, TextInputProps>((props, ref) => {
  return (
    <TextInput
      ref={ref}
      {...props}
      enablesReturnKeyAutomatically
      submitBehavior="submit"
      multiline={false}
      scrollEnabled={false}
      placeholderTextColor="#CCCCCC"
      className={'bg-white rounded-[30px] text-[22px] px-5 h-[55px] ' + ' ' + (props.className ?? '')}
    />
  )
})

// Give the forwarded component a name for better stack traces and linting
Input.displayName = 'Input'

export default Input
