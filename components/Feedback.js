import { Google, Github } from '../styles/theme';
import { Box, Heading, Text } from '@chakra-ui/react';
export default function Feedback({
  id,
  author,
  provider,
  createdAt,
  text,
  icons,
  timestamp,
  ratings
}) {
  
  return (
    <Box key={id}>
      <Heading fontSize="lg">
        {author}{' '}
        {icons === 'show' && (provider.split('')[1] === 'o' ? (
          <Google mb={2} />
        ) : (
          <Github />
        ))}
      </Heading>
      <Text>{timestamp === 'show' && createdAt}</Text>
      <Text my={3}>{text}</Text>
      <Box borderBottom="1px" color="gray.200" my={2} />
    </Box>
  );
}
