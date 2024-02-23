import type { Schema, Attribute } from '@strapi/strapi';

export interface BasicHeading extends Schema.Component {
  collectionName: 'components_basic_headings';
  info: {
    displayName: 'heading';
    icon: 'bulletList';
  };
  attributes: {
    Footer: Attribute.String;
    title: Attribute.String;
  };
}

export interface BasicNewcomp extends Schema.Component {
  collectionName: 'components_basic_newcomps';
  info: {
    displayName: 'newcomp';
  };
  attributes: {
    h1: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'basic.heading': BasicHeading;
      'basic.newcomp': BasicNewcomp;
    }
  }
}
