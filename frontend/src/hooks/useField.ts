import React, { useState } from 'react';

const useField = (type: string) => {
   const [value, setValue] = useState('');

   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
   };

   const reset = () => {
      setValue('');
   };

   return { value, onChange, type, reset };
};

export default useField;
