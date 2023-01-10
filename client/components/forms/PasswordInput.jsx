import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useBoolean,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { HiEye, HiEyeOff } from 'react-icons/hi';

const InputComponent = ({
  helperText,
  id,
  label,
  placeholder = '',
  validation,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useBoolean();

  return (
    <FormControl isInvalid={errors[id]} id={id}>
      <FormLabel>{label}</FormLabel>
      <InputGroup size='md'>
        <Input
          {...register(id, validation)}
          {...rest}
          type={showPassword ? 'text' : 'password'}
          name={id}
          id={id}
          placeholder={placeholder}
          pr='4.5rem'
        />
        <InputRightElement>
          <IconButton
            size='sm'
            variant='ghost'
            icon={showPassword ? <HiEyeOff /> : <HiEye />}
            onClick={setShowPassword.toggle}
            _hover={{ background: 'none' }}
            _active={{ background: 'none' }}
            _focus={{ boxShadow: 'none' }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </IconButton>
        </InputRightElement>
      </InputGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errors[id] && <FormErrorMessage>{errors[id].message}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputComponent;
