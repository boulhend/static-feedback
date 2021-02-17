import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Link
} from '@chakra-ui/react';
import NextLink from 'next/link'
export default function SiteTable({ sites }) {
  return (
    <Table
      variant="simple"
      mt={6}
      background="white"
      borderRadius="md"
      boxShadow="md"
    >
      <Thead color="gray.500" background="gray.200">
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sites.map((site) => (
          <Box as="tr" key={site.id}>
            <Td fontWeight="medium">
              {site.name}
            </Td>
            <Td>
              {site.link}
            </Td>
            <Td>
              <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref><Link>View feedback</Link></NextLink>
            </Td>
            <Td>
              {site.createdAt}
            </Td>
          </Box>
        ))}
      </Tbody>
    </Table>
  );
}
