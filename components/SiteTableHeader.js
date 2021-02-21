import {Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Heading
} from '@chakra-ui/react'
import Addsitemodal from './Addsitemodal'
const SiteTableHeader = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink color="#100f0f">Sites</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justify="space-between">
        <Heading size="lg">My sites</Heading>
        <Addsitemodal text="Add site" />
      </Flex>
    </>
  );
};

export default SiteTableHeader;
