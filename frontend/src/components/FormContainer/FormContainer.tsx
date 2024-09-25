import { FC, ReactElement } from "react";
import { Button } from "@mui/material";

import styles from "./FormContainer.module.scss";

type FormContainerType = {
  title: string;
  children: ReactElement | ReactElement[];
  btnTitle: string;
  onSubmit: () => void;
  additionalInfo?: ReactElement;
  isSubmitDisabled?: boolean;
};

const FormContainer: FC<FormContainerType> = ({
  title,
  children,
  btnTitle,
  onSubmit,
  additionalInfo,
  isSubmitDisabled,
}) => {
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.form}>{children}</div>
      <Button
        variant="contained"
        size="medium"
        onClick={onSubmit}
        disabled={isSubmitDisabled}
      >
        {btnTitle}
      </Button>
      <div className={styles.additionalInfo}>{additionalInfo}</div>
    </div>
  );
};

export default FormContainer;
