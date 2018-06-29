import React from 'react';
import { storiesOf } from '@storybook/react';
import Datepicker from './index';

storiesOf('Datepicker', module).add('Datapicker ', () => (
  <Datepicker hadlerClose={() => console.log('close')} hanlerComplite={setupDate => () => console.log(setupDate)} />
));
