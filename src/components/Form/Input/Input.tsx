/* eslint-disable react/prop-types */

import React from 'react';
import {
  Container, ErrorMessage, InputField, Title,
} from './styles';

export function Input(props: any) {
  const {
    handleChange, handleBlur, value, error, touched, type, name, label,
  } = props;

  return (
    <Container>
      <Title>
        {label || name}
      </Title>
      <InputField
        type={type}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      <ErrorMessage>
        {error && touched && error}
      </ErrorMessage>
    </Container>
  );
}
