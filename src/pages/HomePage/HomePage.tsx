import { useState } from "react";
import { Grid } from "@mui/material";
import { DirectoryContext } from "../../context/DirectoryContext";
import Directories from "../Directories";
import Editor from "../Editor";
import { directoriesContainer, fileContainer } from "./styles";
import { RenderTree } from "../../interfaces";
import { SelectedNodeContext } from "../../context/SelectedNodeContext";

const HomePage = () => {
  const [data, setData] = useState<RenderTree>({
    id: 1,
    name: "home",
    isFolder: true,
    children: [],
  });

  const [selectedNode, setSelectedNode] = useState<RenderTree>({
    id: 1,
    name: "home",
    isFolder: true,
    children: [],
  });
  return (
    <Grid container>
      <DirectoryContext.Provider value={{ data, setData }}>
        <SelectedNodeContext.Provider value={{ selectedNode, setSelectedNode }}>
          <Grid
            container
            item
            xs={12}
            sm={3}
            md={3}
            lg={3}
            xl={3}
            sx={directoriesContainer}
            direction="row"
          >
            <Directories />
          </Grid>
          <Grid item xs={12} sm={9} md={9} lg={9} xl={9} sx={fileContainer}>
            <Editor />
          </Grid>
        </SelectedNodeContext.Provider>
      </DirectoryContext.Provider>
    </Grid>
  );
};

export default HomePage;
