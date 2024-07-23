import styles from "./page.module.css";
import { SchemaIndex } from "@/app/schema";
import { ExplicateIndex } from "@/app/explicate";
import {Box, Flex, Spacer} from "@chakra-ui/react";

export default function Home() {
  return (
    <main className={styles.main}>
      <Box w={"100%"} h={"100%"} bg={"faintPink.50"}>
        <Flex flexDir={"row"} w={"100%"}>
          <Flex w={"100%"} justifyContent={"center"}>
            <SchemaIndex />
          </Flex>
          <Spacer />
          <Flex w={"100%"} justifyContent={"center"}>
            <ExplicateIndex />
          </Flex>
        </Flex>
      </Box>
    </main>
  );
}
