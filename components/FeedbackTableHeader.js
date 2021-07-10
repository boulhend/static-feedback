import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from '@chakra-ui/react';
import NextLink from 'next/link';
const FeedbackTableHeader = ({ siteName, siteId }) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <NextLink href="/feedback" passHref>
            <BreadcrumbLink color="#100f0f">Feedback </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          {siteId ? (
            <NextLink href={`/site/${siteId}`} passHref>
              <BreadcrumbLink color="#100f0f">{siteName} </BreadcrumbLink>
            </NextLink>
          ) : (
            <NextLink href="/sites" passHref>
              <BreadcrumbLink color="#100f0f">Sites </BreadcrumbLink>
            </NextLink>
          )}
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justify="space-between">
        <Heading size="lg">{siteName || 'All feedback'}</Heading>
      </Flex>
    </>
  );
};

export default FeedbackTableHeader;
