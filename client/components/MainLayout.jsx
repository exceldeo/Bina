import CustomContainer from '@/components/CustomContainer';
import NavBar from '@/components/NavBar';

import { Box } from '@chakra-ui/react';

const MainLayout = ({ children, ...rest }) => {
  return (
    <>
      <NavBar />
      <Box bg='gray.100'>
        <CustomContainer
          minH={{ base: 'calc(100vh - 3.5rem)', md: 'calc(100vh - 4rem)' }}
          bg='white'
          shadow='xl'
          {...rest}
        >
          {children}
        </CustomContainer>
      </Box>
    </>
  );
};

export default MainLayout;
