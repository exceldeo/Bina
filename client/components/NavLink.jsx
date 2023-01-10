import Link from 'next/link';
import { Box, Flex, Icon, useColorModeValue as mode } from '@chakra-ui/react';

const NavLink = ({ children, href, icon, ...rest }) => {
  return (
    <Link href={href} passHref>
      <Flex
        as='a'
        m={-3}
        p={3}
        align='center'
        rounded='md'
        cursor='pointer'
        _hover={{ bg: mode('gray.50', 'gray.600') }}
        {...rest}
      >
        <Icon as={icon} color='orange.400' fontSize='xl' />
        <Box marginStart={3} fontWeight='medium'>
          {children}
        </Box>
      </Flex>
    </Link>
  );
};

export default NavLink;
