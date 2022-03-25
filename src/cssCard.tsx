import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PreviewIcon from "@mui/icons-material/Preview";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import "highlight.js/styles/github.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import CssIcon from "@mui/icons-material/Css";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";

import URLForm from "./url";
import { FormData as URL, InitURL } from "./url";
import { AddBox } from "@mui/icons-material";
import { Chip } from "@mui/material";

hljs.registerLanguage("css", css);

export const InputNames = {
  Id: "id",
  Name: "name",
  CSS: "css",
  Urls: "urls",
  Edit: "edit",
  Enable: "enable",
} as const;

type InputNames = typeof InputNames[keyof typeof InputNames];

export type FormData = {
  [InputNames.Id]: string;
  [InputNames.Name]: string | undefined;
  [InputNames.CSS]: string | undefined;
  [InputNames.Urls]: URL[];
  [InputNames.Edit]: boolean;
  [InputNames.Enable]: boolean;
};

export const InitCSS = () => {
  return {
    id: uuidv4(),
    name: undefined,
    css: undefined,
    urls: [InitURL()],
    edit: true,
    enable: true,
  };
};

type Props = {
  onSubmit: SubmitHandler<FormData>;
  onEdit: (id: string) => void;
  onSwitch: (id: string) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
  store: FormData;
};

const DeleteButton = (handler: (id: string) => void, id: string) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<DeleteIcon />}
      onClick={() => handler(id)}
    >
      Delete
    </Button>
  );
};

const CssCard: React.FC<Props> = ({
  onSubmit,
  onEdit,
  onSwitch,
  onDelete,
  onCancel,
  store,
}) => {
  const { register, watch, handleSubmit, control } = useForm({
    defaultValues: store,
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: InputNames.Urls,
    }
  );

  const watchCSS = watch(["css"]);

  const [highlightView, setHighlightView] = useState<boolean>(true);
  useEffect(() => {
    hljs.initHighlighting();
  });

  const handleHighlight = (
    event: React.MouseEvent<HTMLElement>,
    highlight: boolean
  ) => {
    setHighlightView(highlight);
  };

  return (
    <>
      {store.edit ? (
        <form onSubmit={handleSubmit(onSubmit)} style={{ margin: 20 }}>
          <Card
            style={{ padding: 20, backgroundColor: store.enable ? "" : "gray" }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={7}>
                      <TextField
                        required
                        label="Name"
                        variant="standard"
                        color="info"
                        fullWidth
                        {...register(InputNames.Name)}
                      />
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={2}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={store.enable}
                            onClick={() => onSwitch(store.id)}
                            {...register(InputNames.Enable)}
                          />
                        }
                        label={store.enable ? "ENABLE" : "DISABLE"}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {fields.map((item, index) => {
                    return (
                      <Grid key={item.id}>
                        <URLForm
                          store={item}
                          control={control}
                          onClickDeleteURL={() => remove(index)}
                          index={index}
                          watch={watch}
                        />
                      </Grid>
                    );
                  })}
                  <Button
                    variant="outlined"
                    startIcon={<AddBox />}
                    onClick={() => append(InitURL())}
                    style={{ marginTop: 10 }}
                  >
                    URL
                  </Button>
                </Grid>
                <Grid item xs={8}>
                  <ToggleButtonGroup
                    value={highlightView}
                    exclusive
                    onChange={handleHighlight}
                    size="small"
                    className="m-3"
                  >
                    <ToggleButton value={false}>
                      <ModeEditIcon />
                    </ToggleButton>
                    <ToggleButton value={true}>
                      <PreviewIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                  {highlightView ? (
                    <pre style={{ width: "500px", margin: 0 }}>
                      <code className="css" style={{ minHeight: 100 }}>
                        {watchCSS}
                      </code>
                    </pre>
                  ) : (
                    <div className="">
                      <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="css"
                        minRows={6}
                        style={{ width: 500 }}
                        {...register(InputNames.CSS)}
                      />
                    </div>
                  )}
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid>{DeleteButton(onDelete, store.id)}</Grid>
              <Grid container justifyContent="flex-end" spacing={2}>
                <Grid item>
                  <Button
                    variant="outlined"
                    type="button"
                    onClick={() => onCancel()}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    type="submit"
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </form>
      ) : (
        <div style={{ margin: 20 }}>
          <Card
            style={{ padding: 20, backgroundColor: store.enable ? "" : "gray" }}
          >
            <CardHeader
              title={store.name}
              avatar={<DisplaySettingsIcon />}
              action={
                <FormControlLabel
                  control={
                    <Switch
                      checked={store.enable}
                      onClick={() => onSwitch(store.id)}
                      {...register(InputNames.Enable)}
                    />
                  }
                  label={store.enable ? "ENABLE" : "DISABLE"}
                />
              }
            />
            <CardContent>
              {store.urls.map((url, index) => {
                return (
                  <Chip key={index} label={url.pattern} style={{ margin: 1 }} />
                );
              })}
            </CardContent>
            <CardActions>
              <Grid>{DeleteButton(onDelete, store.id)}</Grid>
              <Grid container justifyContent="flex-end">
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => onEdit(store.id)}
                  startIcon={<ModeEditIcon />}
                >
                  Edit
                </Button>
              </Grid>
            </CardActions>
          </Card>
        </div>
      )}
    </>
  );
};

export default CssCard;
