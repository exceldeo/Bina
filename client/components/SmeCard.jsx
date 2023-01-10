import NextLink from 'next/link';
import {
  Badge,
  HStack,
  LinkBox,
  LinkOverlay,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from '@chakra-ui/react';

import { MdRestaurantMenu } from "react-icons/md"

import { FaTshirt, FaStore, FaHandshake, FaIndustry } from 'react-icons/fa';

const tagStyle = {
  'Perdagangan': {
    color: 'gray',
    name: 'Perdagangan',
    icon: FaStore,
  },
  'Industri Pengolahan': {
    color: 'gray',
    name: 'Industri Pengolahan',
    icon: FaIndustry,
  },
  'Jasa': {
    color: 'gray',
    name: 'Jasa',
    icon: FaHandshake,
  },
  'Kuliner': {
    color: 'gray',
    name: 'Kuliner',
    icon: MdRestaurantMenu,
  },
  'Fashion': {
    color: 'gray',
    name: 'Fashion',
    icon: FaTshirt,
  },
};

const ratingStyle = {
  gold: '#FFD700',
  silver: '#BEC2CB',
  bronze: '#CD7F32',
};

const SmeCard = ({ sme }) => {
  return (
    <LinkBox
      width='100%'
      p={4}
      border='1px'
      borderColor='gray.300'
      rounded='lg'
      transition='all 0.25s'
      transition-timing-function='spring(1 100 10 10)'
      _hover={{ transform: 'translateY(-4px)', shadow: 'sm' }}
    >
      <HStack align='center'>
        <Text fontWeight='medium'>
          <NextLink href={`/sme/${sme.id}`} passHref>
            <LinkOverlay>{sme.DetailUser.namaLengkap}</LinkOverlay>
          </NextLink>
        </Text>
        {sme.labelPoint == "Gold" && <Badge bg="yellow.500">Gold</Badge>}
        {sme.labelPoint == "Silver" && <Badge bg="gray">Silver</Badge>}
        {sme.labelPoint == "Bronze" && <Badge bg="yellow.700">Bronze</Badge>}
        {sme.labelPoint == "Orange" && <Badge bg="orange">Orange</Badge>}
      </HStack>
      <Tag
        mt={2}
        colorScheme={tagStyle[sme.DetailUser.kategoriUsaha].color}
        size='sm'
      >
        <TagLeftIcon as={tagStyle[sme.DetailUser.kategoriUsaha].icon} />
        <TagLabel>{tagStyle[sme.DetailUser.kategoriUsaha].name}</TagLabel>
      </Tag>
    </LinkBox>
  );
};

export default SmeCard;
