import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { Drawer, Grid } from "@mui/material";
import { useState } from "react";
import { CheckExtensionContext } from "../../context/CheckExtensionContext";
import { DirectoryContext } from "../../context/DirectoryContext";
import { SelectedNodeContext } from "../../context/SelectedNodeContext";
import { RenderTree } from "../../interfaces";
import CreateExtension from "../CreateExtension";
import Directories from "../Directories";
import Editor from "../Editor";
import SelectLanguage from "../Editor/SelectLanguage";
// import EnableExtension from "../EnableExtension";
// import ExtensionList from "../ExtensionList";
import { directoriesContainer, fileContainer, filesMobileView } from "./styles";

const HomePage = () => {
  const [isExtension, setIsExtension] = useState<boolean>(false);
  const [extensionId, setExtensionId] = useState<string>("");

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

  // eslint-disable-next-line
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [openDirectories, setOpenDirectories] = useState<boolean>(false);

  const handleOpenDirectories = () => {
    setOpenDirectories((prev) => !prev);
  };

  return (
    <Grid container>
      <DirectoryContext.Provider value={{ data, setData }}>
        <SelectedNodeContext.Provider value={{ selectedNode, setSelectedNode }}>
          <CheckExtensionContext.Provider
            value={{ isExtension, setIsExtension, extensionId, setExtensionId }}
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
                  {/* <EnableExtension />
                  <ExtensionList /> */}
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
                      {/* <EnableExtension />
                      <ExtensionList /> */}
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
