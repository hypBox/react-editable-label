import React, { useState, useEffect } from 'react';

import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import FormHelperText from '@material-ui/core/FormHelperText';
import { createUseStyles } from 'react-jss';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import OkIcon from '@material-ui/icons/Check';

const EditableLabel = ({
  text = '',
  onConfirm,
  onCancel,
  displayMinLen = 10,
  displayMaxLen = 20,
  textMaxLen = 0,
  textMinLen = 0
}) => {
  const [label, setLabel] = useState(text);
  const [showIcon, setIconVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setLabel(text);
  }, [text]);

  const useStyles = createUseStyles({
    onMouseLeave: {
      margin: {
        left: 20
      }
    },
    actionButton: {
      cursor: 'default'
    }
  });
  const classes = useStyles();

  const trunc = str =>
    str && str.length > displayMinLen
      ? str.substring(0, displayMaxLen) + '...'
      : str;

  const checkLength = val => {
    const minCheck = textMinLen ? val.length >= textMinLen : true;
    const maxCheck = textMaxLen ? val.length <= textMaxLen : true;
    return minCheck && maxCheck;
  };

  const handelChange = e =>
    checkLength(e.target.value) && setLabel(e.target.value);

  const handleCancel = () => {
    setIconVisible(false);
    setEditMode(false);
    setLabel(text);
    onCancel && onCancel();
  };

  const handleOk = e => {
    if (checkLength(label) && onConfirm && label !== text) {
      onConfirm(label);
      handleCancel();
    }
  };

  return (
    <div
      onMouseEnter={() => setIconVisible(true)}
      onMouseLeave={() => setIconVisible(false)}
    >
      {(showIcon || editMode || label.length === 0) && (
        <EditIcon
          color='disabled'
          fontSize='small'
          onClick={() => setEditMode(true)}
        />
      )}
      {editMode && (
        <Input
          value={label || ''}
          onChange={handelChange}
          onKeyUp={({ key }) => {
            if (key === 'Enter') {
              handleOk();
            } else if (['Esc', 'Escape'].includes(key)) {
              handleCancel();
            }
          }}
          endAdornment={
            <InputAdornment position='end'>
              <OkIcon
                className={classes.actionButton}
                fontSize={'small'}
                onClick={handleOk}
              />
              <CancelIcon
                className={classes.actionButton}
                fontSize={'small'}
                onClick={handleCancel}
              />
            </InputAdornment>
          }
        />
      )}
      {!editMode && (
        <Tooltip title={label}>
          <span className={showIcon ? '' : classes.onMouseLeave}>
            {trunc(label)}
          </span>
        </Tooltip>
      )}
      {editMode && (
        <FormHelperText id='standard-weight-helper-text'>
          {`${label.length}/${textMaxLen}`}
          {textMinLen ? `, min: ${textMinLen}` : ''}
        </FormHelperText>
      )}
    </div>
  );
};

export default EditableLabel;
