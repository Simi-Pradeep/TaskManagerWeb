import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { ValidatorComponent } from "react-material-ui-form-validator";

class ValidatedDatePicker extends ValidatorComponent {
 
  renderValidatorComponent() {

    const {
      errorMessages,
      validators,
      requiredError,
      helperText,
      validatorListener,
      ...rest
    } = this.props;
    const { isValid }: any = this.state;
    return (
      <DatePicker
        {...rest}                
        onChange={this.props.onChange}
        error={!isValid}
        helperText={(!isValid && this.getErrorMessage()) || helperText}
      />
    );
  }
}

export default ValidatedDatePicker;