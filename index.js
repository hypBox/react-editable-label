import React, { useState, useEffect } from "react";

import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createUseStyles } from "react-jss";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import OkIcon from "@material-ui/icons/Check";
import IconButton from "@material-ui/core/IconButton";

const EditableLabel = ({ text, onConfirm, onCancel }) => {
  const [label, setLabel] = useState(text);
  const [showIcon, setIconVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const useStyles = createUseStyles({
    onMouseLeave: {
      margin: {
        left: 20
      }
    },
    actionButton: {
      cursor: "default"
    }
  });
  const classes = useStyles();

  const trunc = str => (str.length > 10 ? str.substring(0, 30) + "..." : str);

  const handelChange = e => {
    setLabel(e.target.value);
  };

  const handleCancel = () => {
    setIconVisible(false);
    setEditMode(false);
    setLabel(text);
    onCancel && onCancel();
  };

  const handleOk = e => {
    onConfirm && label !== text && onConfirm(label);
    handleCancel();
  };

  return (
    <React.Fragment>
      <div
        onMouseEnter={() => setIconVisible(true)}
        onMouseLeave={() => setIconVisible(false)}
      >
        {(showIcon || editMode) && (
          <EditIcon
            color="disabled"
            fontSize="small"
            onClick={() => setEditMode(true)}
          />
        )}
        {editMode && (
          <Input
            value={label}
            onChange={handelChange}
            endAdornment={
              <InputAdornment position="end">
                <OkIcon
                  className={classes.actionButton}
                  fontSize={"small"}
                  onClick={handleOk}
                />
                <CancelIcon
                  className={classes.actionButton}
                  fontSize={"small"}
                  onClick={handleCancel}
                />
              </InputAdornment>
            }
          />
        )}
        {!editMode && (
          <span className={showIcon ? "" : classes.onMouseLeave}>
            {trunc(label)}
          </span>
        )}
      </div>
    </React.Fragment>
  );
};

export default EditableLabel;
