"use client";

import { NextPage } from "next";
import { Box, Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { opinionsState } from "@/app/lib/stateManage/atom";
import ModeState from "@/app/components/schema/modeState";
import CurrentModeIndicator from "@/app/components/schema/currentIndicater";
import RepresentativeField from "@/app/components/schema/representativeField";
import RepresentativeInput from "@/app/components/schema/representativeInput";
import { CBTSessionExporter } from "@/app/lib/exporter/sessionExporter";
import incrementMode from "@/app/lib/modeManager/modeIncrementer";

const backendURL = "http://localhost:3000/api/v1/exportCBTSession";

const theModeStatement = [
  "Hi, I'm healthy adult mode!",
  "I'm vulnerable child mode",
  "I'm dysfunctional Parent mode",
];

const SchemaModeSession: NextPage = () => {
  const toast = useToast();
  const [count, setCount] = useState(0);
  const [exportedPath, setExportedPath] = useState<string>("");
  const [opinions, setOpinions] = useRecoilState(opinionsState);
  const isTheMode = true;

  const adultMode = 0;
  const dysChFuncMode = 1;
  const dysParentFuncMode = 2;

  return (
    <Flex
      bgColor={"blackAlpha.100"}
      flexDir="column"
      w={"100%"}
      h={"100%"}
      overflow={"hidden"}
    >
      <Flex
        textAlign={"center"}
        w={"100%"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading
          size={"lg"}
          textAlign={"center"}
          fontStyle={"normal"}
          fontWeight={"medium"}
          m={"5"}
        >
          Schemode: The virtual chair work
        </Heading>
        <Flex
          flexDir={"row"}
          width={"100%"}
          textAlign={"center"}
          justify={"center"}
        >
          <Button
            width={"30%"}
            onClick={async () => {
              const props = {
                targetURL: backendURL,
                opinions: opinions,
              };

              const downloadFormat = await CBTSessionExporter(props);

              setExportedPath(downloadFormat.dirPath);
            }}
            w={"20%"}
            backgroundColor={"teal.100"}
          >
            Export Session Log
          </Button>
        </Flex>
        {exportedPath ? exportedPath : <p>Not yet created</p>}
      </Flex>
      <ModeState mode={count} />
      <Flex flexDir={"row"} alignItems={"stretch"}>
        <Box
          bgColor={"green.200"}
          w={"30%"}
          ml={"5"}
          mr={"5"}
          h={"65vh"}
          borderRadius="3xl"
          overflow={"auto"}
        >
          <Heading
            fontSize={"2xl"}
            textAlign={"center"}
            fontStyle={"normal"}
            fontWeight={"medium"}
            m={"4"}
          >
            Healthy Adult Mode
          </Heading>
          <Flex flexDir={"row"} m={"5"}>
            <Text>{theModeStatement[0]}</Text>
            <CurrentModeIndicator isTheMode={count == 0 ?? isTheMode} />
          </Flex>
          <RepresentativeField whichMode={adultMode} />
          <RepresentativeInput
            whichMode={count}
            isTheMode={count == 0 ?? isTheMode}
          />
        </Box>
        <Box
          bgColor={"yellow.100"}
          w={"30%"}
          ml={"5"}
          mr={"5"}
          h={"65vh"}
          borderRadius="3xl"
        >
          <Heading
            fontSize={"2xl"}
            textAlign={"center"}
            fontStyle={"normal"}
            fontWeight={"medium"}
            m={"4"}
          >
            Vulnerable Child Mode
          </Heading>
          <Flex flexDir={"row"} m={"5"}>
            <Text>{theModeStatement[1]}</Text>
            <CurrentModeIndicator isTheMode={count == 1 ?? isTheMode} />
          </Flex>
          <RepresentativeField whichMode={dysChFuncMode} />
          <RepresentativeInput
            whichMode={count}
            isTheMode={count == 1 ?? isTheMode}
          />
        </Box>
        <Box
          bgColor={"red.100"}
          w={"30%"}
          ml={"5"}
          mr={"5"}
          h={"65vh"}
          borderRadius="3xl"
          overflow={"auto"}
          scrollBehavior={"smooth"}
        >
          <Heading
            fontSize={"2xl"}
            textAlign={"center"}
            fontStyle={"normal"}
            fontWeight={"medium"}
            m={"4"}
          >
            Dysfunctional Parent Mode
          </Heading>
          <Flex flexDir={"row"} m={"5"}>
            <Text>{theModeStatement[2]}</Text>
            <CurrentModeIndicator isTheMode={count == 2 ?? isTheMode} />
          </Flex>
          <RepresentativeField whichMode={dysParentFuncMode} />
          <RepresentativeInput
            whichMode={count}
            isTheMode={count == 2 ?? isTheMode}
          />
        </Box>
      </Flex>
      <Flex flexDir={"column"} align={"center"} w={"100vw"}>
        <Button
          m={"10"}
          fontSize="3xl"
          bgColor={"blue.200"}
          w={"md"}
          borderRadius={"2xl"}
          onClick={() => {
            toast({
              position: "bottom-left",
              render: () => (
                <Box color="white" p={3} bg="blue.300" borderRadius={"2xl"}>
                  Mode changed!!
                </Box>
              ),
              title: "",
              description: "Changed to next mode.",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
            setCount(incrementMode(count));
          }}
        >
          Switch!!
        </Button>
      </Flex>
    </Flex>
  );
};

export default SchemaModeSession;
