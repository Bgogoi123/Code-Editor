import { useEffect, useState } from "react";
import { Drawer, Grid } from "@mui/material";
import { DirectoryContext } from "../../context/DirectoryContext";
import Directories from "../Directories";
import Editor from "../Editor";
import { directoriesContainer, fileContainer, filesMobileView } from "./styles";
import { RenderTree } from "../../interfaces";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { SelectedNodeContext } from "../../context/SelectedNodeContext";
import SelectLanguage from "../Editor/SelectLanguage";
import { CheckExtensionContext } from "../../context/CheckExtensionContext";
import EnableExtension from "../EnableExtension";
import CreateExtension from "../CreateExtension";

const HomePage = () => {
  const [isExtension, setIsExtension] = useState<boolean>(false);

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

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [openDirectories, setOpenDirectories] = useState<boolean>(false);

  // useEffect(() => {
  //   window.addEventListener("resize", () => setWidth(window.innerWidth));
  //   console.log("resizing");
  // }, [window.innerWidth]);

  const handleOpenDirectories = () => {
    setOpenDirectories((prev) => !prev);
  };

  return (
    <Grid container>
      <DirectoryContext.Provider value={{ data, setData }}>
        <SelectedNodeContext.Provider value={{ selectedNode, setSelectedNode }}>
          <CheckExtensionContext.Provider
            value={{ isExtension, setIsExtension }}
          >
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
              {width > 600 ? (
                <Grid container direction="column">
                  <EnableExtension />
                  <SelectLanguage />
                  <Directories />
                </Grid>
              ) : (
                <>
                  <FolderOutlinedIcon onClick={handleOpenDirectories} />
                  <Drawer
                    variant="temporary"
                    open={openDirectories}
                    onClose={handleOpenDirectories}
                    ModalProps={{
                      keepMounted: true,
                    }}
                    sx={() => filesMobileView(width)}
                  >
                    <Grid container direction="column">
                      <EnableExtension />
                      <SelectLanguage />
                      <Directories />
                    </Grid>
                  </Drawer>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={9} md={9} lg={9} xl={9} sx={fileContainer}>
              {isExtension ? <CreateExtension /> : <Editor />}
            </Grid>
          </CheckExtensionContext.Provider>
        </SelectedNodeContext.Provider>
      </DirectoryContext.Provider>
    </Grid>
  );
};

export default HomePage;
