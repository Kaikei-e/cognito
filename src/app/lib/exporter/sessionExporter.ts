import { theOpinion } from "../structures/theOpinions";

type Props = {
  targetURL: string;
  opinions: theOpinion[];
};

type downloadFormat = {
  dirPath: string;
};

export const CBTSessionExporter = async (
  props: Props,
): Promise<downloadFormat> => {
  const data = JSON.stringify(props.opinions);
  let df: downloadFormat = { dirPath: "" }; // Initialize with empty strings

  try {
    const response = await fetch(props.targetURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const resJson = await response.json();
    df = {
      dirPath: resJson.dirPath,
    };
  } catch (error) {
    console.error("Error:", error);
  }

  return df;
};
