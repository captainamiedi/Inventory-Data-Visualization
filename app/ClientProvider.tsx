"use client";
import React from 'react';
import { Provider } from 'react-redux';
import { store } from "@/store";
import { ClientProviderProps } from '../utils/types';


const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ClientProvider;