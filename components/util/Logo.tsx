import React from 'react';
import { Image } from 'react-native';
const logo = require('../../assets/images/logo.png');

export default function Logo({ className }: { className?: string }) {
  return (
    <Image source={logo} className={className} />
  );
}
