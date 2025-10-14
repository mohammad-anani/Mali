import React from 'react';
import { Image } from 'react-native';
const logo = require('../../../assets/images/logoName3.png');

export default function LogoName({ className }: { className?: string }) {
  return (

    <Image source={logo} className={className} />
  );
}
