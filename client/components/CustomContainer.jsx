import { Container } from '@chakra-ui/react';

const CustomContainer = ({ children, ...rest }) => {
  return (
    <Container position='relative' maxW='lg' px={6} {...rest}>
      {children}
    </Container>
  );
};

export default CustomContainer;
