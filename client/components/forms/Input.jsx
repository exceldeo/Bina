import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { HiExclamationCircle } from 'react-icons/hi';

const Input = ({
  helperText,
  id,
  label,
  placeholder = '',
  type = 'text',
  validation,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl isInvalid={errors[id]} id={id}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <ChakraInput
          {...register(id, validation)}
          {...rest}
          type={type}
          name={id}
          id={id}
          placeholder={placeholder}
        />
        {errors[id] && (
          <InputRightElement color='red.500'>
            <HiExclamationCircle size='18' className='text-xl text-red-500' />
          </InputRightElement>
        )}
      </InputGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errors[id] && <FormErrorMessage>{errors[id].message}</FormErrorMessage>}
    </FormControl>
  );
};

export default Input;
