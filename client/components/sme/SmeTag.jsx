import { Tag } from '@chakra-ui/react';

const categoryStyle = {
  Gold: {
    bg: 'yellow.300',
    color: 'yellow.800',
    text: 'Gold',
  },
  Silver: {
    bg: 'gray.100',
    color: 'gray.800',
    text: 'Silver',
  },
  Bronze: {
    bg: 'yellow.700',
    color: 'yellow.50',
    text: 'Bronze',
  },
  Orange: {
    bg: 'orange.200',
    color: 'orange.800',
    text: 'Orange',
  },
};

const SmeTag = ({ category, ...rest }) => {
  category = 'Gold';
  return (
    <Tag
      bg={categoryStyle[category].bg}
      color={categoryStyle[category].color}
      {...rest}
    >
      {categoryStyle[category].text}
    </Tag>
  );
};

export default SmeTag;
