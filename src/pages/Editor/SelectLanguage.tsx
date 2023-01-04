import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { CustomSelect } from "../../components/CustomSelect";
import { languageAtom, languagesAtom } from "../../recoil/atom";

const SelectLanguage = () => {
  const [language, setLanguage] = useRecoilState<string>(languageAtom);
  const languages = useRecoilValue<any>(languagesAtom);

  const handleChangeLanguage = (event: SelectChangeEvent<any>) => {
    setLanguage(event.target.value);
  };

  return (
    <FormControl sx={{ margin: "0.5em", width: "150px" }}>
      <CustomSelect
        displayEmpty
        variant="standard"
        value={language}
        onChange={(event) => handleChangeLanguage(event)}
        input={<OutlinedInput />}
        sx={{ height: "25px", color: "#fff" }}
      >
        <MenuItem disabled value="">
          Choose language
        </MenuItem>

        {Object.keys(languages).map((name, index) => {
          return (
            <MenuItem value={name} key={index}>
              {name}
            </MenuItem>
          );
        })}
      </CustomSelect>
    </FormControl>
  );
};

export default SelectLanguage;
