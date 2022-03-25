import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import CssCard from "./cssCard";
import { FormData as CSS, InitCSS } from "./cssCard";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormGroup } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import WestIcon from "@mui/icons-material/West";

export default function OptionsPage() {
  const [css, setCSS] = useState<CSS[]>([]);
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
  const [deleteConfirmDialog, setDeleteConfirmDialog] =
    useState<boolean>(false);

  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.local.get(["css_adopter"], (items) => {
        console.log(items);
        if (items["css_adopter"]) {
          setCSS(items["css_adopter"]);
        }
      });
    }
  }, []);

  const onSubmitHandler = (param: CSS) => {
    let cs: CSS[] = [];
    css.map((c: CSS) => {
      if (c.id === param.id) {
        cs.push(param);
        param.edit = false;
      } else {
        c.edit = false;
        cs.push(c);
      }
    });
    setCSS(cs);
    if (chrome.storage) {
      chrome.storage.local.set({ css_adopter: cs });
    }
  };

  const onSwitch = (id: string) => {
    setCSS(
      css.map((c) => {
        if (c.id === id) {
          c.enable = c.enable ? false : true;
        }
        return c;
      })
    );
    if (chrome.storage) {
      chrome.storage.local.set({ css_adopter: css });
    }
  };

  const onEdit = (id: string) => {
    setCSS(
      css.map((c) => {
        if (c.id === id) {
          c.edit = c.edit ? false : true;
        } else {
          c.edit = false;
        }
        return c;
      })
    );
  };

  const onDelete = () => {
    let deleted_css = css.filter((c) => c.id !== deleteId);
    setCSS(deleted_css);
    if (chrome.storage) {
      chrome.storage.local.set({ css_adopter: deleted_css });
    }
    setDeleteConfirmDialog(false);
  };

  const onDeleteConfirm = (id: string) => {
    setDeleteId(id);
    setDeleteConfirmDialog(true);
  };

  const onDeleteCancel = () => {
    setDeleteConfirmDialog(false);
  };

  const onCancel = () => {
    window.location.reload();
  };

  return (
    <>
      <div>
        <Dialog
          open={deleteConfirmDialog}
          onClose={() => onDeleteCancel()}
          // PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Delete Setting
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you really want to delete the following setting?
            </DialogContentText>
            {css.map((c) => {
              if (c.id === deleteId) {
                return (
                  <Card key={c.id} style={{ padding: 10, marginTop: 10 }}>
                    <FormGroup row>
                      <Button
                        disabled
                        startIcon={<DisplaySettingsIcon />}
                      ></Button>
                      <Typography variant="h6" color="inherit" component="div">
                        {c.name}
                      </Typography>
                    </FormGroup>
                  </Card>
                );
              }
            })}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => onDeleteCancel()}>
              Cancel
            </Button>
            <Button
              onClick={() => onDelete()}
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={8}>
            <div style={{ margin: 20 }}>
              <FormGroup row>
                <Button
                  variant="outlined"
                  onClick={() => setCSS([InitCSS(), ...css])}
                  startIcon={<AddBoxIcon />}
                >
                  ADD
                </Button>
                <Typography
                  variant="h6"
                  color="inherit"
                  component="div"
                  style={{ marginLeft: 20 }}
                >
                  <WestIcon style={{ marginRight: 10 }} />
                  Click here to add css setting
                </Typography>
              </FormGroup>
            </div>
          </Grid>

          <Grid item xs={8}>
            {css.map((c) => {
              return (
                <CssCard
                  key={c.id}
                  store={c}
                  onSubmit={onSubmitHandler}
                  onSwitch={onSwitch}
                  onEdit={onEdit}
                  onDelete={onDeleteConfirm}
                  onCancel={onCancel}
                />
              );
            })}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
