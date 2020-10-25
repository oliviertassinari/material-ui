import * as React from 'react';

export type WrapperVariant = 'mobile' | 'desktop' | null;

// consider getting rid from wrapper variant
export const WrapperVariantContext = React.createContext<WrapperVariant | null>(null);

export const IsStaticVariantContext = React.createContext(false);
