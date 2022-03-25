import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Switch from "@mui/material/Switch";
import BuildIcon from "@mui/icons-material/Build";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function PopupPage() {
  const [enable, setEnable] = useState<boolean>(false);

  useEffect(() => {
    if (chrome.storage) {
      chrome.storage.local.get(["css_adopter_enable"], (items) => {
        if (items["css_adopter_enable"]) {
          let changed_enable = items["css_adopter_enable"];
          setEnable(changed_enable);
        }
      });
    }
  }, []);

  const onClickOptions = () => {
    window.open(chrome.runtime.getURL("index.html"));
  };

  const onEnable = () => {
    let changed_enable = enable ? false : true;
    setEnable(changed_enable);
    if (chrome.storage) {
      chrome.storage.local.set({ css_adopter_enable: changed_enable });
      chrome.action.setIcon({
        path: (changed_enable ? "enabled" : "disabled") + ".png",
      });
    }
  };

  return (
    <>
      <Card sx={{ width: 200 }}>
        <CardContent>
          <FormControlLabel
            control={<Switch checked={enable} onClick={() => onEnable()} />}
            label={enable ? "ENABLE" : "DISABLE"}
          />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            type="button"
            onClick={() => onClickOptions()}
            startIcon={<BuildIcon />}
          >
            SETTING
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
