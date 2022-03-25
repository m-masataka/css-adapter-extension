import {
  Control,
  SubmitHandler,
  Controller,
  useForm,
  UseFormWatch,
} from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormData as CSS } from "./cssCard";
import { v4 as uuidv4 } from "uuid";
import { Grid, Button, FormGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const InputNames = {
  Id: "id",
  Pattern: "pattern",
} as const;

type InputNames = typeof InputNames[keyof typeof InputNames];

export type FormData = {
  [InputNames.Pattern]: string;
};

export const InitURL = () => {
  return {
    id: uuidv4(),
    pattern: "",
  };
};

type Props = {
  onClickDeleteURL: () => void;
  control: Control<CSS>;
  store: FormData;
  watch: UseFormWatch<CSS>;
  index: number;
};

const URLForm: React.FC<Props> = ({
  index,
  store,
  watch,
  onClickDeleteURL,
  control,
}) => {
  return (
    <>
      <Grid item xs={10} style={{ marginTop: 10 }}>
        <FormGroup row>
          <Controller
            name={`urls.${index}.${InputNames.Pattern}`}
            control={control}
            render={({ field }) => (
              <TextField
                label="URL"
                required
                variant="outlined"
                color="info"
                size="small"
                style={{ width: 450, marginRight: 10 }}
                {...field}
              />
            )}
          />
          <Button
            variant="outlined"
            type="button"
            color="error"
            size="small"
            onClick={() => onClickDeleteURL()}
            disableElevation
          >
            <DeleteIcon />
          </Button>
        </FormGroup>
      </Grid>
    </>
  );
};

export default URLForm;
