import { Box, Flex } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { opinionsState } from "@/app/lib/stateManage/atom";

const RepresentativeField = (props: { whichMode: number }) => {
  const [opinions, setOpinions] = useRecoilState(opinionsState);

  return (
    <Box
      borderRadius={"xl"}
      w="fit-content"
      h={"fit-content"}
      m={5}
      padding={"2"}
    >
      <ul>
        <Flex flexDir={"column-reverse"}>
          {opinions.map((opinion) => {
            if (opinion.Mode === props.whichMode) {
              return <li key={opinion.Id}>{opinion.Text}</li>;
            }
          })}
        </Flex>
      </ul>
    </Box>
  );
};

export default RepresentativeField;
